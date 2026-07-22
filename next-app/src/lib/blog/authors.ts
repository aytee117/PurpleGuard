import type { BlogAuthor } from "./types";

/** Post bylines. Keyed by `authorId` on each post. */
export const authors: Record<string, BlogAuthor> = {
  "purpleguard-soc": {
    id: "purpleguard-soc",
    name: "PurpleGuard SOC Team",
    role: "Threat Intelligence · PurpleSOC",
  },
};

export function getAuthor(id: string): BlogAuthor {
  return authors[id] ?? authors["purpleguard-soc"];
}
