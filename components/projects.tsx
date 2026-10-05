import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { ProjectCard } from '@/components/project-card'
import { projects } from '@/lib/projects'
import { cn } from '@/lib/utils'

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 px-6 py-28 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-0 -z-10 size-[40rem] rounded-full bg-neon/10 blur-[160px]"
      />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="Projects that learn."
          description="Tap any card to peek under the hood — architecture, training details, and results."
        />

        <ul className="mt-14 grid auto-rows-[minmax(17rem,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {projects.map((project, i) => (
            <Reveal as="li" key={project.id} delay={(i % 3) * 120} className={cn('flex', project.layout)}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
