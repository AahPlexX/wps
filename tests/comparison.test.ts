import assert from 'node:assert/strict'
import test from 'node:test'
import {
  MAX_COMPARISON_COUNTRIES,
  comparisonCountriesFromSearch,
  comparisonSearchFromCountries,
} from '../src/lib/comparison.ts'

const validCountries = ['Brazil', 'France', 'Japan', 'United Kingdom', 'United States']

test('comparison URL state keeps ordered unique valid countries and caps at four', () => {
  assert.equal(MAX_COMPARISON_COUNTRIES, 4)
  assert.deepEqual(
    comparisonCountriesFromSearch(
      '?country=Japan&country=bogus&country=France&country=Japan&country=united+states&country=Brazil&country=United+Kingdom',
      validCountries,
      'en-US',
    ),
    ['Japan', 'France', 'United States', 'Brazil'],
  )
})

test('comparison URL state round-trips repeated country parameters in selection order', () => {
  const countries = ['United States', 'Japan', 'France']
  const search = comparisonSearchFromCountries(countries)
  assert.equal(search, 'country=United+States&country=Japan&country=France')
  assert.deepEqual(comparisonCountriesFromSearch(`?${search}`, validCountries), countries)
})
