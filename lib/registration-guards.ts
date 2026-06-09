import { fetchSettingsFromDb } from "@/lib/admin-settings";
import {
  checkRegisterRateLimit,
  getClientIp,
  recordRegisterAttempt,
} from "@/lib/security";
import {
  countRegistrations,
  findDuplicateRegistration,
} from "@/lib/db";
import { isRegistrationOpenBySettings } from "@/lib/site-settings";
import type { ValidatedRegistration } from "@/lib/registration";

export type RegistrationAvailability = {
  open: boolean;
  reason?: string;
  spotsLeft?: number;
  teamCount: number;
};

export async function getRegistrationAvailability(): Promise<RegistrationAvailability> {
  const [settings, teamCount] = await Promise.all([
    fetchSettingsFromDb(),
    countRegistrations(),
  ]);
  const status = isRegistrationOpenBySettings(settings, teamCount);
  return { ...status, teamCount };
}

export async function assertCanRegister(
  req: Request,
  data: ValidatedRegistration
): Promise<{ ok: true } | { ok: false; message: string; status: number }> {
  const ip = getClientIp(req);

  if (await checkRegisterRateLimit(ip)) {
    return {
      ok: false,
      message: "Too many registration attempts. Please try again later.",
      status: 429,
    };
  }

  const availability = await getRegistrationAvailability();
  if (!availability.open) {
    return {
      ok: false,
      message: availability.reason ?? "Registration is currently closed.",
      status: 403,
    };
  }

  const duplicate = await findDuplicateRegistration(
    data.email,
    data.teamName,
    data.members.map((m) => m.email)
  );
  if (duplicate) {
    return {
      ok: false,
      message: duplicate,
      status: 409,
    };
  }

  await recordRegisterAttempt(ip);
  return { ok: true };
}
