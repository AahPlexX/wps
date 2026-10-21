export const GROUP_ORDER = [
  'President / co-president',
  'Monarch',
  'Collective / council head',
  'Supreme / religious leader',
  'Other / transitional',
] as const

export type PoliticalGroup = (typeof GROUP_ORDER)[number]

export interface CountryRecord {
  country: string
  group: PoliticalGroup
  assignment: string
  system: string
  hierarchy: string
  note: string
}

export type GroupBy = 'group' | 'system'

export interface DirectoryFilters {
  query: string
  category: string
  structure: string
  groupBy: GroupBy
}

export const GROUP_LABELS: Record<PoliticalGroup, string> = {
  'President / co-president': 'President / co-president',
  Monarch: 'Monarch',
  'Collective / council head': 'Collective / council',
  'Supreme / religious leader': 'Supreme / religious',
  'Other / transitional': 'Other / transitional',
}

export const GROUP_COLORS: Record<PoliticalGroup, string> = {
  'President / co-president': '#4f7b6c',
  Monarch: '#b18735',
  'Collective / council head': '#4d6f9b',
  'Supreme / religious leader': '#765b8d',
  'Other / transitional': '#a45b48',
}

export function filterCountries(
  countries: CountryRecord[],
  filters: DirectoryFilters,
  locale = 'en-US',
) {
  const query = filters.query.trim().toLocaleLowerCase(locale)
  return countries.filter((country) => {
    if (filters.category && country.group !== filters.category) return false
    if (filters.structure && country.system !== filters.structure) return false
    if (!query) return true
    return [country.country, country.assignment, country.system, country.hierarchy, country.note]
      .join(' ')
      .toLocaleLowerCase(locale)
      .includes(query)
  })
}

export function groupCountries(
  countries: CountryRecord[],
  groupBy: GroupBy,
  collator = new Intl.Collator('en-US', { sensitivity: 'base' }),
) {
  const buckets = new Map<string, CountryRecord[]>()
  for (const country of countries) {
    const label = country[groupBy]
    const bucket = buckets.get(label)
    if (bucket) bucket.push(country)
    else buckets.set(label, [country])
  }

  const labels = [...buckets.keys()].sort((a, b) => {
    if (groupBy === 'group') {
      const ai = GROUP_ORDER.indexOf(a as PoliticalGroup)
      const bi = GROUP_ORDER.indexOf(b as PoliticalGroup)
      return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || collator.compare(a, b)
    }
    return collator.compare(a, b)
  })

  return labels.map((label) => ({
    label,
    countries: buckets.get(label)!.sort((a, b) => collator.compare(a.country, b.country)),
  }))
}

export function directoryFiltersFromSearch(search: string): DirectoryFilters {
  const params = new URLSearchParams(search)
  return {
    query: params.get('q') ?? '',
    category: params.get('category') ?? '',
    structure: params.get('structure') ?? '',
    groupBy: params.get('group') === 'system' ? 'system' : 'group',
  }
}

export function directorySearchFromFilters(filters: DirectoryFilters) {
  const params = new URLSearchParams()
  if (filters.query.trim()) params.set('q', filters.query.trim())
  if (filters.category) params.set('category', filters.category)
  if (filters.structure) params.set('structure', filters.structure)
  if (filters.groupBy !== 'group') params.set('group', filters.groupBy)
  return params.toString()
}
