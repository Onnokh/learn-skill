# learn-skill

Scaffold `/learn-skill` command wrappers for OpenCode, Cursor, and Claude Code.

Generated files:

- `~/.config/opencode/commands/learn-skill.md`
- `~/.cursor/commands/learn-skill.md`
- `~/.claude/commands/learn-skill.md`

When running inside WSL, Cursor commands are also mirrored to the Windows home directory (`/mnt/c/Users/<you>/.cursor/commands/learn-skill.md`) so they appear in the desktop Cursor app.

## Usage

```bash
npx learn-skill
```

Optional flags:

```bash
npx learn-skill --platform opencode
npx learn-skill --platform cursor --dry-run
npx learn-skill --platform claude
npx learn-skill --platform all
npx learn-skill --check
```

After scaffolding, use `/learn-skill <topic>` inside OpenCode, Cursor, or Claude Code.
