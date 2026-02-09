import type { ParsedArgs, Platform } from "../types";

const VALID_PLATFORMS: Platform[] = ["opencode", "cursor", "claude", "all"];

export function parseArgs(argv: string[]): ParsedArgs {
  const args: ParsedArgs = {
    platform: "all",
    check: false,
    dryRun: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (token === "init") {
      continue;
    }

    if (token === "--help" || token === "-h") {
      args.help = true;
      continue;
    }

    if (token === "--check") {
      args.check = true;
      continue;
    }

    if (token === "--dry-run") {
      args.dryRun = true;
      continue;
    }

    if (token.startsWith("--platform=")) {
      const value = normalizePlatform(token.split("=", 2)[1]);
      if (!value) {
        throw new Error("Missing value for --platform");
      }
      validatePlatform(value);
      args.platform = value;
      continue;
    }

    if (token === "--platform") {
      const value = normalizePlatform(argv[i + 1]);
      if (!value) {
        throw new Error("Missing value for --platform");
      }
      validatePlatform(value);
      args.platform = value;
      i += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${token}`);
  }

  return args;
}

function normalizePlatform(value: string | undefined): Platform | undefined {
  if (value === "both") {
    return "all";
  }

  return value as Platform | undefined;
}

function validatePlatform(value: Platform): void {
  if (!VALID_PLATFORMS.includes(value)) {
    throw new Error(`Invalid platform: ${value}`);
  }
}
