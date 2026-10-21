import assert from 'node:assert/strict'
import test from 'node:test'
import { clampGlobeView, pointInPolygon, projectCoordinate } from '../src/lib/globe.ts'

test('orthographic projection puts the view center at canvas center and hides the antipode', () => {
  const view = { centerLon: 0, centerLat: 0, zoom: 1, cx: 200, cy: 150, radius: 100 }
  const center = projectCoordinate(0, 0, view)
  const antipode = projectCoordinate(180, 0, view)
  assert.equal(center.x, 200)
  assert.equal(center.y, 150)
  assert(center.z > 0.99)
  assert(antipode.z < -0.99)
})

test('globe view clamps latitude and zoom to interaction limits', () => {
  assert.deepEqual(clampGlobeView(120, 10), { centerLat: 80, zoom: 1.65 })
  assert.deepEqual(clampGlobeView(-120, 0.1), { centerLat: -80, zoom: 0.72 })
})

test('polygon hit testing distinguishes inside and outside points', () => {
  const square: [number, number][] = [[0, 0], [10, 0], [10, 10], [0, 10]]
  assert.equal(pointInPolygon(5, 5, square), true)
  assert.equal(pointInPolygon(15, 5, square), false)
})
