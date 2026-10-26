> Repository: `AahPlexX/wps`  
> Authority: `origin/main`  
> Documentation schema: `wps-v1`

# Country Comparison Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a dedicated, accessible, URL-backed `/wps/compare/` page for comparing up to four countries from the shared WPS dataset.

**Architecture:** Add one pure comparison URL-state helper, one React page, and one static HTML entry point. Reuse existing country typeahead/detail components and History API; extend the existing path switch and shared navigation without adding a router or dependency.

**Tech Stack:** Vite 8.3.4, TypeScript 7.0.2, React 19.3.0, Tailwind CSS 4.3.3, conventional `src/styles.css`, Node built-in tests.

**Spec:** `docs/specs/2026-10-26-country-comparison-design.md`

## Global Constraints

- Work only on `origin/main`; do not open a pull request.
- Use only the shared local political dataset; no public citation UI or external runtime data.
- Keep client-visible state deep-linkable where it affects rendered results.
- Follow `docs/RESPONSIVE_UI.md` and the existing 1080/820/640 breakpoint system; add no responsive dependency or device sniffing.
- No new package dependency or client router.
- Significant release is exactly 1.0.9, with package and lockfile synchronized.
- Keep PRD, tracker, tasks, decisions/ADR, design, README/product context, and plan evidence current in the same work unit.

## Review Focus

- Malformed, duplicate, over-limit, and differently-cased `country=` URL values restore a stable ordered set without hidden state.
- A one-country deep link remains valid and becomes comparable after adding a second country.
- Adding/removing countries creates meaningful history entries; Back/Forward restores visible comparison without new writes.
- The third primary-nav link and compare controls remain contained at 320px and 200% text, including long country/political strings and RTL direction.
- Existing directory/map navigation, typeahead behavior, update prompt, and shared country detail semantics do not regress.

---

### Task 1: Prove comparison URL-state behavior red

**Files:**
- Create: `tests/comparison.test.ts`
- Create: `src/lib/comparison.ts` only after red is observed

**Interfaces:**
- Produces: `MAX_COMPARISON_COUNTRIES`, `comparisonCountriesFromSearch(search, validCountryNames, locale?)`, `comparisonSearchFromCountries(countries)`.

- [ ] Add focused tests for ordered valid selection, duplicate/unknown removal, four-country cap, case-insensitive canonical matching, and repeated-parameter round trip.
- [ ] Run the repository workflow/`npm test` and record the intended red caused by the missing comparison helper.
- [ ] Implement only the pure helper needed for those tests.
- [ ] Require all tests to pass before page code.

### Task 2: Build the comparison route and interaction

**Files:**
- Create: `compare/index.html`
- Create: `src/pages/ComparePage.tsx`
- Modify: `vite.config.ts`
- Modify: `src/App.tsx`
- Modify: `src/components/SiteHeader.tsx`
- Modify: `src/components/CountryDetail.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: comparison URL helper, shared `countries`, `CountryTypeahead`, `CountryDetail`, `SiteHeader`.
- Produces: `/wps/compare/` with repeated `country=` state and History API restoration.

- [ ] Add the third Vite HTML entry and path dispatch without a router.
- [ ] Extend `SiteHeader` with a `Compare` destination and narrow-layout wrapping inside the existing 640px rule.
- [ ] Add the compare page with one add-country typeahead, selected-country Remove/Clear controls, 0–1 selection guidance, 2–4 responsive detail panels, four-country cap, and polite selection status.
- [ ] Parameterize `CountryDetail` heading IDs so multiple instances remain valid while the map keeps its current default ID.
- [ ] Add only the compare/header CSS required by the design, using existing tokens and fluid/grid primitives.
- [ ] Implement push-state add/remove/clear and popstate restore; do not URL-sync transient typing.

### Task 3: Release, documentation, and full verification

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `README.md`
- Modify: `PRODUCT.md`
- Modify: `docs/TRACKER.md`
- Modify: `docs/TASKS.md`
- Modify: `docs/plans/2026-10-26-country-comparison.md`
- Reconcile affected design/decision records if implementation changes a documented choice.

- [ ] Increment package and lockfile from 1.0.8 to exactly 1.0.9 once.
- [ ] Run `npm run validate` and require data validation, the complete Node test suite, TypeScript, and Vite production build to pass.
- [ ] Require Pages deployment success and live `/wps/compare/` plus `/wps/version.json` at 1.0.9.
- [ ] Live-test malformed/one-country/two-to-four-country URLs, keyboard and pointer add/remove, Back/Forward, maximum-state handling, and existing directory/map navigation.
- [ ] Run affected responsive QA at 320px, 320px + 200% text, 390px, the existing 640/820/1080 content boundaries as relevant, wide desktop, RTL/long-content stress, and shared header containment on all routes; record any physical-device conditions not exercised.
- [ ] Mark WPS-026/WPS-T016 verified only after the evidence above is fresh, and leave a precise “Resume here” state.
