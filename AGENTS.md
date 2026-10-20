# WPS repository instructions

This file is the repository instruction entry point. Keep agent instructions here; keep product facts, requirements, status, design tokens, and decisions in their linked source-of-truth documents.

## Authority

- Repository: `AahPlexX/wps`.
- `origin/main` is the only long-lived authoritative branch.
- Do not open pull requests. Integrate directly through the documented main-branch workflow.
- Preserve unrelated changes. Never force-push or rewrite shared history.

## Read before changing code

1. `README.md` for project entry points and commands.
2. `docs/PRD.md` for requirement IDs and acceptance tests.
3. `docs/TRACKER.md` and `docs/TASKS.md` for current state and “Resume here”.
4. `docs/DECISIONS.md` for active architectural decisions.
5. `DESIGN.md` for normative visual tokens and UI rules.

## Working rules

- Convert each requested behavior into a stable requirement ID before implementation. Never renumber or reuse an ID.
- Prefer existing code, then platform features, then installed dependencies, then the minimum custom code that fully satisfies the requirement.
- Keep political data in the shared JSON source; do not duplicate country records between pages.
- The public client must not expose external source links or citations. Development sources belong in `docs/SOURCES.md`.
- Keep accessibility, data integrity, and keyboard/pointer parity intact when simplifying.
- Keep UI state that affects the visible result deep-linkable in the URL.
- Run the validation commands declared in `package.json`; do not substitute remembered commands.
- Update tracker, tasks, decisions, and affected docs in the same coherent change as implementation. Never mark work verified without fresh validation evidence.
- No secrets, placeholders, speculative scaffolding, or dead extension points.

## Documentation header

Every file under `docs/` that is a spec, tracker, task record, decision record, or standard begins with this exact block:

> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`
