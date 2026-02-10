import { describe, expect, it } from "vitest";

import { buildCursorCommandPrompt } from "../prompts";

describe("buildCursorCommandPrompt", () => {
  it("contains required behavior clauses", () => {
    const prompt = buildCursorCommandPrompt();

    expect(prompt).toContain("language-agnostic");
    expect(prompt).toContain("strictly follows the Agent Skills standard");
    expect(prompt).toContain("https://agentskills.io");
    expect(prompt).toContain("only normative source");
    expect(prompt).toContain("Use Context7");
    expect(prompt).toContain("/learn-skill");
    expect(prompt).toContain("# learn-skill");
    expect(prompt).toContain("<topic>");
    expect(prompt).toContain(".agents/skills/<topic-slug>/SKILL.md");
    expect(prompt).toContain("name: <topic-slug>");
    expect(prompt).toContain("when it should not trigger");
    expect(prompt).toContain("third person");
    expect(prompt).toContain("inferring language/framework from topic");
    expect(prompt).toContain("references/sources.md");
    expect(prompt).toContain("Choose one focused workflow");
    expect(prompt).toContain("Prefer progressive disclosure");
    expect(prompt).toContain("name must be <= 64 characters");
    expect(prompt).toContain("description must be <= 1024 characters");
    expect(prompt).toContain("agent-agnostic");
    expect(prompt).toContain("~/.cursor/skills-cursor/");
    expect(prompt).toContain("SKILL.md under 500 lines");
    expect(prompt).toContain("one level deep");
    expect(prompt).toContain("validation checklist");
    expect(prompt).toContain("do not hardcode secrets");
    expect(prompt).toContain("Context7 is unavailable");
    expect(prompt).not.toContain("TypeScript-focused");
  });
});
