// Server-to-server Microsoft Graph client for Teams webinar registration —
// app-only (client-credentials) auth, no visitor-facing Microsoft login.
// See "Events Hub + Automated Microsoft Teams Webinar Registration" plan.
//
// Cross-tenant note: this app is registered as a multi-tenant Entra app
// homed in mh-enterprise.com's tenant, but MS_GRAPH_TENANT_ID must be
// purpleguard.io's own tenant ID — that's where the webinars/organizers
// actually live, and the token has to be scoped to that tenant, not the
// app's home tenant. See project deliverables.md / the events plan §7.A.
//
// `fetch` never throws on 4xx/5xx — every call here explicitly checks
// response.ok/status rather than assuming a resolved promise means success
// (this repo has already been bitten twice by that assumption: Resend's
// `.emails.send()` not throwing on API failure, and a Supabase grant bug
// that silently swallowed insert errors).

const GRAPH_BASE = "https://graph.microsoft.com/v1.0";

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

interface CachedToken {
  accessToken: string;
  expiresAt: number;
}

// Module-scope cache — on Vercel's serverless model this only survives for
// the lifetime of a warm execution context; a cold start gets a fresh empty
// cache and re-requests a token. That's the realistic ceiling here, not a
// persistent/shared cache, and it's fine since token requests are cheap.
let cachedToken: CachedToken | null = null;

async function getGraphAppToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt - 60_000 > Date.now()) {
    return cachedToken.accessToken;
  }

  const tenantId = getEnv("MS_GRAPH_TENANT_ID");
  const clientId = getEnv("MS_GRAPH_CLIENT_ID");
  const clientSecret = getEnv("MS_GRAPH_CLIENT_SECRET");

  const res = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Graph token request failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { accessToken: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cachedToken.accessToken;
}

async function graphFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = await getGraphAppToken();
  return fetch(`${GRAPH_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
}

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------

export interface WebinarAttendeeInput {
  webinarId: string;
  firstName: string;
  lastName: string;
  email: string;
  preferredTimezone: string; // IANA tz, e.g. "Asia/Dubai"
  preferredLanguage?: string; // BCP47, default "en-us"
}

export type GraphRegisterResult = { ok: true } | { ok: false; status: number; message: string };

export async function registerWebinarAttendee(input: WebinarAttendeeInput): Promise<GraphRegisterResult> {
  const res = await graphFetch(`/solutions/virtualEvents/webinars/${input.webinarId}/registrations`, {
    method: "POST",
    body: JSON.stringify({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      preferredTimezone: input.preferredTimezone,
      preferredLanguage: input.preferredLanguage ?? "en-us",
    }),
  });

  // Success on the app-only (application-permission) path is 204 No Content
  // — unlike the delegated-auth path, which returns 201 + the registration
  // object. Do not attempt to parse a body here.
  if (res.status === 204) return { ok: true };

  const body = await res.text().catch(() => "");
  return { ok: false, status: res.status, message: body || res.statusText };
}

export async function findRegistrationByEmail(
  webinarId: string,
  email: string
): Promise<{ id: string } | null> {
  const escapedEmail = email.replace(/'/g, "''");
  const filter = encodeURIComponent(`email eq '${escapedEmail}'`);
  const res = await graphFetch(`/solutions/virtualEvents/webinars/${webinarId}/registrations?$filter=${filter}`);

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`findRegistrationByEmail failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as { value?: Array<{ id: string }> };
  const first = data.value?.[0];
  return first ? { id: first.id } : null;
}

export async function getJoinWebUrl(webinarId: string, registrationId: string): Promise<string | null> {
  const res = await graphFetch(
    `/solutions/virtualEvents/webinars/${webinarId}/registrations/${registrationId}/sessions`
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`getJoinWebUrl failed (${res.status}): ${body}`);
  }

  // NOTE: `joinWebUrl` matches Graph's established camelCase convention for
  // online-meeting join links (e.g. onlineMeeting.joinWebUrl), but this
  // specific virtualEventSession property has not been exercised against a
  // live tenant yet — verify the exact casing on first real call.
  const data = (await res.json()) as { value?: Array<{ joinWebUrl?: string }> };
  return data.value?.[0]?.joinWebUrl ?? null;
}

