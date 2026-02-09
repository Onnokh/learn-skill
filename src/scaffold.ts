import fs from "node:fs";
import path from "node:path";

import { getTargetFiles } from "./scaffold/get-target-files";
import { getSummaryCounts, planScaffoldActions } from "./scaffold/plan-actions";
import type { ParsedArgs, PlannedAction } from "./types";

export interface ScaffoldResult {
  actions: PlannedAction[];
  driftFound: boolean;
}

export function runScaffold(cwd: string, args: ParsedArgs): ScaffoldResult {
  const targets = getTargetFiles(args.platform);
  const existing = Object.fromEntries(
    targets.map((target) => {
      const absolutePath = path.resolve(cwd, target.path);
      if (!fs.existsSync(absolutePath)) {
        return [target.path, null];
      }
      return [target.path, fs.readFileSync(absolutePath, "utf8")];
    }),
  );

  const actions = planScaffoldActions(targets, existing);
  const counts = getSummaryCounts(actions);
  const driftFound = counts.create + counts.update > 0;

  if (!args.check && !args.dryRun) {
    for (const action of actions) {
      if (action.kind === "noop") {
        continue;
      }
      const filePath = path.resolve(cwd, action.path);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, action.nextContent, "utf8");
    }
  }

  return { actions, driftFound };
}
