import { requireSql } from "@/lib/sql";
import type { RegistrationRow } from "@/lib/types/site";

type RegistrationDbRow = {
  id: number;
  team_leader_name: string;
  team_leader_email: string;
  phone: string;
  team_name: string;
  college: string;
  theme: string | null;
  team_size: number;
  members: { name: string; email: string }[];
  registered_at: string;
};

function parseMembers(
  members: RegistrationDbRow["members"]
): { name: string; email: string }[] {
  if (Array.isArray(members)) {
    return members;
  }
  if (typeof members === "string") {
    try {
      return JSON.parse(members) as { name: string; email: string }[];
    } catch {
      return [];
    }
  }
  return [];
}

function mapRow(row: RegistrationDbRow): RegistrationRow {
  return {
    id: row.id,
    teamLeaderName: row.team_leader_name,
    teamLeaderEmail: row.team_leader_email,
    phone: row.phone,
    teamName: row.team_name,
    college: row.college,
    theme: row.theme,
    teamSize: row.team_size,
    members: parseMembers(row.members),
    registeredAt: row.registered_at,
  };
}

export async function listRegistrations(): Promise<RegistrationRow[]> {
  const sql = requireSql();
  const rows = await sql`
    SELECT *
    FROM registrations
    ORDER BY registered_at DESC
  `;
  return (rows as RegistrationDbRow[]).map(mapRow);
}

export function registrationsToCsv(rows: RegistrationRow[]): string {
  const headers = [
    "ID",
    "Registered At",
    "Team Leader",
    "Leader Email",
    "Phone",
    "Team Name",
    "College",
    "Theme",
    "Team Size",
    "Members",
  ];

  const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;

  const lines = rows.map((row) => {
    const members = row.members
      .map((m) => `${m.name} <${m.email}>`)
      .join("; ");
    return [
      row.id,
      row.registeredAt,
      row.teamLeaderName,
      row.teamLeaderEmail,
      row.phone,
      row.teamName,
      row.college,
      row.theme ?? "",
      row.teamSize,
      members,
    ]
      .map((v) => escape(String(v)))
      .join(",");
  });

  return [headers.join(","), ...lines].join("\n");
}
