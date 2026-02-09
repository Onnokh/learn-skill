#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/cli/parse-args.ts
var VALID_PLATFORMS = ["opencode", "cursor", "claude", "all"];
function parseArgs(argv) {
  const args = {
    platform: "all",
    check: false,
    dryRun: false,
    help: false
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
function normalizePlatform(value) {
  if (value === "both") {
    return "all";
  }
  return value;
}
function validatePlatform(value) {
  if (!VALID_PLATFORMS.includes(value)) {
    throw new Error(`Invalid platform: ${value}`);
  }
}

// src/cli/render-summary.ts
function renderSummary(counts, checkMode) {
  const lines = [
    `Created: ${counts.create}`,
    `Updated: ${counts.update}`,
    `Unchanged: ${counts.noop}`
  ];
  if (checkMode) {
    const drift = counts.create + counts.update;
    lines.unshift(drift > 0 ? `Drift detected: ${drift} file(s)` : "No drift detected");
  } else {
    lines.unshift("Scaffold complete");
  }
  return lines.join("\n");
}

// src/scaffold.ts
var import_node_fs2 = __toESM(require("fs"));
var import_node_path2 = __toESM(require("path"));

// src/scaffold/get-target-files.ts
var import_node_child_process = require("child_process");
var import_node_fs = __toESM(require("fs"));
var import_node_path = __toESM(require("path"));
var import_node_os = __toESM(require("os"));

// src/prompts.ts
var SHARED_BODY = `You are executing /learn-skill for topic: $ARGUMENTS.

Goal:
- Generate a reusable, language-agnostic skill that strictly follows the Agent Skills standard.

Authoritative standard:
- https://agentskills.io is the only normative source for skill format and behavior.
- If any other guidance conflicts with agentskills.io, follow agentskills.io.

Workflow:
1. Inspect currently installed skills first (project and global) to learn structure and writing style:
   - .agents/skills/*/SKILL.md
   - ~/.agents/skills/*/SKILL.md
   - .opencode/skills/*/SKILL.md
   - ~/.config/opencode/skills/*/SKILL.md
   - .claude/skills/*/SKILL.md
   - ~/.claude/skills/*/SKILL.md
2. Capture repository provenance for analyzed skills when possible (from SKILL metadata/source links or "npx skills ls -g" / "npx skills find <skill-name>" output).
3. Use Context7 for documentation research.
4. If Context7 is unavailable, fall back to official documentation.
5. Synthesize practical patterns and implementation guidance from installed-skill patterns plus researched material.
6. Generate the skill at .agents/skills/<topic-slug>/SKILL.md.

Output requirements:
- Use strict SKILL.md frontmatter with only:
  - name: <topic-slug>
  - description: what the skill does, when it should trigger, and when it should not trigger.
- Enforce metadata limits: name must be <= 64 characters and description must be <= 200 characters.
- If scripts/tools/dependencies are required, include a dependencies metadata field and list required runtimes/packages.
- Ensure skill name, folder name, and topic slug are identical.
- Keep the skill focused on one repeatable workflow; do not combine unrelated workflows.
- Prefer progressive disclosure: concise core instructions in SKILL.md, and move scenario-specific details to reference files.
- Keep body instructions imperative and action-oriented.
- Include these sections in order:
  1. Purpose
  2. Workflow
  3. Examples
  4. Pitfalls
  5. Debugging checklist
  6. References
- Include concrete examples by inferring language/framework from topic when clear; otherwise use neutral pseudocode.
- Keep SKILL.md concise; move deep details into references/ files and link them.
- If scripts or executable tooling are included, document required runtime/dependencies in the skill metadata or references.
- Add a short validation checklist that confirms trigger quality, section completeness, and that every referenced file exists.
- Add security guidance: do not hardcode secrets; treat scripts as untrusted until reviewed.
- Create references/ files only when needed (broad or complex topics, or when the user requests deep documentation).
- If references/ is created, include:
  - references/sources.md (documentation URLs and repositories used, with what each source informed)
  - references/existing-skills.md (installed skills reviewed, local path, inferred repository/source, and reusable patterns extracted)

If Context7 is unavailable, continue using model context and proceed without blocking.`;
function buildOpenCodeCommandPrompt() {
  return `---
description: Generate a strict, language-agnostic skill from a topic
---
${SHARED_BODY}
`;
}
function buildCursorCommandPrompt() {
  return `# learn-skill

${SHARED_BODY.replace("$ARGUMENTS", "<topic>")}
`;
}
function buildClaudeCommandPrompt() {
  return `---
description: Generate a strict, language-agnostic skill from a topic
---
${SHARED_BODY}
`;
}

// src/scaffold/get-target-files.ts
function getTargetFiles(platform) {
  const home = import_node_os.default.homedir();
  const targets = [];
  if (platform === "all" || platform === "opencode") {
    targets.push({
      platform: "opencode",
      path: import_node_path.default.join(home, ".config", "opencode", "commands", "learn-skill.md"),
      content: buildOpenCodeCommandPrompt()
    });
  }
  if (platform === "all" || platform === "cursor") {
    const cursorPaths = getCursorCommandPaths(home);
    for (const cursorPath of cursorPaths) {
      targets.push({
        platform: "cursor",
        path: cursorPath,
        content: buildCursorCommandPrompt()
      });
    }
  }
  if (platform === "all" || platform === "claude") {
    targets.push({
      platform: "claude",
      path: import_node_path.default.join(home, ".claude", "commands", "learn-skill.md"),
      content: buildClaudeCommandPrompt()
    });
  }
  return targets;
}
function getCursorCommandPaths(home) {
  const paths = [import_node_path.default.join(home, ".cursor", "commands", "learn-skill.md")];
  if (!process.env.WSL_DISTRO_NAME) {
    return paths;
  }
  const windowsHome = getWindowsHomeInWsl();
  if (!windowsHome) {
    return paths;
  }
  const windowsCursorPath = import_node_path.default.join(windowsHome, ".cursor", "commands", "learn-skill.md");
  if (!paths.includes(windowsCursorPath)) {
    paths.push(windowsCursorPath);
  }
  return paths;
}
function getWindowsHomeInWsl() {
  try {
    const output = (0, import_node_child_process.execFileSync)("cmd.exe", ["/C", "echo", "%USERPROFILE%"], {
      cwd: "/mnt/c",
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
    if (!/^[A-Za-z]:\\/.test(output)) {
      return null;
    }
    const windowsPath = output.replace(/\\/g, "/").replace(/^([A-Za-z]):/, (_, drive) => `/mnt/${drive.toLowerCase()}`);
    if (!import_node_fs.default.existsSync(windowsPath)) {
      return null;
    }
    return windowsPath;
  } catch {
    return null;
  }
}

// src/scaffold/plan-actions.ts
function planScaffoldActions(targets, existing) {
  return targets.map((target) => {
    const current = existing[target.path] ?? null;
    if (current === null) {
      return {
        kind: "create",
        path: target.path,
        nextContent: target.content
      };
    }
    if (current !== target.content) {
      return {
        kind: "update",
        path: target.path,
        nextContent: target.content
      };
    }
    return {
      kind: "noop",
      path: target.path,
      nextContent: target.content
    };
  });
}
function getSummaryCounts(actions) {
  return actions.reduce(
    (acc, action) => {
      acc[action.kind] += 1;
      return acc;
    },
    { create: 0, update: 0, noop: 0 }
  );
}

// src/scaffold.ts
function runScaffold(cwd, args) {
  const targets = getTargetFiles(args.platform);
  const existing = Object.fromEntries(
    targets.map((target) => {
      const absolutePath = import_node_path2.default.resolve(cwd, target.path);
      if (!import_node_fs2.default.existsSync(absolutePath)) {
        return [target.path, null];
      }
      return [target.path, import_node_fs2.default.readFileSync(absolutePath, "utf8")];
    })
  );
  const actions = planScaffoldActions(targets, existing);
  const counts = getSummaryCounts(actions);
  const driftFound = counts.create + counts.update > 0;
  if (!args.check && !args.dryRun) {
    for (const action of actions) {
      if (action.kind === "noop") {
        continue;
      }
      const filePath = import_node_path2.default.resolve(cwd, action.path);
      import_node_fs2.default.mkdirSync(import_node_path2.default.dirname(filePath), { recursive: true });
      import_node_fs2.default.writeFileSync(filePath, action.nextContent, "utf8");
    }
  }
  return { actions, driftFound };
}

// src/cli.ts
function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) {
      printHelp();
      process.exit(0);
    }
    const result = runScaffold(process.cwd(), args);
    const counts = getSummaryCounts(result.actions);
    process.stdout.write(`${renderSummary(counts, args.check)}
`);
    if (args.check && result.driftFound) {
      process.exit(2);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    process.stderr.write(`${message}
`);
    process.exit(1);
  }
}
function printHelp() {
  process.stdout.write(
    [
      "learn-skill",
      "",
      "Usage:",
      "  npx learn-skill [init] [--platform opencode|cursor|claude|all] [--check] [--dry-run]",
      "",
      "Defaults:",
      "  --platform all"
    ].join("\n")
  );
}
main();
