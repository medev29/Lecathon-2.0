import { requireSql } from "@/lib/sql";
import { getDefaultSiteContent } from "@/lib/defaults";
import { revalidatePublicSite } from "@/lib/revalidate-site";

export async function seedScheduleOnly(): Promise<{ message: string }> {
  const sql = requireSql();
  const content = getDefaultSiteContent();

  await sql`DELETE FROM schedule_items`;

  for (const item of [
    ...content.lecaWeekSchedule,
    ...content.hackathonSchedule,
  ]) {
    await sql`
      INSERT INTO schedule_items (
        schedule_type, time, phase, description, sort_order
      )
      VALUES (
        ${item.scheduleType},
        ${item.time},
        ${item.phase},
        ${item.description},
        ${item.sortOrder}
      )
    `;
  }

  await sql`
    INSERT INTO site_settings (key, value)
    VALUES ('schedule_date_label', ${content.settings.scheduleDateLabel})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
  `;

  revalidatePublicSite();

  return {
    message: `Loaded ${content.lecaWeekSchedule.length} Lecaweek + ${content.hackathonSchedule.length} hackathon schedule items.`,
  };
}
