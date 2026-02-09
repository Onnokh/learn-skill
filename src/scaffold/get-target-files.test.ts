import { describe, expect, it } from "vitest";
import os from "node:os";
import path from "node:path";

import { getTargetFiles } from "./get-target-files";

describe("getTargetFiles", () => {
  const home = os.homedir();
  const opencodePath = path.join(home, ".config", "opencode", "commands", "learn-skill.md");
  const cursorPath = path.join(home, ".cursor", "commands", "learn-skill.md");
  const claudePath = path.join(home, ".claude", "commands", "learn-skill.md");

  it("returns all targets by default", () => {
    const targets = getTargetFiles("all");
    const paths = targets.map((t) => t.path);

    expect(paths).toContain(opencodePath);
    expect(paths).toContain(cursorPath);
    expect(paths).toContain(claudePath);
  });

  it("returns only opencode target", () => {
    const targets = getTargetFiles("opencode");
    expect(targets.map((t) => t.path)).toEqual([opencodePath]);
  });

  it("returns only cursor target", () => {
    const targets = getTargetFiles("cursor");
    const paths = targets.map((t) => t.path);

    expect(paths).toContain(cursorPath);
    expect(paths.every((targetPath) => targetPath.endsWith(path.join(".cursor", "commands", "learn-skill.md")))).toBe(true);
  });

  it("returns only claude target", () => {
    const targets = getTargetFiles("claude");
    expect(targets.map((t) => t.path)).toEqual([claudePath]);
  });
});
