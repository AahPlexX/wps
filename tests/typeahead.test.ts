import assert from 'node:assert/strict'
import test from 'node:test'
import * as countriesLib from '../src/lib/countries.ts'

const countryNames = ['Jamaica', 'Japan', 'Jordan', 'Panama', 'United States']

test('country typeahead matches names by locale-aware prefix from the first character', () => {
  const matcher = (countriesLib as typeof countriesLib & {
    countryTypeaheadMatches?: (names: string[], query: string, locale?: string) => string[]
  }).countryTypeaheadMatches

  assert.equal(typeof matcher, 'function', 'countryTypeaheadMatches should be exported')
  if (!matcher) return

  assert.deepEqual(matcher(countryNames, ''), [])
  assert.deepEqual(matcher(countryNames, 'j'), ['Jamaica', 'Japan', 'Jordan'])
  assert.deepEqual(matcher(countryNames, 'JA'), ['Jamaica', 'Japan'])
  assert.deepEqual(matcher(countryNames, 'jap'), ['Japan'])
  assert.deepEqual(matcher(countryNames, 'pan'), ['Panama'])
  assert.deepEqual(matcher(countryNames, 'apa'), [])
})
