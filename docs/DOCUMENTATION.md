> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Documentation standard

## Status values

Use only `planned`, `in_progress`, `blocked`, `verified`, `awaiting_human`, `prohibited`, or `deferred` in requirement and task status fields.

## Work-unit records

- `docs/PRD.md` owns stable requirement IDs and acceptance tests.
- `docs/TRACKER.md` owns requirement status and fresh verification evidence.
- `docs/TASKS.md` owns actionable work and the next executable step.
- `docs/DECISIONS.md` owns current architectural and product decisions, newest first.
- `docs/SOURCES.md` owns external research provenance used to make implementation or data decisions.

`README.md` is an entry point, not a specification.

## Completion

A requirement reaches `verified` only after fresh evidence satisfies its acceptance test. Evidence names the command, file, workflow, or deployed behavior that proves the result. Hardware- or person-dependent criteria use `awaiting_human` until tested.
