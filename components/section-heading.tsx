import { Reveal } from '@/components/reveal'

type SectionHeadingProps = {
  index: string
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <p className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-cyber uppercase">
          <span className="text-muted-foreground">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-cyber to-neon" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mt-5 text-4xl font-bold tracking-tighter text-balance md:text-6xl">{title}</h2>
      </Reveal>
      {description ? (
        <Reveal delay={200}>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">{description}</p>
        </Reveal>
      ) : null}
    </div>
  )
}
