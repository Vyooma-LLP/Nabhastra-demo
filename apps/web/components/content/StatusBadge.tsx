import type { ContentStatus } from "@/content/types";

const LABEL: Record<ContentStatus, string> = {
  verified: "Verified",
  provisional: "Provisional",
  unknown: "Unknown",
  conflicting: "Conflicting sources",
  deprecated: "Superseded",
};

/**
 * The visible face of the content-status model, restyled per
 * project/DESIGN.md §9 (data honesty as editorial metadata): quiet uppercase
 * mono caption, no border box, no rounded corner - the frame language is
 * reserved for the corner bracket, never spent on a status chip. This reads
 * as aerospace configuration context, not a defect notice.
 *
 * "we don't fake certainty, we isolate uncertainty" still holds: every
 * surface that isn't "verified" says so, in the UI, not just in a comment.
 */
export function StatusBadge({ status }: { status: ContentStatus }) {
  if (status === "verified") return null;

  return (
    <span
      className="font-mono text-meta-sm tracking-nav text-paper-dim uppercase"
      data-status={status}
    >
      {LABEL[status]}
    </span>
  );
}
