import type { SiteSettings } from "@/lib/types/site";

export function scheduleTypeLabel(
  type: "leca_week" | "hackathon",
  settings: Pick<SiteSettings, "scheduleDay1Label" | "scheduleDay2Label">
): string {
  return type === "hackathon"
    ? settings.scheduleDay1Label
    : settings.scheduleDay2Label;
}
