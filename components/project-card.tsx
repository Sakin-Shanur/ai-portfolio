'use client'

import { useId, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { TiltCard } from '@/components/tilt-card'
import { TrainingCurve } from '@/components/training-curve'
import type { Project } from '@/lib/projects'
import { cn } from '@/lib/utils'

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const accentText = project.accent === 'cyber' ? 'text-cyber' : 'text-neon'
  const accentBg = project.accent === 'cyber' ? 'bg-cyber' : 'bg-neon'

  return (
    <TiltCard className="relative flex w-full flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -top-24 -right-24 size-56 rounded-full opacity-25 blur-3xl',
          accentBg,
        )}
      />

      <div className={cn('flex flex-1 flex-col p-6 md:p-8', project.featured && 'lg:p-10')}>
        <div className="flex items-start justify-between gap-4">
          <p className={cn('font-mono text-[11px] tracking-widest uppercase', accentText)}>{project.category}</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls={panelId}
            className="glass relative z-10 grid size-9 shrink-0 place-items-center rounded-full transition-transform hover:rotate-90 before:absolute before:-inset-[100vmax] before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber"
          >
            <Plus className="size-4" aria-hidden="true" />
            <span className="sr-only">Show technical details for {project.title}</span>
          </button>
        </div>

        <h3
          className={cn(
            'mt-6 font-bold tracking-tight',
            project.featured ? 'text-4xl md:text-5xl' : 'text-2xl',
          )}
        >
          {project.title}
        </h3>
        <p
          className={cn(
            'mt-3 leading-relaxed text-muted-foreground text-pretty',
            project.featured ? 'max-w-lg text-lg' : 'text-sm',
          )}
        >
          {project.summary}
        </p>

        {project.featured ? <TrainingCurve className="my-8 hidden md:block" /> : null}

        <div className="mt-auto pt-6">
          <dl className="flex flex-wrap gap-x-8 gap-y-3">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">{m.label}</dt>
                <dd className={cn('font-semibold tracking-tight', project.featured ? 'text-3xl' : 'text-xl')}>
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        id={panelId}
        role="region"
        aria-label={`${project.title} technical details`}
        hidden={!open}
        className={cn(
          'absolute inset-0 z-20 flex flex-col overflow-y-auto bg-background/95 p-6 backdrop-blur-xl md:p-8',
          'animate-in fade-in slide-in-from-bottom-6 duration-500',
          project.featured && 'lg:p-10',
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <p className={cn('font-mono text-[11px] tracking-widest uppercase', accentText)}>
            {'// '}technical details
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="glass grid size-9 shrink-0 place-items-center rounded-full transition-transform hover:rotate-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyber"
          >
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">Close details</span>
          </button>
        </div>
        <h4 className={cn('mt-4 font-bold tracking-tight', project.featured ? 'text-3xl' : 'text-xl')}>
          {project.title}
        </h4>
        <ol className="mt-5 flex flex-col gap-4">
          {project.details.map((d, i) => (
            <li key={d} className="flex gap-3 text-sm leading-relaxed text-pretty md:text-base">
              <span className={cn('font-mono text-xs leading-6', accentText)}>{String(i + 1).padStart(2, '0')}</span>
              <span>{d}</span>
            </li>
          ))}
        </ol>
        <p className="mt-auto pt-6 font-mono text-xs text-muted-foreground">
          stack: <span className="text-foreground">{project.stack.join(' · ')}</span>
        </p>
      </div>
    </TiltCard>
  )
}
