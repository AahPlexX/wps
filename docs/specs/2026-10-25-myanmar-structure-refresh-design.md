> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Myanmar Post-2026 Structure Refresh Design

## Intent

Correct one evidence-backed political-data drift discovered during the 2026-10-25 freshness audit. The public reference currently places Myanmar's Commander-in-Chief above President/Prime Minister offices, but current evidence shows a post-election military-backed presidency with Min Aung Hlaing no longer serving as Commander-in-Chief.

## Goals

- Make Myanmar's assignment, group, system, hierarchy, and note reflect the current operative structure.
- Preserve the site's institutional—not incumbent-name—data model.
- Keep category totals and validation synchronized.
- Ship the significant public-data correction as 1.0.7.

## Non-goals

- No broad 195-country rewrite; the dataset was reviewed five days ago and no second structural drift has been evidenced in the high-risk records checked.
- No runtime political-data API, scraping pipeline, leader-name fields, public citations, schema change, UI redesign, or new dependency.

## Evidence

CIA World Leaders' current Burma roster (updated 2026-10-13) lists a President and two Vice Presidents, does not list a Prime Minister, and states that the regime is not formally recognized by the U.S. Government. The UN Special Envoy reports that the military legislature elected Min Aung Hlaing as political leader after the 2026 polls, that he relinquished the Commander-in-Chief role, and that military power remains entrenched. Reuters independently reports his election as President and a successor as armed-forces commander.

## Approaches considered

1. **Targeted record correction — selected.** Correct Myanmar and the resulting category totals, then validate/deploy. This directly resolves proven drift with minimal blast radius.
2. **Re-review all 195 records now — rejected.** A five-day-old dataset plus targeted high-risk review does not justify a time-heavy blanket rewrite without evidence of broader structural drift.
3. **Add a runtime leadership/freshness service — rejected.** It conflicts with the local-data/no-external-runtime contract and would introduce operational complexity for a problem solved by a single source-controlled correction.

## Selected record semantics

- `group`: `President / co-president`
- `assignment`: `President`
- `system`: `Military-backed presidential government`
- `hierarchy`: `President → Vice Presidents / Cabinet → Union Parliament (including constitutionally reserved military seats) → Supreme Court`
- `note`: explain that the 2026 military-organized election produced the current presidency; the UN does not view this as a civilian transition, military influence remains entrenched, and the U.S. Government does not formally recognize the regime.

## Verification

A focused data test pins the post-2026 structure, `npm run validate` proves the 195-record/map invariants and updated category totals, the exact Pages workflow must build/deploy, and live directory/map smoke checks must show Myanmar in the President group with the corrected hierarchy.
