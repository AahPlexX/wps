import countriesAB from './countries/a-b.json'
import countriesCE from './countries/c-e.json'
import countriesFH from './countries/f-h.json'
import countriesIL from './countries/i-l.json'
import countriesMP from './countries/m-p.json'
import countriesQT from './countries/q-t.json'
import countriesUV from './countries/u-v.json'
import countriesWZ from './countries/w-z.json'
import featuresAB from './mapFeatures/a-b.json'
import featuresCE from './mapFeatures/c-e.json'
import featuresFH from './mapFeatures/f-h.json'
import featuresIL from './mapFeatures/i-l.json'
import featuresMP from './mapFeatures/m-p.json'
import featuresQT from './mapFeatures/q-t.json'
import featuresUV from './mapFeatures/u-v.json'
import featuresWZ from './mapFeatures/w-z.json'
import type { CountryRecord } from '../lib/countries'
import type { MapFeature } from '../lib/globe'

export const countries = [
  ...countriesAB, ...countriesCE, ...countriesFH, ...countriesIL,
  ...countriesMP, ...countriesQT, ...countriesUV, ...countriesWZ,
] as CountryRecord[]

export const mapFeatures = [
  ...featuresAB, ...featuresCE, ...featuresFH, ...featuresIL,
  ...featuresMP, ...featuresQT, ...featuresUV, ...featuresWZ,
] as MapFeature[]
