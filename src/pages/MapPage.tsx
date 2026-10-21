import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { countries, mapFeatures as features } from '../data'
import { CountryDetail } from '../components/CountryDetail'
import { GlobeCanvas } from '../components/GlobeCanvas'
import { SiteHeader } from '../components/SiteHeader'
import {
  GROUP_COLORS,
  GROUP_LABELS,
  GROUP_ORDER,
} from '../lib/countries'

const collator = new Intl.Collator(navigator.language || 'en-US', { sensitivity: 'base' })
const sortedCountries = [...countries].sort((a, b) => collator.compare(a.country, b.country))
const countryByName = new Map(countries.map((country) => [country.country, country]))

function countryFromUrl() {
  const requested = new URLSearchParams(location.search).get('country')
  if (!requested) return 'United States'
  const exact = countries.find((country) => collator.compare(country.country, requested) === 0)
  return exact?.country ?? 'United States'
}

export function MapPage() {
  const [selectedCountry, setSelectedCountry] = useState(countryFromUrl)
  const [query, setQuery] = useState(selectedCountry)
  const inputRef = useRef<HTMLInputElement>(null)
  const [resetVersion, setResetVersion] = useState(0)
  const selected = countryByName.get(selectedCountry) ?? countries[0]

  const counts = useMemo(
    () => new Map(GROUP_ORDER.map((group) => [group, countries.filter((country) => country.group === group).length])),
    [],
  )

  const selectCountry = useCallback((country: string) => {
    if (!countryByName.has(country)) return
    setSelectedCountry(country)
    setQuery(country)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    params.set('country', selectedCountry)
    history.replaceState(null, '', `${location.pathname}?${params.toString()}`)
    document.title = `${selectedCountry} — Political World Map`
  }, [selectedCountry])

  useEffect(() => {
    const onPopState = () => selectCountry(countryFromUrl())
    addEventListener('popstate', onPopState)
    return () => removeEventListener('popstate', onPopState)
  }, [selectCountry])

  function findCountry() {
    const exact = countries.find((country) => collator.compare(country.country, query.trim()) === 0)
    if (exact) {
      selectCountry(exact.country)
      inputRef.current?.setCustomValidity('')
      return
    }
    inputRef.current?.setCustomValidity('Choose a country from the list.')
    inputRef.current?.reportValidity()
    inputRef.current?.setCustomValidity('')
    inputRef.current?.focus()
  }

  return (
    <>
      <a className="skip-link" href="#map-main">
        Skip to map
      </a>
      <SiteHeader active="map" />
      <main id="map-main" className="site-shell map-main">
        <div className="map-title-row">
          <div>
            <h1>Political world map</h1>
            <p>Select a country on the globe to inspect its top political assignment and national hierarchy.</p>
          </div>
          <a className="directory-link" href={import.meta.env.BASE_URL}>
            View directory
          </a>
        </div>

        <div className="map-layout">
          <section className="min-w-0" aria-label="Interactive globe">
            <div className="map-controls">
              <label className="field min-w-0">
                <span>Find a country</span>
                <input
                  ref={inputRef}
                  type="search"
                  name="country"
                  list="country-list"
                  autoComplete="off"
                  spellCheck={false}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault()
                      findCountry()
                    }
                  }}
                />
                <datalist id="country-list">
                  {sortedCountries.map((country) => (
                    <option key={country.country} value={country.country} />
                  ))}
                </datalist>
              </label>
              <button type="button" onClick={findCountry}>
                Show country
              </button>
              <button
                type="button"
                onClick={() => {
                  setResetVersion((version) => version + 1)
                }}
              >
                Reset
              </button>
            </div>

            <ul className="map-legend" aria-label="Political assignment legend">
              {GROUP_ORDER.map((group) => (
                <li key={group}>
                  <span
                    className="legend-swatch"
                    style={{ backgroundColor: GROUP_COLORS[group] }}
                    aria-hidden="true"
                  />
                  <span>
                    {GROUP_LABELS[group]} ({counts.get(group)})
                  </span>
                </li>
              ))}
            </ul>

            <GlobeCanvas
              countries={countries}
              features={features}
              selectedCountry={selectedCountry}
              onSelect={selectCountry}
              resetVersion={resetVersion}
            />
          </section>

          <aside className="map-detail-column" aria-live="polite">
            <CountryDetail country={selected} />
            <p className="map-scale-note">
              The globe uses simplified 1:110m world geometry. Twenty-nine sovereign microstates and small-island
              states that do not have a polygon at that scale remain selectable through geographic point targets.
            </p>
          </aside>
        </div>
      </main>
    </>
  )
}
