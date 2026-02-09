import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

import {
  buildClaudeCommandPrompt,
  buildCursorCommandPrompt,
  buildOpenCodeCommandPrompt,
} from "../prompts";
import type { Platform, TargetFile } from "../types";

export function getTargetFiles(platform: Platform): TargetFile[] {
  const home = os.homedir();
  const targets: TargetFile[] = [];

  if (platform === "all" || platform === "opencode") {
    targets.push({
      platform: "opencode",
      path: path.join(home, ".config", "opencode", "commands", "learn-skill.md"),
      content: buildOpenCodeCommandPrompt(),
    });
  }

  if (platform === "all" || platform === "cursor") {
    const cursorPaths = getCursorCommandPaths(home);
    for (const cursorPath of cursorPaths) {
      targets.push({
        platform: "cursor",
        path: cursorPath,
        content: buildCursorCommandPrompt(),
      });
    }
  }

  if (platform === "all" || platform === "claude") {
    targets.push({
      platform: "claude",
      path: path.join(home, ".claude", "commands", "learn-skill.md"),
      content: buildClaudeCommandPrompt(),
    });
  }

  return targets;
}

function getCursorCommandPaths(home: string): string[] {
  const paths = [path.join(home, ".cursor", "commands", "learn-skill.md")];

  if (!process.env.WSL_DISTRO_NAME) {
    return paths;
  }

  const windowsHome = getWindowsHomeInWsl();
  if (!windowsHome) {
    return paths;
  }

  const windowsCursorPath = path.join(windowsHome, ".cursor", "commands", "learn-skill.md");
  if (!paths.includes(windowsCursorPath)) {
    paths.push(windowsCursorPath);
  }

  return paths;
}

function getWindowsHomeInWsl(): string | null {
  try {
    const output = execFileSync("cmd.exe", ["/C", "echo", "%USERPROFILE%"], {
      cwd: "/mnt/c",
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    if (!/^[A-Za-z]:\\/.test(output)) {
      return null;
    }

    const windowsPath = output
      .replace(/\\/g, "/")
      .replace(/^([A-Za-z]):/, (_, drive: string) => `/mnt/${drive.toLowerCase()}`);

    if (!fs.existsSync(windowsPath)) {
      return null;
    }

    return windowsPath;
  } catch {
    return null;
  }
}
