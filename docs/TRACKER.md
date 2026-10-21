> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Requirement tracker

## Resume here

Current state: the standalone directory and globe have been converted locally into the requested React/Vite/Tailwind/TypeScript architecture with shared JSON data; remote integration and fresh CI/browser validation are next.  
Next action: integrate the scaffold on `main`, let CI create the lockfile and run validation, then reconcile this tracker with workflow/deployment evidence.  
Blockers: GitHub Pages repository enablement may require the Pages setting to be switched to GitHub Actions if it is not already enabled.

| ID | Status | Evidence / next evidence |
| --- | --- | --- |
| WPS-001 | in_progress | Local `scripts/validate-data.mjs`; run through repository validation after install. |
| WPS-002 | in_progress | `src/pages/HomePage.tsx`; browser QA pending. |
| WPS-003 | in_progress | `src/lib/countries.ts` + HomePage popstate handling; tests pending. |
| WPS-004 | in_progress | `groupCountries`; focused Node test pending. |
| WPS-005 | in_progress | `src/styles.css` phone table reflow; 390px QA pending. |
| WPS-006 | in_progress | `src/components/GlobeCanvas.tsx`; browser interaction QA pending. |
| WPS-007 | in_progress | Map state and `CountryDetail`; browser/deep-link QA pending. |
| WPS-008 | in_progress | Local map JSON contains 195 targets; repository validation pending. |
| WPS-009 | in_progress | Search + semantic detail are implemented; accessibility QA pending. |
| WPS-010 | in_progress | Markup/CSS implemented; browser accessibility QA pending. |
| WPS-011 | in_progress | No public external links authored; production audit pending. |
| WPS-012 | in_progress | Local JSON + Canvas 2D implementation; production bundle audit pending. |
| WPS-013 | in_progress | Exact package versions authored; lockfile and production build pending. |
| WPS-014 | in_progress | Workflow authored; live Pages verification pending. |
| WPS-015 | in_progress | Governing records created; final same-commit reconciliation pending. |
| WPS-016 | in_progress | `DESIGN.md` extracted from standalone visual system; screenshot QA pending. |
