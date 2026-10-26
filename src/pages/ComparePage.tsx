import { useEffect, useMemo, useRef, useState } from 'react'
import { CountryDetail } from '../components/CountryDetail'
import { CountryTypeahead } from '../components/CountryTypeahead'
import { SiteHeader } from '../components/SiteHeader'
import { countries } from '../data'
import {
  MAX_COMPARISON_COUNTRIES,
  comparisonCountriesFromSearch,
  comparisonSearchFromCountries,
} from '../lib/comparison'
import type { CountryRecord } from '../lib/countries'

const BASE = import.meta.env.BASE_URL
const locale = navigator.language || 'en-US'
const collator = new Intl.Collator(locale, { sensitivity: 'base' })
const sortedCountries = [...countries].sort((a, b) => collator.compare(a.country, b.country))
const sortedCountryNames = sortedCountries.map((country) => country.country)
const countryByName = new Map(countries.map((country) => [country.country, country]))

function countriesFromUrl() {
  return comparisonCountriesFromSearch(location.search, sortedCountryNames, locale)
}

function writeComparisonUrl(selectedCountries: readonly string[]) {
  const search = comparisonSearchFromCountries(selectedCountries)
  const url = `${location.pathname}${search ? `?${search}` : ''}${location.hash}`
  history.pushState(null, '', url)
}

export function ComparePage() {
  const [selectedCountries, setSelectedCountries] = useState(countriesFromUrl)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const availableCountryNames = useMemo(
    () => sortedCountryNames.filter((country) => !selectedCountries.includes(country)),
    [selectedCountries],
  )
  const selectedRecords = selectedCountries
    .map((country) => countryByName.get(country))
    .filter((country): country is CountryRecord => Boolean(country))

  useEffect(() => {
    const onPopState = () => {
      setSelectedCountries(countriesFromUrl())
      setQuery('')
    }
    addEventListener('popstate', onPopState)
    return () => removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    document.title = selectedCountries.length >= 2
      ? `${selectedCountries.join(' · ')} — Compare Political Structures`
      : 'Compare Political Structures'
  }, [selectedCountries])

  function commitSelection(next: string[]) {
    setSelectedCountries(next)
    writeComparisonUrl(next)
  }

  function addCountry(country: string) {
    if (selectedCountries.length >= MAX_COMPARISON_COUNTRIES || selectedCountries.includes(country)) return
    commitSelection([...selectedCountries, country])
    setQuery('')
    inputRef.current?.setCustomValidity('')
  }

  function removeCountry(country: string) {
    commitSelection(selectedCountries.filter((selected) => selected !== country))
  }

  function clearComparison() {
    if (!selectedCountries.length) return
    commitSelection([])
    setQuery('')
  }

  function findCountry() {
    const requested = query.trim()
    const exact = sortedCountries.find((country) => collator.compare(country.country, requested) === 0)
    const input = inputRef.current

    if (!exact) {
      input?.setCustomValidity('Choose a country from the matching suggestions.')
      input?.reportValidity()
      input?.setCustomValidity('')
      input?.focus()
      return
    }
    if (selectedCountries.includes(exact.country)) {
      input?.setCustomValidity(`${exact.country} is already in this comparison.`)
      input?.reportValidity()
      input?.setCustomValidity('')
      input?.focus()
      return
    }
    if (selectedCountries.length >= MAX_COMPARISON_COUNTRIES) {
      input?.setCustomValidity('Remove a country before adding another.')
      input?.reportValidity()
      input?.setCustomValidity('')
      input?.focus()
      return
    }

    addCountry(exact.country)
  }

  const count = selectedCountries.length
  const remaining = Math.max(0, 2 - count)

  return (
    <>
      <a className="skip-link" href="#compare-main">
        Skip to comparison
      </a>
      <SiteHeader active="compare" />
      <main id="compare-main" className="site-shell compare-main">
        <div className="compare-title-row">
          <div>
            <h1>Compare political structures</h1>
            <p>
              Select two to four countries to inspect the same top political assignment, government structure,
              category, and national hierarchy side by side.
            </p>
          </div>
          <a className="directory-link" href={BASE}>
            Browse directory
          </a>
        </div>

        <section className="compare-builder" aria-labelledby="compare-builder-title">
          <div className="compare-builder-copy">
            <h2 id="compare-builder-title">Build a comparison</h2>
            <p>Country order is preserved in the link and in the comparison below.</p>
          </div>

          {count < MAX_COMPARISON_COUNTRIES ? (
            <div className="compare-add-row">
              <CountryTypeahead
                countryNames={availableCountryNames}
                value={query}
                onValueChange={setQuery}
                onSelect={addCountry}
                onSubmit={findCountry}
                inputRef={inputRef}
              />
              <button className="compare-add-button" type="button" onClick={findCountry}>
                Add country
              </button>
            </div>
          ) : (
            <p className="compare-limit" role="status">
              Four-country maximum reached. Remove a country to add another.
            </p>
          )}

          <div className="compare-selection-header">
            <p className="compare-selection-status" aria-live="polite">
              <strong>{count}</strong> of {MAX_COMPARISON_COUNTRIES} countries selected
            </p>
            {count ? (
              <button className="clear-button" type="button" onClick={clearComparison}>
                Clear comparison
              </button>
            ) : null}
          </div>

          {count ? (
            <ul className="compare-selection-list" aria-label="Countries selected for comparison">
              {selectedCountries.map((country) => (
                <li key={country}>
                  <span>{country}</span>
                  <button
                    type="button"
                    className="compare-remove"
                    aria-label={`Remove ${country} from comparison`}
                    onClick={() => removeCountry(country)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        {count >= 2 ? (
          <section className="compare-results" aria-labelledby="comparison-results-title">
            <div className="compare-results-heading">
              <h2 id="comparison-results-title">Side-by-side comparison</h2>
              <span>{count} countries</span>
            </div>
            <div className="compare-grid">
              {selectedRecords.map((country, index) => (
                <CountryDetail
                  key={country.country}
                  country={country}
                  headingId={`comparison-country-${index + 1}`}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className="empty-state compare-empty" aria-live="polite">
            <h2>{count === 1 ? 'Add one more country' : 'Choose countries to compare'}</h2>
            <p>
              {remaining === 1
                ? 'Your first country is ready. Add one more to begin the side-by-side comparison.'
                : 'Add at least two countries. You can compare as many as four at once.'}
            </p>
          </section>
        )}
      </main>
    </>
  )
}
