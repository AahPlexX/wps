import { useEffect, useMemo, useRef, useState } from 'react'
import { countries } from '../data'
import meta from '../data/meta.json'
import { CountryTable } from '../components/CountryTable'
import { SiteHeader } from '../components/SiteHeader'
import {
  GROUP_ORDER,
  directoryFiltersFromSearch,
  directorySearchFromFilters,
  filterCountries,
  groupCountries,
  type DirectoryFilters,
  type PoliticalGroup,
} from '../lib/countries'

const numberFormat = new Intl.NumberFormat(navigator.language || 'en-US')
const collator = new Intl.Collator(navigator.language || 'en-US', { sensitivity: 'base' })

function replaceDirectoryUrl(filters: DirectoryFilters) {
  const search = directorySearchFromFilters(filters)
  history.replaceState(null, '', `${location.pathname}${search ? `?${search}` : ''}${location.hash}`)
}

export function HomePage() {
  const [filters, setFilters] = useState(() => directoryFiltersFromSearch(location.search))
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onPopState = () => setFilters(directoryFiltersFromSearch(location.search))
    addEventListener('popstate', onPopState)
    return () => removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => replaceDirectoryUrl(filters), [filters])

  const structures = useMemo(
    () => [...new Set(countries.map((country) => country.system))].sort(collator.compare),
    [],
  )
  const counts = useMemo(
    () => new Map(GROUP_ORDER.map((group) => [group, countries.filter((c) => c.group === group).length])),
    [],
  )
  const filtered = useMemo(() => filterCountries(countries, filters, navigator.language), [filters])
  const groups = useMemo(() => groupCountries(filtered, filters.groupBy, collator), [filtered, filters.groupBy])

  const update = (patch: Partial<DirectoryFilters>) => setFilters((current) => ({ ...current, ...patch }))

  return (
    <>
      <a className="skip-link" href="#directory-main">
        Skip to directory
      </a>
      <SiteHeader active="directory" />
      <header className="hero site-shell">
        <div className="hero-grid">
          <h1>World Political Structures</h1>
          <div className="hero-copy">
            <p>
              Compare the top state office, form of government, and political hierarchy of all{' '}
              <strong>{numberFormat.format(meta.countryCount)} sovereign states</strong> in this reference.
            </p>
            <p>
              A monarch is not automatically a dictator. This directory classifies constitutional and
              institutional structures rather than assigning subjective labels where no standardized office exists.
            </p>
            <p className="date-line">Current reference date: October 20, 2026.</p>
          </div>
        </div>
      </header>

      <nav className="site-shell category-index" aria-label="Filter by top political assignment">
        {GROUP_ORDER.map((group) => {
          const active = filters.category === group
          return (
            <button
              key={group}
              type="button"
              className="category-button"
              aria-pressed={active}
              onClick={() => {
                update({ category: active ? '' : group })
                document.querySelector('#directory-controls')?.scrollIntoView({
                  behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                  block: 'start',
                })
              }}
            >
              <span className="category-name">{group}</span>
              <span className="category-count">{numberFormat.format(counts.get(group) ?? 0)} states</span>
            </button>
          )
        })}
      </nav>

      <main id="directory-main" className="pb-16">
        <section className="site-shell context-grid" aria-labelledby="how-to-read">
          <div>
            <h2 id="how-to-read">How to read the directory</h2>
            <p>
              “Top state office” identifies the formal head-of-state assignment. The hierarchy column summarizes
              the principal national institutions from the top political office downward.
            </p>
          </div>
          <div>
            <h2>Special structures stay explicit</h2>
            <p>
              Collective presidencies, councils, party-led systems, theocratic structures, and transitional
              governments are named rather than forced into a president-versus-monarch binary.
            </p>
          </div>
        </section>

        <section id="directory-controls" className="directory-controls" aria-label="Directory filters">
          <div className="site-shell controls-grid">
            <label className="field search-field">
              <span>Search countries and structures</span>
              <input
                ref={searchRef}
                name="q"
                type="search"
                inputMode="search"
                autoComplete="off"
                spellCheck={false}
                value={filters.query}
                placeholder="Try monarchy, prime minister, Nicaragua…"
                onChange={(event) => update({ query: event.target.value })}
              />
            </label>
            <label className="field">
              <span>Top assignment</span>
              <select
                name="category"
                value={filters.category}
                onChange={(event) => update({ category: event.target.value })}
              >
                <option value="">All assignments</option>
                {GROUP_ORDER.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Government structure</span>
              <select
                name="structure"
                value={filters.structure}
                onChange={(event) => update({ structure: event.target.value })}
              >
                <option value="">All structures</option>
                {structures.map((structure) => (
                  <option key={structure}>{structure}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Group directory by</span>
              <select
                name="group"
                value={filters.groupBy}
                onChange={(event) => update({ groupBy: event.target.value === 'system' ? 'system' : 'group' })}
              >
                <option value="group">Top assignment</option>
                <option value="system">Government structure</option>
              </select>
            </label>
            <button
              className="clear-button"
              type="button"
              onClick={() => {
                setFilters({ query: '', category: '', structure: '', groupBy: 'group' })
                searchRef.current?.focus()
              }}
            >
              Clear filters
            </button>
          </div>
          <div className="site-shell result-line" aria-live="polite">
            <span>
              <strong>{numberFormat.format(filtered.length)}</strong> {filtered.length === 1 ? 'country' : 'countries'} shown
            </span>
            <a href={`${import.meta.env.BASE_URL}map/`}>Open 3D map</a>
          </div>
        </section>

        <div className="site-shell directory-sections">
          {groups.map((group) => (
            <section key={group.label} className="directory-group">
              <div className="group-heading">
                <h2>{group.label}</h2>
                <span>{numberFormat.format(group.countries.length)} {group.countries.length === 1 ? 'state' : 'states'}</span>
              </div>
              <CountryTable countries={group.countries} />
            </section>
          ))}

          {filtered.length === 0 ? (
            <section className="empty-state" aria-live="polite">
              <h2>No countries match these filters</h2>
              <p>Clear one or more filters, or search for a different country, office, or structure.</p>
            </section>
          ) : null}

          <section className="method-grid" aria-labelledby="method-title">
            <h2 id="method-title">Classification method</h2>
            <div>
              <p>
                The dataset covers the 193 UN member states plus the Holy See and the State of Palestine. Categories
                describe the formal top political assignment, while the government-structure field captures the wider
                constitutional arrangement.
              </p>
              <p>
                Conflict-affected and transitional systems are described using their current governing institutions
                instead of being normalized into a stable constitutional model that may not presently operate.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
