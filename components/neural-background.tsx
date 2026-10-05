'use client'

import { useEffect, useRef } from 'react'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  hue: 0 | 1
}

const CYAN = '94, 210, 255'
const VIOLET = '178, 102, 255'

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const isCoarse = window.matchMedia('(pointer: coarse)').matches

    let width = 0
    let height = 0
    let nodes: Node[] = []
    let raf = 0
    let running = true
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false }

    const linkDistance = () => (width < 640 ? 110 : 150)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isCoarse ? 1.5 : 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const density = isCoarse ? 22000 : 13000
      const count = Math.min(140, Math.max(36, Math.floor((width * height) / density)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        hue: Math.random() > 0.55 ? 1 : 0,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      pointer.x += (pointer.tx - pointer.x) * 0.12
      pointer.y += (pointer.ty - pointer.y) * 0.12

      const maxDist = linkDistance()
      const maxDistSq = maxDist * maxDist
      const influence = 180

      for (const n of nodes) {
        if (!reducedMotion) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < -20) n.x = width + 20
          if (n.x > width + 20) n.x = -20
          if (n.y < -20) n.y = height + 20
          if (n.y > height + 20) n.y = -20

          if (pointer.active) {
            const dx = pointer.x - n.x
            const dy = pointer.y - n.y
            const d = Math.hypot(dx, dy)
            if (d < influence && d > 0.1) {
              const force = (1 - d / influence) * 0.6
              n.x += (dx / d) * force
              n.y += (dy / d) * force
            }
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distSq = dx * dx + dy * dy
          if (distSq > maxDistSq) continue

          const strength = 1 - Math.sqrt(distSq) / maxDist
          const mx = (a.x + b.x) / 2 - pointer.x
          const my = (a.y + b.y) / 2 - pointer.y
          const nearPointer = pointer.active
            ? Math.max(0, 1 - Math.hypot(mx, my) / 220)
            : 0
          const alpha = strength * 0.22 + nearPointer * strength * 0.65
          ctx.strokeStyle = `rgba(${a.hue === b.hue && a.hue === 1 ? VIOLET : CYAN}, ${alpha})`
          ctx.lineWidth = 0.6 + nearPointer * 0.8
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (const n of nodes) {
        const near = pointer.active
          ? Math.max(0, 1 - Math.hypot(n.x - pointer.x, n.y - pointer.y) / 200)
          : 0
        const color = n.hue === 1 ? VIOLET : CYAN
        const radius = n.r + near * 2.2
        if (near > 0.05) {
          ctx.fillStyle = `rgba(${color}, ${near * 0.18})`
          ctx.beginPath()
          ctx.arc(n.x, n.y, radius * 4, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.fillStyle = `rgba(${color}, ${0.55 + near * 0.45})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      if (running && !reducedMotion) raf = requestAnimationFrame(draw)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      if (running) raf = requestAnimationFrame(draw)
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.tx = e.clientX - rect.left
      pointer.ty = e.clientY - rect.top
      if (!pointer.active) {
        pointer.x = pointer.tx
        pointer.y = pointer.ty
      }
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
      pointer.tx = pointer.ty = -9999
    }

    const visibility = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting && !document.hidden
      if (running) start()
      else cancelAnimationFrame(raf)
    })
    visibility.observe(canvas)

    const onVisibilityChange = () => {
      running = !document.hidden
      if (running) start()
      else cancelAnimationFrame(raf)
    }

    resize()
    start()

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reducedMotion) draw()
    })
    resizeObserver.observe(canvas)

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelAnimationFrame(raf)
      visibility.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  )
}
