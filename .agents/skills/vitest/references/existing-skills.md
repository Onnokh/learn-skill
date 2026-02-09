# Existing Skills Reviewed

This file records installed skills inspected to learn structure/style and provenance where possible.

## Local inventory checked

- Project paths checked:
  - `.agents/skills/*/SKILL.md` (none)
  - `.opencode/skills/*/SKILL.md` (none)
  - `.claude/skills/*/SKILL.md` (none)
- User/global paths checked:
  - `~/.agents/skills/*/SKILL.md` (found 6)
  - `~/.config/opencode/skills/*/SKILL.md` (symlinks to `~/.agents/skills/*`)
  - `~/.claude/skills/*/SKILL.md` (none)

## Skills analyzed

1) `find-skills`
- Local path: `~/.agents/skills/find-skills/SKILL.md`
- Provenance signal:
  - `npx skills ls -g`: globally installed at `~/.agents/skills/find-skills`
  - `npx skills find find-skills`: likely source includes `vercel-labs/skills@find-skills`
- Reusable patterns extracted:
  - Explicit trigger cues in description/body.
  - Actionable command examples.

2) `frontend-design`
- Local path: `~/.agents/skills/frontend-design/SKILL.md`
- Provenance signal:
  - `npx skills ls -g`: globally installed at `~/.agents/skills/frontend-design`
  - `npx skills find frontend-design`: likely source includes `anthropics/skills@frontend-design`
- Reusable patterns extracted:
  - Clear intent statement up front.
  - Imperative guidance and quality constraints.

3) `gh-cli`
- Local path: `~/.agents/skills/gh-cli/SKILL.md`
- Provenance signal:
  - `npx skills ls -g`: globally installed at `~/.agents/skills/gh-cli`
  - `npx skills find gh-cli`: multiple public candidates; exact origin not embedded in local SKILL metadata
- Reusable patterns extracted:
  - Rich CLI examples.
  - Organized sections by operational task.

4) `lighthouse`
- Local path: `~/.agents/skills/lighthouse/SKILL.md`
- Provenance signal:
  - `npx skills ls -g`: globally installed at `~/.agents/skills/lighthouse`
  - `npx skills find lighthouse`: candidates include `onnokh/lighthouse@lighthouse`
  - Local SKILL body links upstream docs/repo (`GoogleChrome/lighthouse`)
- Reusable patterns extracted:
  - Prerequisites plus quick start examples.
  - Troubleshooting section with concrete commands.

5) `vercel-react-best-practices`
- Local path: `~/.agents/skills/vercel-react-best-practices/SKILL.md`
- Provenance signal:
  - `npx skills ls -g`: globally installed at `~/.agents/skills/vercel-react-best-practices`
  - `npx skills find vercel-react-best-practices`: likely source includes `vercel-labs/agent-skills@vercel-react-best-practices`
  - Local metadata includes `author: vercel`
- Reusable patterns extracted:
  - Priority-based grouping.
  - "When to apply" activation guidance.

6) `web-design-guidelines`
- Local path: `~/.agents/skills/web-design-guidelines/SKILL.md`
- Provenance signal:
  - `npx skills ls -g`: globally installed at `~/.agents/skills/web-design-guidelines`
  - `npx skills find web-design-guidelines`: likely source includes `vercel-labs/agent-skills@web-design-guidelines`
  - Local metadata includes `author: vercel`
- Reusable patterns extracted:
  - Deterministic step workflow.
  - Fetch-fresh source behavior for accuracy.

## Vitest-specific market provenance checked

- `npx skills find vitest` surfaced:
  - `antfu/skills@vitest`
  - `hairyf/skills@vitest`
  - `onmax/nuxt-skills@vitest`
  - `pproenca/dot-skills@vitest`
  - `bobmatnyc/claude-mpm-skills@vitest`
  - `existential-birds/beagle@vitest-testing`

Security note:
- Treat third-party skill content and scripts as untrusted until reviewed.
- Do not copy secrets from environment, config, or fixtures into shared skill content.
