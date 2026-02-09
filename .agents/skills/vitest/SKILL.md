---
name: vitest
description: Guide Vitest setup, run, mocking, coverage, and debugging for JS/TS tests; trigger for Vitest work; do not trigger for non-Vitest frameworks or unrelated tooling.
---

## Purpose

Use this skill to execute one repeatable workflow: implement or update tests with Vitest, then run and debug them.

Trigger this skill when the user asks for Vitest-specific setup, test authoring, mocking, CLI usage, filtering, or coverage.

Do not trigger this skill for Jest-only requests, non-JavaScript test frameworks, or generic build tooling unrelated to tests.

## Workflow

1. Confirm the project uses Vitest (`vitest` dependency, `vitest.config.*`, or `test` scripts invoking Vitest).
2. Add or update tests in `*.test.*` or `*.spec.*` files with clear arrange/act/assert structure.
3. Use `describe`, `test`/`it`, and `expect` APIs; prefer deterministic tests and explicit fixtures.
4. Add mocks only where needed (`vi.fn`, `vi.spyOn`, `vi.mock`); reset or restore mock state between tests.
5. Run targeted tests first (`vitest <file>`, `vitest -t <pattern>`, or `<file>:<line>`), then run `vitest run`.
6. If requested, enable coverage and thresholds; report gaps and next actions.
7. Debug failures with focused reruns, environment checks (`node`, `jsdom`, or `happy-dom`), and snapshot review.
8. Follow security hygiene: never hardcode secrets in tests, fixtures, or config; treat external scripts/tools as untrusted until reviewed.

For deeper command and source notes, read `references/sources.md` and `references/existing-skills.md`.

## Examples

```ts
import { describe, expect, test } from 'vitest'
import { sum } from './sum'

describe('sum', () => {
  test('adds two numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
```

```ts
import { afterEach, expect, test, vi } from 'vitest'
import * as api from './api'

afterEach(() => {
  vi.restoreAllMocks()
})

test('calls fetchUsers once', async () => {
  vi.spyOn(api, 'fetchUsers').mockResolvedValue([{ id: 1 }])
  const users = await api.fetchUsers()
  expect(users).toHaveLength(1)
})
```

```bash
# run one file once
vitest run src/math/sum.test.ts

# run by name pattern
vitest -t "adds two numbers"

# run changed-related tests in pre-commit contexts
vitest related src/math/sum.ts --run

# run with coverage
vitest run --coverage
```

## Pitfalls

- Forgetting to reset or restore mocks causes cross-test state leakage.
- Using `vi.mock` after imports can fail because mock declarations are hoisted.
- Running watch mode in CI-like automation can hang; prefer `vitest run` or `--run`.
- Mixing DOM and Node assumptions without setting `test.environment` causes flaky behavior.
- Overusing snapshots without intent review can hide regressions.

## Debugging checklist

- Verify runtime compatibility (`Node >= 20`, `Vite >= 6`, matching Vitest version).
- Reproduce with a minimal file filter (`vitest run <file>` or `<file>:<line>`).
- Confirm environment (`node`, `jsdom`, `happy-dom`) matches code under test.
- Clear stale caches when behavior is inconsistent (`vitest --clearCache`).
- Check whether failures are order-dependent; disable parallelism or isolate files.
- For mock issues, inspect import timing and ensure reset/restore hooks run.

## References

- Agent Skills specification: https://agentskills.io/specification
- Vitest getting started: https://vitest.dev/guide/
- Vitest CLI: https://vitest.dev/guide/cli
- Vitest mocking: https://vitest.dev/guide/mocking
- Source notes and provenance: `references/sources.md`
- Installed-skill pattern notes: `references/existing-skills.md`

Validation checklist:
- Trigger quality is explicit (when to trigger and when not to trigger).
- Sections are complete and ordered: Purpose, Workflow, Examples, Pitfalls, Debugging checklist, References.
- Every referenced local file exists: `references/sources.md`, `references/existing-skills.md`.
