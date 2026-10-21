import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'

async function readShards(directory) {
  const base = new URL(`../src/data/${directory}/`, import.meta.url)
  const files = (await readdir(base)).filter((file) => file.endsWith('.json')).sort()
  return (await Promise.all(files.map(async (file) => JSON.parse(await readFile(new URL(file, base), 'utf8'))))).flat()
}

const countries = await readShards('countries')
const features = await readShards('mapFeatures')
const groups = new Map()

assert.equal(countries.length, 195, 'political dataset must contain 195 states')
assert.equal(new Set(countries.map((country) => country.country)).size, 195, 'country names must be unique')
assert.equal(features.length, 195, 'map geometry must contain 195 targets')
assert.equal(new Set(features.map((feature) => feature.country)).size, 195, 'map target names must be unique')

for (const country of countries) {
  for (const key of ['country', 'group', 'assignment', 'system', 'hierarchy', 'note']) {
    assert.equal(typeof country[key], 'string', `${country.country}.${key} must be a string`)
  }
  groups.set(country.group, (groups.get(country.group) ?? 0) + 1)
}

const featureNames = new Set(features.map((feature) => feature.country))
for (const country of countries) assert(featureNames.has(country.country), `missing map target: ${country.country}`)
for (const feature of features) {
  assert(Array.isArray(feature.centroid) && feature.centroid.length === 2, `invalid centroid: ${feature.country}`)
  assert(Array.isArray(feature.polygons), `invalid polygons: ${feature.country}`)
}

assert.deepEqual(Object.fromEntries(groups), {
  'Supreme / religious leader': 2,
  'President / co-president': 141,
  Monarch: 42,
  'Collective / council head': 6,
  'Other / transitional': 4,
})
assert.equal(features.filter((feature) => feature.polygons.length === 0).length, 29)
console.log('Validated 195 political records, 195 map targets, category totals, and 29 point-target microstates.')
