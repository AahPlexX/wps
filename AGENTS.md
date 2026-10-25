# WPS repository instructions

This file is the repository instruction entry point. Keep agent instructions here; keep product facts, requirements, status, design tokens, responsive rules, and decisions in their linked source-of-truth documents.

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
6. `docs/RESPONSIVE_UI.md` before creating or changing any client-facing UI.

## Working rules

- Convert each requested behavior into a stable requirement ID before implementation. Never renumber or reuse an ID.
- Prefer existing code, then platform features, then installed dependencies, then the minimum custom code that fully satisfies the requirement.
- Keep political data in the shared JSON source; do not duplicate country records between pages.
- The public client must not expose external source links or citations. Development sources belong in `docs/SOURCES.md`.
- Keep accessibility, data integrity, and keyboard/pointer parity intact when simplifying.
- Every client-facing page, component, screen, or window created or changed must satisfy `docs/RESPONSIVE_UI.md`. Base layout on available space rather than device identity, preserve information and function at supported sizes/text scales, and do not add device sniffing, a second breakpoint system, global overflow suppression, or unrelated responsive rewrites.
- Inspect the current UI stack, styling convention, breakpoints, tokens, target browsers, and validation setup before responsive edits. Keep breakpoints at demonstrated content-failure points and in the existing CSS convention.
- Keep UI state that affects the visible result deep-linkable in the URL.
- Treat feature additions and other meaningful user-visible behavior changes as significant releases unless the owner explicitly says otherwise. Before deploying each significant release, increment the `package.json` patch version by exactly one (`+0.0.1`) and keep `package-lock.json` synchronized. Versioning starts from baseline `1.0.0` on 2026-10-21.
- Run the validation commands declared in `package.json`; do not substitute remembered commands. For client-facing UI changes, also run the relevant live responsive matrix from `docs/RESPONSIVE_UI.md` and record what was and was not verified.
- Update tracker, tasks, decisions, responsive/design standards, and affected docs in the same coherent change as implementation. Never mark work verified without fresh validation evidence.
- No secrets, placeholders, speculative scaffolding, or dead extension points.

## Documentation header

Every file under `docs/` that is a spec, tracker, task record, decision record, or standard begins with this exact block:

> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`
