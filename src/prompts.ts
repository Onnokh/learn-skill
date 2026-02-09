const SHARED_BODY = `You are executing /learn-skill for topic: $ARGUMENTS.

Goal:
- Generate a reusable, language-agnostic skill that strictly follows the Agent Skills standard.

Authoritative standard:
- https://agentskills.io is the only normative source for skill format and behavior.
- If any other guidance conflicts with agentskills.io, follow agentskills.io.

Operating constraints:
- Keep this command agent-agnostic. Do not produce provider-specific instructions unless they are explicitly required for compatibility.
- Do not write to internal, system-managed skill folders (for example ~/.cursor/skills-cursor/).

Workflow:
1. Discovery:
   - Infer intent from the topic and available repository context before asking for clarification.
   - Inspect currently installed skills first (project and global) to learn structure and writing style:
     - .agents/skills/*/SKILL.md
     - ~/.agents/skills/*/SKILL.md
     - .opencode/skills/*/SKILL.md
     - ~/.config/opencode/skills/*/SKILL.md
     - .claude/skills/*/SKILL.md
     - ~/.claude/skills/*/SKILL.md
   - Capture repository provenance for analyzed skills when possible (from SKILL metadata/source links or "npx skills ls -g" / "npx skills find <skill-name>" output).
2. Research:
   - Use Context7 for documentation research.
   - If Context7 is unavailable, fall back to official documentation.
3. Design:
   - Choose one focused workflow for the skill; do not combine unrelated workflows.
   - Define trigger scenarios (when to apply) and boundaries (when not to apply).
   - Select an appropriate guidance level:
     - High freedom: principles/checklists for context-dependent work.
     - Medium freedom: templates/pseudocode for structured outputs.
     - Low freedom: deterministic scripts/commands for fragile workflows.
4. Implementation:
   - Generate the skill at .agents/skills/<topic-slug>/SKILL.md.
   - Create references/ files only when needed (broad or complex topics, or when deep documentation is useful).
5. Verification:
   - Validate quality, consistency, and references before finishing.

Output requirements:
- Use strict SKILL.md frontmatter with only:
  - name: <topic-slug>
  - description: what the skill does, when it should trigger, and when it should not trigger.
- Enforce metadata limits:
  - name must be <= 64 characters, lowercase letters/numbers/hyphens only, and match folder/topic slug.
  - description must be <= 1024 characters, specific, and written in third person.
- Description quality bar:
  - Include both WHAT the skill does and WHEN it should be used.
  - Include concrete trigger terms a routing model can match.
  - Avoid first-person or second-person phrasing.
- Keep SKILL.md under 500 lines and concise by default.
- Prefer progressive disclosure: concise core instructions in SKILL.md, and move deep details to reference files.
- Keep file references one level deep from SKILL.md (do not chain deep nested references).
- Keep body instructions imperative and action-oriented.
- Include these sections in order:
  1. Purpose
  2. When to use / When not to use
  3. Workflow
  4. Examples
  5. Pitfalls
  6. Debugging checklist
  7. References
- Include concrete examples by inferring language/framework from topic when clear; otherwise use neutral pseudocode.
- If scripts/tools are included:
  - state whether to execute scripts or read them as reference.
  - document required runtimes/dependencies and expected outputs.
  - include security guidance: do not hardcode secrets; treat scripts as untrusted until reviewed.
- Add a short validation checklist that confirms:
  - trigger quality and boundaries,
  - section completeness and terminology consistency,
  - every referenced file exists.
- If references/ is created, include:
  - references/sources.md (documentation URLs and repositories used, with what each source informed)
  - references/existing-skills.md (installed skills reviewed, local path, inferred repository/source, and reusable patterns extracted)

If Context7 is unavailable, continue using model context and proceed without blocking.`;

export function buildOpenCodeCommandPrompt(): string {
  return `---
description: Generate a strict, language-agnostic skill from a topic
---
${SHARED_BODY}
`;
}

export function buildCursorCommandPrompt(): string {
  return `# learn-skill

${SHARED_BODY.replace("$ARGUMENTS", "<topic>")}
`;
}

export function buildClaudeCommandPrompt(): string {
  return `---
description: Generate a strict, language-agnostic skill from a topic
---
${SHARED_BODY}
`;
}
