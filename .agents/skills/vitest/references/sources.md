# Sources

This file records documentation used to author this skill and what each source informed.

## Agent Skills standard (normative)

- https://agentskills.io
  - Confirmed Agent Skills concept and progressive disclosure model.
- https://agentskills.io/specification
  - Confirmed SKILL.md requirements: YAML frontmatter, name constraints, optional directories, file references, and validation guidance.
- https://agentskills.io/what-are-skills
  - Confirmed activation flow and packaging conventions for reusable skills.
- https://agentskills.io/llms.txt
  - Used as the docs index to discover canonical pages.

## Vitest official docs

- https://vitest.dev/guide/
  - Confirmed install/runtime guidance, project setup, test naming patterns, and core usage.
- https://vitest.dev/guide/cli
  - Confirmed CLI commands and practical flags for run/watch/filter/coverage/debug workflows.
- https://vitest.dev/guide/mocking
  - Confirmed recommended mocking APIs (`vi.fn`, `vi.spyOn`, `vi.mock`) and reset/restore caveats.

## Additional ecosystem signal (non-normative)

- https://skills.sh/antfu/skills/vitest
  - Observed popular Vitest skill structure and references split pattern.
- https://raw.githubusercontent.com/antfu/skills/main/skills/vitest/SKILL.md
  - Compared concise top-level layout and reference-driven progressive disclosure.
- https://raw.githubusercontent.com/antfu/skills/main/skills/vitest/references/core-cli.md
  - Verified practical CLI examples to keep workflows actionable.

Security note:
- Do not hardcode credentials, tokens, or private keys in tests, fixtures, configs, or scripts.
- Treat external scripts and generated commands as untrusted until reviewed.
