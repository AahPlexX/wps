import assert from 'node:assert/strict'
import test from 'node:test'
import {
  directoryFiltersFromSearch,
  directorySearchFromFilters,
  filterCountries,
  groupCountries,
  type CountryRecord,
} from '../src/lib/countries.ts'

const sample: CountryRecord[] = [
  {
    country: 'Alpha',
    group: 'Monarch',
    assignment: 'King',
    system: 'Parliamentary constitutional monarchy',
    hierarchy: 'King → Prime Minister → Parliament',
    note: '',
  },
  {
    country: 'Beta',
    group: 'President / co-president',
    assignment: 'President',
    system: 'President-led republic',
    hierarchy: 'President → Cabinet → Parliament',
    note: 'Transitional note',
  },
]

test('directory filtering searches all political fields and preserves category constraints', () => {
  assert.deepEqual(
    filterCountries(sample, { query: 'king', category: '', structure: '', groupBy: 'group' }).map((c) => c.country),
    ['Alpha'],
  )
  assert.deepEqual(
    filterCountries(sample, {
      query: 'transition',
      category: 'President / co-president',
      structure: 'President-led republic',
      groupBy: 'group',
    }).map((c) => c.country),
    ['Beta'],
  )
})

test('directory grouping is deterministic and alphabetical within groups', () => {
  const grouped = groupCountries([...sample].reverse(), 'group')
  assert.deepEqual(grouped.map((group) => group.label), ['President / co-president', 'Monarch'])
  assert.equal(grouped[0].countries[0].country, 'Beta')
})

test('directory URL state round-trips without default noise', () => {
  const filters = directoryFiltersFromSearch(
    '?q=king&category=Monarch&group=system',
    sample.map((country) => country.system),
  )
  assert.deepEqual(filters, { query: 'king', category: 'Monarch', structure: '', groupBy: 'system' })
  assert.equal(directorySearchFromFilters(filters), 'q=king&category=Monarch&group=system')
})

test('directory URL state ignores unsupported controlled filter values', () => {
  const filters = directoryFiltersFromSearch(
    '?q=alpha&category=bogus&structure=bogus&group=bogus',
    sample.map((country) => country.system),
  )
  assert.deepEqual(filters, { query: 'alpha', category: '', structure: '', groupBy: 'group' })
})
