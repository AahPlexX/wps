const VERSION_PATTERN = /^(\d+)\.(\d+)\.(\d+)$/

function parseVersion(version: string) {
  const match = VERSION_PATTERN.exec(version)
  if (!match) return null
  return match.slice(1).map(Number) as [number, number, number]
}

export function isNewerVersion(available: string, current: string) {
  const next = parseVersion(available)
  const active = parseVersion(current)
  if (!next || !active) return false

  for (let index = 0; index < next.length; index += 1) {
    if (next[index] > active[index]) return true
    if (next[index] < active[index]) return false
  }
  return false
}
