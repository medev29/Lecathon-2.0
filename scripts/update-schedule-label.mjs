import nextEnv from "@next/env";
import { neon } from "@neondatabase/serverless";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const sql = neon(process.env.DATABASE_URL);
await sql`
  INSERT INTO site_settings (key, value)
  VALUES ('schedule_date_label', 'Asar 18,19, 2083')
  ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
`;
console.log("Updated schedule_date_label to Asar 18,19, 2083");
