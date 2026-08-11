// Teams registrant/attendance CSV -> public.registrants, scoped to this
// file's CAMPAIGN_SLUG (upsert on campaign_slug+email — see project
// deliverables.md #8 for why campaign_slug exists: a second webinar reusing
// this table without it would silently overwrite this campaign's data).
//
// Usage:
//   npx tsx scripts/import-registrants.ts <path-to-csv>
//
// Run once after each promotional send (registration export) and once
// post-event (attendance export).
//
// Column names are matched case-insensitively against a few common variants
// (see COLUMN_ALIASES below). Microsoft's exact export headers can shift
// between the registration report and the post-event attendance report —
// verify the "Couldn't find an email column" message never fires on a real
// export before relying on this for the actual campaign.

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { readFileSync } from "node:fs";
import { getSupabaseAdmin } from "../src/lib/supabase";
import { CAMPAIGN_SLUG } from "../src/lib/campaigns/webinar-iep-aug2026";

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }
    if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const COLUMN_ALIASES = {
  email: ["email", "email address"],
  firstName: ["first name", "firstname"],
  lastName: ["last name", "lastname"],
  company: ["company", "company name", "organization"],
  jobTitle: ["job title", "title"],
  registeredAt: ["registration time", "registered at", "registration date"],
  attended: ["attended", "in meeting", "attendance"],
  durationMinutes: ["duration (minutes)", "attendance duration", "total duration (minutes)", "duration"],
};

function findColumn(headers: string[], aliases: string[]): number {
  for (const alias of aliases) {
    const idx = headers.indexOf(alias);
    if (idx !== -1) return idx;
  }
  return -1;
}

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: npx tsx scripts/import-registrants.ts <path-to-csv>");
    process.exit(1);
  }

  const rows = parseCsv(readFileSync(filePath, "utf-8"));
  const [headerRow, ...dataRows] = rows;
  const headers = headerRow.map((h) => h.trim().toLowerCase());

  const idx = {
    email: findColumn(headers, COLUMN_ALIASES.email),
    firstName: findColumn(headers, COLUMN_ALIASES.firstName),
    lastName: findColumn(headers, COLUMN_ALIASES.lastName),
    company: findColumn(headers, COLUMN_ALIASES.company),
    jobTitle: findColumn(headers, COLUMN_ALIASES.jobTitle),
    registeredAt: findColumn(headers, COLUMN_ALIASES.registeredAt),
    attended: findColumn(headers, COLUMN_ALIASES.attended),
    durationMinutes: findColumn(headers, COLUMN_ALIASES.durationMinutes),
  };

  if (idx.email === -1) {
    console.error(`Couldn't find an email column. Headers found: ${headerRow.join(", ")}`);
    process.exit(1);
  }

  const supabase = getSupabaseAdmin();
  let upserted = 0;
  let skipped = 0;

  for (const r of dataRows) {
    const email = r[idx.email]?.trim().toLowerCase();
    if (!email) {
      skipped++;
      continue;
    }

    const record: Record<string, unknown> = { campaign_slug: CAMPAIGN_SLUG, email };
    if (idx.firstName !== -1) record.first_name = r[idx.firstName]?.trim() || null;
    if (idx.lastName !== -1) record.last_name = r[idx.lastName]?.trim() || null;
    if (idx.company !== -1) record.company = r[idx.company]?.trim() || null;
    if (idx.jobTitle !== -1) record.job_title = r[idx.jobTitle]?.trim() || null;

    if (idx.registeredAt !== -1 && r[idx.registeredAt]) {
      const parsed = new Date(r[idx.registeredAt]);
      if (!Number.isNaN(parsed.getTime())) record.registered_at = parsed.toISOString();
    }
    if (idx.attended !== -1) {
      const v = r[idx.attended]?.trim().toLowerCase();
      record.attended = v === "yes" || v === "true" || v === "1";
    }
    if (idx.durationMinutes !== -1 && r[idx.durationMinutes]) {
      const minutes = Number.parseFloat(r[idx.durationMinutes]);
      if (!Number.isNaN(minutes)) record.attend_minutes = Math.round(minutes);
    }

    const { error } = await supabase.from("registrants").upsert(record, { onConflict: "campaign_slug,email" });
    if (error) {
      console.error(`Failed to upsert ${email}: ${error.message}`);
      skipped++;
      continue;
    }
    upserted++;
  }

  console.log(`Upserted ${upserted} row(s), skipped ${skipped}, from ${filePath}`);
}

main();
