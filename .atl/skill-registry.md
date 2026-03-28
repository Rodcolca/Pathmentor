# Skill Registry — PathMentor
_Last updated: 2026-03-27_

## Skill Sources
- `~/.config/opencode/skills/` — canonical user-level catalog (used for the entries below).
- `~/.gemini/skills/`, `~/.copilot/skills/` — mirrored read-only copies of the same skills.
- Project directories `.claude/skills`, `.gemini/skills`, `.agent/skills`, and `skills/` — _not present yet_.

## Project Conventions
No `AGENTS.md`, `agents.md`, `CLAUDE.md`, `.cursorrules`, `GEMINI.md`, or `copilot-instructions.md` files exist in this repository, so there are no project-specific agent directives yet. `README.md` documents product goals, deployment targets (CubePath VPS + GitHub Pages), and how to run the static site locally but does not introduce additional automation rules.

## User Skills
| Skill | Trigger | Location |
| --- | --- | --- |
| `branch-pr` | "When creating a pull request, opening a PR, or preparing changes for review." | `~/.config/opencode/skills/branch-pr/SKILL.md` |
| `issue-creation` | "When creating a GitHub issue, reporting a bug, or requesting a feature." | `~/.config/opencode/skills/issue-creation/SKILL.md` |
| `skill-creator` | "When user asks to create a new skill, add agent instructions, or document patterns for AI." | `~/.config/opencode/skills/skill-creator/SKILL.md` |
| `go-testing` | "When writing Go tests, using teatest, or adding test coverage." | `~/.config/opencode/skills/go-testing/SKILL.md` |
| `judgment-day` | "When user says 'judgment day', 'judgment-day', 'review adversarial', 'dual review', 'doble review', 'juzgar', 'que lo juzguen'." | `~/.config/opencode/skills/judgment-day/SKILL.md` |

## Compact Rules

### branch-pr
- Run this skill whenever preparing or opening a PR; every PR MUST link an `status:approved` issue using "Closes #N" in the body.
- Create branches as `type/description` using the allowed prefixes (feat, fix, docs, chore, etc.) and keep names lowercase without spaces.
- Use the PR template fully: include PR type checkbox + label, summary bullets, changes table, and a test plan that confirms shellcheck + manual testing.
- Add exactly one `type:*` label per PR and ensure commits follow the conventional commit regex; matching types drive the enforcement bots.
- Automated checks require shellcheck passing and proper issue linkage—run shellcheck locally before pushing and never add Co-Authored-By trailers.

### issue-creation
- Use GitHub templates only (blank issues disabled); choose bug report vs feature request appropriately.
- Always complete the pre-flight checkboxes, required description fields, and dropdowns (OS, agent, affected area, etc.).
- Every issue auto-gets `status:needs-review`; maintainers must add `status:approved` before contributors may open PRs.
- Distinguish bugs (steps to reproduce, expected vs actual) from feature requests (problem, proposed solution, affected area, alternatives).
- Use Discussions for questions, close duplicates referencing originals, and apply priority labels when triaging.

### skill-creator
- Only create a skill when a reusable workflow or pattern needs to be documented—skip one-offs or trivial tips.
- Directory layout: `skills/{name}/SKILL.md` plus optional `assets/` for templates and `references/` for local doc pointers.
- Fill SKILL.md frontmatter completely (name, description with trigger, license, metadata author/version) and keep triggers explicit.
- Contents must highlight critical patterns first, keep examples minimal, include a Commands section, and note any templates/resources.
- After adding a skill, register it in `AGENTS.md` with a concise description so orchestrators can discover it quickly.

### go-testing
- Apply when adding Go tests, especially table-driven tests, Bubbletea TUIs, teatest integration, or golden file comparisons.
- Favor table-driven structures for coverage, use `tea.KeyMsg` simulations for Bubbletea state transitions, and keep tests isolated per screen/component.
- For TUI flows, run `teatest.NewTestModel` to drive interactions and assert final model state; use `testdata/*.golden` for deterministic view rendering.
- Organize tests alongside source files (`*_test.go`) with dedicated files for model/update/view/testdata; use `t.TempDir()` for filesystem isolation.
- Common commands: `go test ./...`, `go test -v ./internal/tui/...`, `go test -run <TestName>`, `go test -cover`, and `go test -update` for refreshing golden files.

### judgment-day
- Trigger only when user explicitly asks for "judgment day" or similar phrases; orchestrator launches two blind review delegates in parallel.
- Always resolve skills first (Skill Resolver protocol) to inject `## Project Standards (auto-resolved)` before launching judges or fix agents.
- Judges work independently, return structured findings with severity + file + suggested fix, and must report skill resolution status.
- Confirmed findings (both judges agree) must be fixed by a separate fix agent; re-run both judges after fixes, up to two fix iterations.
- If issues remain after two fix cycles, escalate with a full history; never conduct the review yourself or skip the dual-judge protocol.