export type RegisterAndResolveResult =
  | { ok: true; joinWebUrl: string; registrationId: string }
  | { ok: false; stage: "register" | "lookup" | "sessions"; status?: number; message: string };

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function registerAttendeeAndResolveJoinUrl(
  input: WebinarAttendeeInput
): Promise<RegisterAndResolveResult> {
  const registerResult = await registerWebinarAttendee(input);
  if (!registerResult.ok) {
    return { ok: false, stage: "register", status: registerResult.status, message: registerResult.message };
  }

  // Defensive hedge, not confirmed Graph behavior: the registration write
  // may not be immediately read-consistent for the follow-up $filter query.
  // Verify whether this retry is actually needed once live access exists.
  let registration: { id: string } | null = null;
  const delaysMs = [0, 500, 1000];
  for (const delay of delaysMs) {
    if (delay) await sleep(delay);
    try {
      registration = await findRegistrationByEmail(input.webinarId, input.email);
    } catch (err) {
      registration = null;
      if (delay === delaysMs[delaysMs.length - 1]) {
        return { ok: false, stage: "lookup", message: err instanceof Error ? err.message : String(err) };
      }
      continue;
    }
    if (registration) break;
  }

  if (!registration) {
    return { ok: false, stage: "lookup", message: "Registration succeeded but could not be found by email afterward." };
  }

  try {
    const joinWebUrl = await getJoinWebUrl(input.webinarId, registration.id);
    if (!joinWebUrl) {
      return { ok: false, stage: "sessions", message: "No session/join URL found for this registration." };
    }
    return { ok: true, joinWebUrl, registrationId: registration.id };
  } catch (err) {
    return { ok: false, stage: "sessions", message: err instanceof Error ? err.message : String(err) };
  }
}

// ---------------------------------------------------------------------------
// Discovery — lists published webinars tenant-wide so the events hub can
// auto-discover a newly published event instead of needing a manual code
// change per event. Same VirtualEvent.Read.All application permission as
// listWebinarPresenters below — no separate consent needed.
//
// Gotcha from Microsoft's own docs, worth remembering if a webinar doesn't
// show up: "This API returns only webinars whose organizer has been
// assigned an application access policy" — an organizer who was never
// granted the Teams Application Access Policy (see manual setup checklist)
// won't have their webinars appear here at all, even if published.
// ---------------------------------------------------------------------------

export interface DiscoveredWebinar {
  id: string;
  displayName: string;
  description: string | null;
  status: "draft" | "published" | "canceled" | string;
  audience: string;
  startDateTime: string | null; // Graph's raw local wall-clock time, no UTC offset
  startTimeZone: string | null; // Windows time zone name, e.g. "Arabian Standard Time"
  endDateTime: string | null;
  endTimeZone: string | null;
}

interface RawWebinar {
  id: string;
  displayName: string;
  description?: { content?: string } | string | null;
  status: string;
  audience: string;
  startDateTime?: { dateTime?: string; timeZone?: string };
  endDateTime?: { dateTime?: string; timeZone?: string };
}

