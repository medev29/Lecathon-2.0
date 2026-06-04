import Link from "next/link";
import { AdminButton } from "@/components/admin/admin-ui";

export default function EmptyCmsHint({
  label,
  onSeed,
  seeding,
}: {
  label: string;
  onSeed?: () => void;
  seeding?: boolean;
}) {
  return (
    <div className="text-sm text-[#888] space-y-3 py-2">
      <p>No {label} in the database yet.</p>
      {onSeed ? (
        <AdminButton type="button" onClick={onSeed} disabled={seeding}>
          {seeding ? "Loading defaults…" : "Load default content"}
        </AdminButton>
      ) : (
        <Link href="/admin" className="text-yellow-400 hover:text-yellow-300 text-xs">
          Go to Overview → Seed default content
        </Link>
      )}
    </div>
  );
}
