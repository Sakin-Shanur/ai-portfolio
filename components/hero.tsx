import { ArrowDown, ArrowRight } from 'lucide-react'
import { NeuralBackground } from '@/components/neural-background'
import { TypingText } from '@/components/typing-text'

const focusAreas = [
  'Machine Learning',
  'Neural Networks',
  'Computer Vision',
  'Large Language Models',
  'AI Ethics',
]

const stats = [
  { value: '0', label: 'AI projects shipped' },
  { value: '0', label: 'Research papers' },
  { value: '0', label: 'GPA / 4.5' },
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh items-center overflow-hidden px-6 pt-28 pb-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <div className="orb absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-cyber/15 blur-[140px]" />
        <div
          className="orb absolute right-[-10%] bottom-[-20%] size-[36rem] rounded-full bg-neon/20 blur-[140px]"
          style={{ animationDelay: '-6s' }}
        />
      </div>
      <div className="absolute inset-0 -z-10">
        <NeuralBackground />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_85%)]"
        />
      </div>

      <div className="mx-auto w-full max-w-5xl text-center">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Open to research &amp; internship roles — 2026
          </span>
        </div>

        <h1 className="mt-8 text-5xl leading-[1.02] font-bold tracking-tighter text-balance sm:text-7xl md:text-8xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 fill-mode-both">
          {"Hi, I'm "}
          <span className="text-gradient">Sakin.</span>
          <br />
          I build the future with AI.
        </h1>

        <p className="mx-auto mt-8 flex min-h-8 items-center justify-center gap-2 font-mono text-base text-muted-foreground sm:text-lg animate-in fade-in duration-1000 delay-300 fill-mode-both">
          <span className="text-cyber" aria-hidden="true">
            {'>'}
          </span>
          <span className="sr-only">Current focus areas: {focusAreas.join(', ')}</span>
          <TypingText words={focusAreas} className="text-foreground" />
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyber to-neon px-7 py-3.5 font-medium text-primary-foreground shadow-[0_0_40px_-6px_var(--neon)] transition-shadow hover:shadow-[0_0_60px_-4px_var(--cyber)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">View My Work</span>
            <ArrowRight className="relative size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium transition-colors hover:bg-white/10"
          >
            Get in touch
          </a>
        </div>

        <dl className="mx-auto mt-16 grid max-w-xl grid-cols-3 gap-3 animate-in fade-in duration-1000 delay-700 fill-mode-both">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl px-3 py-4">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">{stat.value}</dd>
              <dd className="mt-1 text-xs text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase md:flex"
      >
        Scroll
        <ArrowDown className="size-4 animate-bounce" />
      </a>
    </section>
  )
}
