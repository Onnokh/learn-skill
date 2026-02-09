import type { PlannedAction, SummaryCounts, TargetFile } from "../types";

export interface ExistingFileState {
  [filePath: string]: string | null;
}

export function planScaffoldActions(
  targets: TargetFile[],
  existing: ExistingFileState,
): PlannedAction[] {
  return targets.map((target) => {
    const current = existing[target.path] ?? null;

    if (current === null) {
      return {
        kind: "create",
        path: target.path,
        nextContent: target.content,
      };
    }

    if (current !== target.content) {
      return {
        kind: "update",
        path: target.path,
        nextContent: target.content,
      };
    }

    return {
      kind: "noop",
      path: target.path,
      nextContent: target.content,
    };
  });
}

export function getSummaryCounts(actions: PlannedAction[]): SummaryCounts {
  return actions.reduce<SummaryCounts>(
    (acc, action) => {
      acc[action.kind] += 1;
      return acc;
    },
    { create: 0, update: 0, noop: 0 },
  );
}
