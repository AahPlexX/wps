import assert from 'node:assert/strict'
import test from 'node:test'
import { mapCountryUrl, searchEditHistoryMode } from '../src/lib/historyState.ts'

test('history policy gives one entry to a contiguous directory search edit session', () => {
  assert.equal(searchEditHistoryMode(false), 'push')
  assert.equal(searchEditHistoryMode(true), 'replace')
})

test('map country URL preserves unrelated query state and the hash', () => {
  assert.equal(
    mapCountryUrl('/wps/map/', '?foo=1&country=France', '#detail', 'Japan'),
    '/wps/map/?foo=1&country=Japan#detail',
  )
})
