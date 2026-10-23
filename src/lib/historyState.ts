export type HistoryWriteMode = 'push' | 'replace'

export function searchEditHistoryMode(editActive: boolean): HistoryWriteMode {
  return editActive ? 'replace' : 'push'
}

export function mapCountryUrl(pathname: string, search: string, hash: string, country: string) {
  const params = new URLSearchParams(search)
  params.set('country', country)
  return `${pathname}?${params.toString()}${hash}`
}
