import { getDefaultSiteContent } from "@/lib/defaults";
import type { SiteSettings } from "@/lib/types/site";
import { getSql } from "@/lib/sql";

export async function fetchSettingsFromDb(): Promise<SiteSettings> {
  const defaults = getDefaultSiteContent().settings;
  const sql = getSql();
  if (!sql) {
    return defaults;
  }

  const rows = await sql`SELECT key, value FROM site_settings`;
  const map = new Map(
    (rows as { key: string; value: string }[]).map((r) => [r.key, r.value])
  );

  return {
    hackathonDate: map.get("hackathon_date") ?? defaults.hackathonDate,
    scheduleDateLabel:
      map.get("schedule_date_label") ?? defaults.scheduleDateLabel,
    prizePool: map.get("prize_pool") ?? defaults.prizePool,
    participantsLabel:
      map.get("participants_label") ?? defaults.participantsLabel,
    durationLabel: map.get("duration_label") ?? defaults.durationLabel,
    venueName: map.get("venue_name") ?? defaults.venueName,
    venueAddress: map.get("venue_address") ?? defaults.venueAddress,
  };
}
