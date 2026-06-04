import { getSql } from "@/lib/sql";
import type { ValidatedRegistration } from "./registration";

export async function saveRegistration(
  data: ValidatedRegistration
): Promise<number | null> {
  const sql = getSql();
  if (!sql) {
    return null;
  }
  const rows = await sql`
    INSERT INTO registrations (
      team_leader_name,
      team_leader_email,
      phone,
      team_name,
      college,
      theme,
      team_size,
      members
    )
    VALUES (
      ${data.name},
      ${data.email},
      ${data.phone},
      ${data.teamName},
      ${data.college},
      ${data.theme || null},
      ${data.teamSize},
      ${JSON.stringify(data.members)}::jsonb
    )
    RETURNING id
  `;

  const row = rows[0] as { id: number } | undefined;
  return row?.id ?? null;
}
