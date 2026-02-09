# learn-skill v1 Architecture

## Goal

- Run `npx learn-skill` once to scaffold command wrappers for OpenCode, Cursor, and Claude Code.
- Use `/learn-skill <topic>` inside those apps to generate reusable skills.
- Keep output language-agnostic, strict-spec, and Context7-driven.

## Product Boundaries

- The CLI (`learn-skill`) only scaffolds and updates wrapper command files.
- Skill generation runs inside OpenCode/Cursor/Claude Code through `/learn-skill`.
- Generated wrapper files are fully owned by `learn-skill` and overwritten deterministically.

Owned files:

- `~/.config/opencode/commands/learn-skill.md`
- `~/.cursor/commands/learn-skill.md`
- `~/.claude/commands/learn-skill.md`

Non-goals in v1:

- No `postinstall` automation.
- No managed markers.
- No provider plugin system.

## Runtime Model

1. Developer runs `npx learn-skill` in a repository.
2. CLI writes canonical wrapper files for selected platforms.
3. In OpenCode/Cursor/Claude Code, developer runs `/learn-skill zod-schema`.
4. Wrapper prompt instructs model to:
   - use Context7 docs,
   - generate `skills/<slug>/SKILL.md`,
   - include required sections and references,
   - continue with model context if Context7 is unavailable and clearly note that status.

## CLI Contract

- `npx learn-skill` -> scaffold/update all platforms.
- `--platform opencode|cursor|claude|all` -> target selection (default `all`).
- `--check` -> detect drift, no writes.
- `--dry-run` -> show planned actions, no writes.

Suggested exit codes:

- `0`: success/no drift
- `2`: drift found in `--check`
- `1`: invalid args or runtime error

## Internal Modules (Lean)

- `src/cli.ts`
  - parse args
  - orchestrate check/dry-run/write flows
  - render terminal summary
- `src/scaffold.ts`
  - compute target files by platform
  - build action plan (`create`, `update`, `noop`)
  - perform writes or checks
- `src/prompts.ts`
  - canonical command content for OpenCode, Cursor, and Claude Code wrappers
  - shared behavior constraints for `/learn-skill`
- `src/core/slugify-topic.ts`
  - normalize topic strings to slugs for output path guidance

## Wrapper Output Contract

Command input:

- `/learn-skill <topic>`

Required output artifacts:

- `.agents/skills/<topic-slug>/SKILL.md`

Optional output artifacts (for broad/complex topics):

- `.agents/skills/<topic-slug>/references/sources.md`
- `.agents/skills/<topic-slug>/references/existing-skills.md`

Required sections in generated skill:

- purpose
- when to use / when not to use
- step-by-step workflow
- examples (topic-inferred language or neutral pseudocode)
- pitfalls/debug checklist
- references

## Unit Testing Strategy (Only)

### Test file structure

- `src/cli/parse-args.test.ts`
- `src/scaffold/get-target-files.test.ts`
- `src/scaffold/plan-actions.test.ts`
- `src/prompts/opencode-prompt.test.ts`
- `src/prompts/cursor-prompt.test.ts`
- `src/core/slugify-topic.test.ts`
- `src/cli/render-summary.test.ts`

### What to assert

- arg parsing defaults and flag handling
- platform-to-path resolution
- planning logic (`create/update/noop`) including `--check`
- wrapper prompt invariants (Context7, TS focus, output path, warning behavior)
- slug normalization consistency
- deterministic summary rendering

## Evolution Path (Post-v1)

- Add optional config file for org-level defaults.
- Add template variants (strict, concise, teaching mode).
- Add integration tests only if behavior starts depending on filesystem edge cases.
