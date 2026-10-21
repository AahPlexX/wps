export type Coordinate = [number, number]
export type ScreenPoint = [number, number]

export interface MapFeature {
  country: string
  polygons: Coordinate[][]
  centroid: Coordinate
}

const DEG = Math.PI / 180

export interface GlobeView {
  centerLon: number
  centerLat: number
  zoom: number
  cx: number
  cy: number
  radius: number
}

export function projectCoordinate(lon: number, lat: number, view: GlobeView) {
  const lambda = lon * DEG
  const phi = lat * DEG
  const lambda0 = view.centerLon * DEG
  const phi0 = view.centerLat * DEG
  let delta = lambda - lambda0
  while (delta > Math.PI) delta -= Math.PI * 2
  while (delta < -Math.PI) delta += Math.PI * 2

  const sinPhi = Math.sin(phi)
  const cosPhi = Math.cos(phi)
  const sinPhi0 = Math.sin(phi0)
  const cosPhi0 = Math.cos(phi0)
  const cosDelta = Math.cos(delta)
  const z = sinPhi0 * sinPhi + cosPhi0 * cosPhi * cosDelta

  return {
    x: view.cx + view.radius * view.zoom * cosPhi * Math.sin(delta),
    y:
      view.cy -
      view.radius *
        view.zoom *
        (sinPhi * cosPhi0 - cosPhi * cosDelta * sinPhi0),
    z,
  }
}

export function pointInPolygon(x: number, y: number, points: ScreenPoint[]) {
  let inside = false
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i]
    const [xj, yj] = points[j]
    const intersects =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi || 1e-9) + xi
    if (intersects) inside = !inside
  }
  return inside
}

export function clampGlobeView(centerLat: number, zoom: number) {
  return {
    centerLat: Math.max(-80, Math.min(80, centerLat)),
    zoom: Math.max(0.72, Math.min(1.65, zoom)),
  }
}
