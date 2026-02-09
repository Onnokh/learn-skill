export type Platform = "opencode" | "cursor" | "claude" | "all";

export interface ParsedArgs {
  platform: Platform;
  check: boolean;
  dryRun: boolean;
  help: boolean;
}

export interface TargetFile {
  platform: Exclude<Platform, "all">;
  path: string;
  content: string;
}

export type ActionKind = "create" | "update" | "noop";

export interface PlannedAction {
  kind: ActionKind;
  path: string;
  nextContent: string;
}

export interface SummaryCounts {
  create: number;
  update: number;
  noop: number;
}
