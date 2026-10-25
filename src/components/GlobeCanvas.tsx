import { useEffect, useRef } from 'react'
import { GROUP_COLORS, type CountryRecord } from '../lib/countries'
import {
  clampGlobeView,
  pointInPolygon,
  projectCoordinate,
  type MapFeature,
  type ScreenPoint,
} from '../lib/globe'

interface ProjectedTarget {
  country: string
  segments: ScreenPoint[][]
  point: [number, number, number] | null
}

interface GlobeCanvasProps {
  countries: CountryRecord[]
  features: MapFeature[]
  selectedCountry: string
  onSelect: (country: string) => void
  resetVersion: number
}

export function GlobeCanvas({ countries, features, selectedCountry, onSelect, resetVersion }: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef(selectedCountry)
  const onSelectRef = useRef(onSelect)
  const animateToRef = useRef<(country: string) => void>(() => undefined)
  const resetViewRef = useRef<() => void>(() => undefined)

  useEffect(() => {
    selectedRef.current = selectedCountry
    animateToRef.current(selectedCountry)
  }, [selectedCountry])

  useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  useEffect(() => {
    if (resetVersion > 0) resetViewRef.current()
  }, [resetVersion])

  useEffect(() => {
    const canvasNode = canvasRef.current
    const stageNode = stageRef.current
    const tooltipNode = tooltipRef.current
    if (!canvasNode || !stageNode || !tooltipNode) return

    const context = canvasNode.getContext('2d', { alpha: false })
    if (!context) return

    const canvas: HTMLCanvasElement = canvasNode
    const stage: HTMLDivElement = stageNode
    const tooltip: HTMLDivElement = tooltipNode
    const ctx: CanvasRenderingContext2D = context

    const dataByCountry = new Map(countries.map((country) => [country.country, country]))
    const featureByCountry = new Map(features.map((feature) => [feature.country, feature]))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 1
    let height = 1
    let dpr = 1
    let radius = 1
    let centerLon = 12
    let centerLat = 15
    let zoom = 1
    let cx = 0
    let cy = 0
    let hoverCountry = ''
    let dragging = false
    let dragMoved = false
    let lastX = 0
    let lastY = 0
    let pointerId: number | null = null
    let projectedTargets: ProjectedTarget[] = []
    let animationToken = 0

    const view = () => ({ centerLon, centerLat, zoom, cx, cy, radius })

    function drawLine(points: ScreenPoint[], stroke: string, lineWidth: number) {
      if (points.length < 2) return
      ctx.strokeStyle = stroke
      ctx.lineWidth = lineWidth
      ctx.beginPath()
      ctx.moveTo(points[0][0], points[0][1])
      for (let index = 1; index < points.length; index += 1) {
        ctx.lineTo(points[index][0], points[index][1])
      }
      ctx.stroke()
    }

    function visibleSegments(ring: [number, number][]) {
      const segments: ScreenPoint[][] = []
      let segment: ScreenPoint[] = []
      let previous: { x: number; y: number } | null = null
      const maxJump = radius * zoom * 0.85

      for (const [lon, lat] of ring) {
        const point = projectCoordinate(lon, lat, view())
        if (point.z > 0.015) {
          if (previous && Math.hypot(point.x - previous.x, point.y - previous.y) > maxJump) {
            if (segment.length > 2) segments.push(segment)
            segment = []
          }
          segment.push([point.x, point.y])
          previous = point
        } else {
          if (segment.length > 2) segments.push(segment)
          segment = []
          previous = null
        }
      }

      if (segment.length > 2) segments.push(segment)
      return segments
    }

    function drawGraticule() {
      const stroke = 'rgba(85,105,96,.16)'
      for (let lat = -60; lat <= 60; lat += 30) {
        let points: ScreenPoint[] = []
        for (let lon = -180; lon <= 180; lon += 3) {
          const point = projectCoordinate(lon, lat, view())
          if (point.z > 0) points.push([point.x, point.y])
          else if (points.length) {
            drawLine(points, stroke, 0.7)
            points = []
          }
        }
        drawLine(points, stroke, 0.7)
      }
      for (let lon = -150; lon <= 180; lon += 30) {
        let points: ScreenPoint[] = []
        for (let lat = -90; lat <= 90; lat += 3) {
          const point = projectCoordinate(lon, lat, view())
          if (point.z > 0) points.push([point.x, point.y])
          else if (points.length) {
            drawLine(points, stroke, 0.7)
            points = []
          }
        }
        drawLine(points, stroke, 0.7)
      }
    }

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#eef2ef'
      ctx.fillRect(0, 0, width, height)

      const visibleRadius = radius * zoom
      const gradient = ctx.createRadialGradient(
        cx - visibleRadius * 0.28,
        cy - visibleRadius * 0.34,
        visibleRadius * 0.08,
        cx,
        cy,
        visibleRadius * 1.05,
      )
      gradient.addColorStop(0, '#f9fbfa')
      gradient.addColorStop(0.72, '#dfe7e2')
      gradient.addColorStop(1, '#cbd6cf')
      ctx.beginPath()
      ctx.arc(cx, cy, visibleRadius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, visibleRadius, 0, Math.PI * 2)
      ctx.clip()
      drawGraticule()
      projectedTargets = []

      const ordered = [...features].sort(
        (a, b) => Number(a.country === selectedRef.current) - Number(b.country === selectedRef.current),
      )

      for (const feature of ordered) {
        const data = dataByCountry.get(feature.country)
        if (!data) continue
        const isSelected = feature.country === selectedRef.current
        const isHover = feature.country === hoverCountry
        const color = GROUP_COLORS[data.group]
        const segments = feature.polygons.flatMap(visibleSegments)

        if (segments.length) {
          for (const segment of segments) {
            ctx.beginPath()
            ctx.moveTo(segment[0][0], segment[0][1])
            for (let index = 1; index < segment.length; index += 1) {
              ctx.lineTo(segment[index][0], segment[index][1])
            }
            ctx.closePath()
            ctx.globalAlpha = isSelected ? 1 : isHover ? 0.93 : 0.78
            ctx.fillStyle = color
            ctx.fill()
            ctx.globalAlpha = 1
            ctx.strokeStyle = isSelected ? '#ffffff' : 'rgba(24,35,31,.58)'
            ctx.lineWidth = isSelected ? 2.2 : 0.65
            ctx.stroke()
          }
          projectedTargets.push({ country: feature.country, segments, point: null })
        } else {
          const point = projectCoordinate(feature.centroid[0], feature.centroid[1], view())
          if (point.z > 0) {
            const pointRadius = isSelected ? 6.5 : isHover ? 5.8 : 4.5
            ctx.beginPath()
            ctx.arc(point.x, point.y, pointRadius, 0, Math.PI * 2)
            ctx.fillStyle = color
            ctx.fill()
            ctx.strokeStyle = isSelected ? '#ffffff' : '#18231f'
            ctx.lineWidth = isSelected ? 2.4 : 1
            ctx.stroke()
            projectedTargets.push({
              country: feature.country,
              segments: [],
              point: [point.x, point.y, Math.max(12, pointRadius + 6)],
            })
          }
        }
      }

      ctx.restore()
      ctx.beginPath()
      ctx.arc(cx, cy, visibleRadius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(24,35,31,.52)'
      ctx.lineWidth = 1.25
      ctx.stroke()

      const selectedFeature = featureByCountry.get(selectedRef.current)
      if (selectedFeature) {
        const point = projectCoordinate(selectedFeature.centroid[0], selectedFeature.centroid[1], view())
        if (point.z > 0) {
          ctx.beginPath()
          ctx.arc(point.x, point.y, 8, 0, Math.PI * 2)
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 2.5
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(point.x, point.y, 11, 0, Math.PI * 2)
          ctx.strokeStyle = '#18231f'
          ctx.lineWidth = 1.25
          ctx.stroke()
        }
      }
    }

    function resize() {
      const rect = stage.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cx = width / 2
      cy = height / 2
      radius = Math.max(120, Math.min(width, height) * 0.405)
      draw()
    }

    function hitCountry(x: number, y: number) {
      for (let index = projectedTargets.length - 1; index >= 0; index -= 1) {
        const target = projectedTargets[index]
        if (
          target.point &&
          Math.hypot(x - target.point[0], y - target.point[1]) <= target.point[2]
        ) {
          return target.country
        }
        for (const segment of target.segments) {
          if (pointInPolygon(x, y, segment)) return target.country
        }
      }
      return ''
    }

    function animateTo(country: string) {
      const feature = featureByCountry.get(country)
      if (!feature) {
        draw()
        return
      }
      const token = ++animationToken
      const startLon = centerLon
      const startLat = centerLat
      let delta = feature.centroid[0] - startLon
      while (delta > 180) delta -= 360
      while (delta < -180) delta += 360
      const duration = reducedMotion ? 0 : 520
      const startedAt = performance.now()

      const frame = (now: number) => {
        if (token !== animationToken) return
        const time = duration ? Math.min(1, (now - startedAt) / duration) : 1
        const eased = 1 - (1 - time) ** 3
        centerLon = startLon + delta * eased
        centerLat = startLat + (feature.centroid[1] - startLat) * eased
        draw()
        if (time < 1) requestAnimationFrame(frame)
      }
      requestAnimationFrame(frame)
    }

    animateToRef.current = animateTo

    function resetView() {
      animationToken += 1
      centerLon = 12
      centerLat = 15
      zoom = 1
      draw()
    }

    resetViewRef.current = resetView

    function pointerDown(event: PointerEvent) {
      dragging = true
      dragMoved = false
      pointerId = event.pointerId
      canvas.setPointerCapture(pointerId)
      lastX = event.clientX
      lastY = event.clientY
      tooltip.hidden = true
    }

    function pointerMove(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      if (dragging) {
        const dx = event.clientX - lastX
        const dy = event.clientY - lastY
        if (Math.abs(dx) + Math.abs(dy) > 2) dragMoved = true
        centerLon -= (dx / (radius * zoom)) * 58
        const next = clampGlobeView(centerLat + (dy / (radius * zoom)) * 58, zoom)
        centerLat = next.centerLat
        lastX = event.clientX
        lastY = event.clientY
        draw()
        return
      }

      const country = hitCountry(x, y)
      if (country !== hoverCountry) {
        hoverCountry = country
        draw()
      }
      if (country) {
        tooltip.textContent = country
        tooltip.style.left = `${x}px`
        tooltip.style.top = `${y}px`
        tooltip.hidden = false
      } else {
        tooltip.hidden = true
      }
    }

    function pointerUp(event: PointerEvent) {
      if (!dragging) return
      dragging = false
      if (pointerId !== null) {
        try {
          canvas.releasePointerCapture(pointerId)
        } catch {
          // Pointer capture may already be released by the browser.
        }
      }
      if (!dragMoved) {
        const rect = canvas.getBoundingClientRect()
        const country = hitCountry(event.clientX - rect.left, event.clientY - rect.top)
        if (country) onSelectRef.current(country)
      }
      pointerId = null
    }

    function pointerLeave() {
      if (dragging) return
      hoverCountry = ''
      tooltip.hidden = true
      draw()
    }

    function wheel(event: WheelEvent) {
      event.preventDefault()
      zoom = clampGlobeView(centerLat, zoom * Math.exp(-event.deltaY * 0.0012)).zoom
      draw()
    }

    function keyDown(event: KeyboardEvent) {
      let handled = true
      if (event.key === 'ArrowLeft') centerLon -= 7
      else if (event.key === 'ArrowRight') centerLon += 7
      else if (event.key === 'ArrowUp') centerLat += 7
      else if (event.key === 'ArrowDown') centerLat -= 7
      else if (event.key === '+' || event.key === '=') zoom *= 1.1
      else if (event.key === '-' || event.key === '_') zoom /= 1.1
      else if (event.key === 'Home') resetView()
      else handled = false

      if (!handled) return
      event.preventDefault()
      const next = clampGlobeView(centerLat, zoom)
      centerLat = next.centerLat
      zoom = next.zoom
      draw()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(stage)
    canvas.addEventListener('pointerdown', pointerDown)
    canvas.addEventListener('pointermove', pointerMove)
    canvas.addEventListener('pointerup', pointerUp)
    canvas.addEventListener('pointercancel', pointerUp)
    canvas.addEventListener('pointerleave', pointerLeave)
    canvas.addEventListener('wheel', wheel, { passive: false })
    canvas.addEventListener('keydown', keyDown)
    resize()
    animateTo(selectedRef.current)

    return () => {
      animationToken += 1
      resizeObserver.disconnect()
      canvas.removeEventListener('pointerdown', pointerDown)
      canvas.removeEventListener('pointermove', pointerMove)
      canvas.removeEventListener('pointerup', pointerUp)
      canvas.removeEventListener('pointercancel', pointerUp)
      canvas.removeEventListener('pointerleave', pointerLeave)
      canvas.removeEventListener('wheel', wheel)
      canvas.removeEventListener('keydown', keyDown)
    }
  }, [countries, features])

  return (
    <div className="globe-shell">
      <div ref={stageRef} className="globe-stage" data-testid="globe-stage">
        <canvas
          ref={canvasRef}
          className="globe-canvas"
          tabIndex={0}
          aria-label="Interactive 3D globe. Drag to rotate. Use the mouse wheel, plus, or minus to zoom. Arrow keys rotate the globe. Select a country by clicking it or use the country search above."
        >
          Use the country search to select a country and read its political structure.
        </canvas>
        <div ref={tooltipRef} className="map-tooltip" hidden aria-hidden="true" />
      </div>
      <p className="map-status">
        Drag to rotate. Scroll or use +/− to zoom. Keyboard: arrows rotate, Home resets. Small
        states not visible at this map scale use point targets.
      </p>
    </div>
  )
}
