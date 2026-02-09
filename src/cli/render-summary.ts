import type { SummaryCounts } from "../types";

export function renderSummary(counts: SummaryCounts, checkMode: boolean): string {
  const lines = [
    `Created: ${counts.create}`,
    `Updated: ${counts.update}`,
    `Unchanged: ${counts.noop}`,
  ];

  if (checkMode) {
    const drift = counts.create + counts.update;
    lines.unshift(drift > 0 ? `Drift detected: ${drift} file(s)` : "No drift detected");
  } else {
    lines.unshift("Scaffold complete");
  }

  return lines.join("\n");
}
