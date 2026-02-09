import { describe, expect, it } from "vitest";
import os from "node:os";
import path from "node:path";

import { planScaffoldActions } from "./plan-actions";

describe("planScaffoldActions", () => {
  const home = os.homedir();
  const opencodePath = path.join(home, ".config", "opencode", "commands", "learn-skill.md");
  const cursorPath = path.join(home, ".cursor", "commands", "learn-skill.md");

  const targets = [
    {
      platform: "opencode" as const,
      path: opencodePath,
      content: "A",
    },
    {
      platform: "cursor" as const,
      path: cursorPath,
      content: "B",
    },
  ];

  it("plans create for missing files", () => {
    const actions = planScaffoldActions(targets, {});
    expect(actions.map((a) => a.kind)).toEqual(["create", "create"]);
  });

  it("plans update for drifted files", () => {
    const actions = planScaffoldActions(targets, {
      [opencodePath]: "old",
      [cursorPath]: "B",
    });

    expect(actions[0].kind).toBe("update");
    expect(actions[1].kind).toBe("noop");
  });

  it("plans noop for matching files", () => {
    const actions = planScaffoldActions(targets, {
      [opencodePath]: "A",
      [cursorPath]: "B",
    });

    expect(actions.map((a) => a.kind)).toEqual(["noop", "noop"]);
  });
});
