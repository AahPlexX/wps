import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

type PoliticalRecord = {
  country: string
  group: string
  assignment: string
  system: string
  hierarchy: string
  note: string
}

const records = JSON.parse(
  await readFile(new URL('../src/data/countries/m-p.json', import.meta.url), 'utf8'),
) as PoliticalRecord[]
const myanmar = records.find((record) => record.country === 'Myanmar')

test('Myanmar reflects the post-2026 military-backed presidential structure', () => {
  assert.ok(myanmar, 'Myanmar record must exist')
  assert.equal(myanmar.group, 'President / co-president')
  assert.equal(myanmar.assignment, 'President')
  assert.equal(myanmar.system, 'Military-backed presidential government')
  assert.match(myanmar.hierarchy, /^President → Vice Presidents \/ Cabinet/)
  assert.doesNotMatch(myanmar.hierarchy, /Commander-in-Chief/)
  assert.doesNotMatch(myanmar.hierarchy, /Prime Minister/)
})
