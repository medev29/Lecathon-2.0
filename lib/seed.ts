import { requireSql } from "@/lib/sql";
import { getDefaultSiteContent } from "@/lib/defaults";

export async function seedDatabase(): Promise<{ message: string }> {
  const sql = requireSql();
  const content = getDefaultSiteContent();

  await sql`DELETE FROM sponsors`;
  await sql`DELETE FROM problem_themes`;
  await sql`DELETE FROM faqs`;
  await sql`DELETE FROM schedule_items`;

  for (const sponsor of content.sponsors) {
    await sql`
      INSERT INTO sponsors (name, logo_url, logo_text, website_url, sort_order)
      VALUES (
        ${sponsor.name},
        ${sponsor.logoUrl},
        ${sponsor.logoText},
        ${sponsor.websiteUrl},
        ${sponsor.sortOrder}
      )
    `;
  }

  for (const theme of content.problemThemes) {
    await sql`
      INSERT INTO problem_themes (title, description, image_url, sort_order)
      VALUES (
        ${theme.title},
        ${theme.description},
        ${theme.imageUrl},
        ${theme.sortOrder}
      )
    `;
  }

  for (const faq of content.faqs) {
    await sql`
      INSERT INTO faqs (question, answer, sort_order)
      VALUES (${faq.question}, ${faq.answer}, ${faq.sortOrder})
    `;
  }

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

  const { settings } = content;
  const settingsEntries: [string, string][] = [
    ["hackathon_date", settings.hackathonDate],
    ["schedule_date_label", settings.scheduleDateLabel],
    ["prize_pool", settings.prizePool],
    ["participants_label", settings.participantsLabel],
    ["duration_label", settings.durationLabel],
    ["venue_name", settings.venueName],
    ["venue_address", settings.venueAddress],
  ];

  for (const [key, value] of settingsEntries) {
    await sql`
      INSERT INTO site_settings (key, value)
      VALUES (${key}, ${value})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `;
  }

  return { message: "Database seeded with default Lecathon content." };
}
