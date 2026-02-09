#!/usr/bin/env node

import { parseArgs } from "./cli/parse-args";
import { renderSummary } from "./cli/render-summary";
import { runScaffold } from "./scaffold";
import { getSummaryCounts } from "./scaffold/plan-actions";

function main(): void {
  try {
    const args = parseArgs(process.argv.slice(2));

    if (args.help) {
      printHelp();
      process.exit(0);
    }

    const result = runScaffold(process.cwd(), args);
    const counts = getSummaryCounts(result.actions);

    process.stdout.write(`${renderSummary(counts, args.check)}\n`);

    if (args.check && result.driftFound) {
      process.exit(2);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    process.stderr.write(`${message}\n`);
    process.exit(1);
  }
}

function printHelp(): void {
  process.stdout.write(
    [
      "learn-skill",
      "",
      "Usage:",
      "  npx learn-skill [init] [--platform opencode|cursor|claude|all] [--check] [--dry-run]",
      "",
      "Defaults:",
      "  --platform all",
    ].join("\n"),
  );
}

main();
