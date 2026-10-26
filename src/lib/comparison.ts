export const MAX_COMPARISON_COUNTRIES = 4

export function comparisonCountriesFromSearch(
  search: string,
  validCountryNames: readonly string[],
  locale = 'en-US',
) {
  const collator = new Intl.Collator(locale, { sensitivity: 'base' })
  const selected: string[] = []

  for (const requested of new URLSearchParams(search).getAll('country')) {
    const country = validCountryNames.find((candidate) => collator.compare(candidate, requested) === 0)
    if (!country || selected.includes(country)) continue
    selected.push(country)
    if (selected.length === MAX_COMPARISON_COUNTRIES) break
  }

  return selected
}

export function comparisonSearchFromCountries(countries: readonly string[]) {
  const params = new URLSearchParams()
  for (const country of countries.slice(0, MAX_COMPARISON_COUNTRIES)) {
    params.append('country', country)
  }
  return params.toString()
}
