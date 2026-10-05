'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type TiltCardProps = {
  children: ReactNode
  className?: string
  maxTilt?: number
}

export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)

    if (e.pointerType !== 'mouse') return
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const rx = ((y / rect.height) - 0.5) * -maxTilt
      const ry = ((x / rect.width) - 0.5) * maxTilt
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015, 1.015, 1)`
    })
  }

  const handlePointerLeave = () => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(frame.current)
    el.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'spotlight-card glass rounded-3xl transition-transform duration-300 ease-out will-change-transform motion-reduce:transform-none!',
        className,
      )}
    >
      {children}
    </div>
  )
}