export async function listPublishedWebinars(): Promise<DiscoveredWebinar[]> {
  const res = await graphFetch(`/solutions/virtualEvents/webinars`);

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`listPublishedWebinars failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as { value?: RawWebinar[] };

  return (data.value ?? [])
    // Only publicly-visible, published webinars — an "organization"-scoped
    // (internal-only) webinar should never surface on the public site even
    // if published.
    .filter((w) => w.status === "published" && w.audience !== "organization")
    .map((w) => ({
      id: w.id,
      displayName: w.displayName,
      description: typeof w.description === "string" ? w.description : w.description?.content ?? null,
      status: w.status,
      audience: w.audience,
      startDateTime: w.startDateTime?.dateTime ?? null,
      startTimeZone: w.startDateTime?.timeZone ?? null,
      endDateTime: w.endDateTime?.dateTime ?? null,
      endTimeZone: w.endDateTime?.timeZone ?? null,
    }));
}

// ---------------------------------------------------------------------------
// Presenters — read-only, used to populate the event page's speaker section
// live from Teams instead of hand-entering it. Requires a separate
// application permission from registration: VirtualEvent.Read.All (see
// manual setup checklist).
// ---------------------------------------------------------------------------

export interface WebinarPresenter {
  displayName: string;
  jobTitle: string | null;
  company: string | null;
  bio: string | null;
}

interface RawPresenter {
  email?: string;
  identity?: { displayName?: string; user?: { displayName?: string }; guest?: { displayName?: string } };
  presenterDetails?: {
    jobTitle?: string;
    company?: string;
    bio?: { content?: string };
  } | null;
}

export async function listWebinarPresenters(webinarId: string): Promise<WebinarPresenter[]> {
  const res = await graphFetch(`/solutions/virtualEvents/webinars/${webinarId}/presenters`);

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`listWebinarPresenters failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as { value?: RawPresenter[] };

  // NOTE: the exact shape of `identity` for a name hasn't been exercised
  // against a live tenant — this checks the plausible variants (a plain
  // displayName directly on identity, or nested under user/guest) rather
  // than assuming one. presenterDetails.photo (a binary Stream property) is
  // deliberately not fetched here — it needs its own authenticated request
  // per presenter and a proxy route to serve it to the browser; treat that
  // as a follow-up, not wired up yet.
  return (data.value ?? []).map((p) => ({
    displayName:
      p.identity?.displayName ?? p.identity?.user?.displayName ?? p.identity?.guest?.displayName ?? "Presenter",
    jobTitle: p.presenterDetails?.jobTitle ?? null,
    company: p.presenterDetails?.company ?? null,
    bio: p.presenterDetails?.bio?.content ?? null,
  }));
}

// ---------------------------------------------------------------------------
// Two-way sync — Graph change-notification subscriptions
// ---------------------------------------------------------------------------

export async function createRegistrationSubscription(
  webinarId: string,
  notificationUrl: string,
  clientState: string
): Promise<{ subscriptionId: string; expiresAt: string } | { ok: false; status: number; message: string }> {
  // Graph caps subscription lifetime per resource type — the exact max for
  // this resource isn't confirmed by this session's research. Request a
  // conservative 48h window and let the renewal cron extend it repeatedly
  // rather than assuming a long-lived subscription.
  const expirationDateTime = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

  const res = await graphFetch(`/subscriptions`, {
    method: "POST",
    body: JSON.stringify({
      changeType: "updated,deleted",
      notificationUrl,
      resource: `/solutions/virtualEvents/webinars/${webinarId}/registrations`,
      clientState,
      expirationDateTime,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false, status: res.status, message: body || res.statusText };
  }

  const data = (await res.json()) as { id: string; expirationDateTime: string };
  return { subscriptionId: data.id, expiresAt: data.expirationDateTime };
}

export async function renewSubscription(
  subscriptionId: string,
  newExpirationDateTime: string
): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const res = await graphFetch(`/subscriptions/${subscriptionId}`, {
    method: "PATCH",
    body: JSON.stringify({ expirationDateTime: newExpirationDateTime }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false, status: res.status, message: body || res.statusText };
  }
  return { ok: true };
}

export async function getRegistrationById(
  webinarId: string,
  registrationId: string
): Promise<{ status: string } | null> {
  const res = await graphFetch(`/solutions/virtualEvents/webinars/${webinarId}/registrations/${registrationId}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`getRegistrationById failed (${res.status}): ${body}`);
  }
  const data = (await res.json()) as { status: string };
  return { status: data.status };
}
