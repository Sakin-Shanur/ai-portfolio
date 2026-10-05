import Image from 'next/image'
import { GraduationCap, MapPin, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { TechMarquee } from '@/components/tech-marquee'

const facts = [
  { icon: GraduationCap, label: 'Studying', value: 'Artificial Intelligence' },
  { icon: MapPin, label: 'Based in', value: 'Gangwon-do, South Korea' },
  { icon: Sparkles, label: 'Focus', value: 'Vision · LLMs · Responsible AI' },
]

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" eyebrow="About me" title="Curious mind, rigorous builder." />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="glass group relative aspect-square overflow-hidden rounded-3xl">
              <Image
                src="/images/portrait.jpg"
                alt="Portrait of Minjun lit in cyan and purple light"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 glass flex items-center justify-between rounded-2xl px-4 py-3 font-mono text-xs">
                <span className="text-muted-foreground">status</span>
                <span className="text-cyber">training_models()</span>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-3">
            <Reveal delay={100} className="glass rounded-3xl p-8 md:p-10">
              <p className="text-xl leading-relaxed text-pretty md:text-2xl">
                {"I'm an "}
                <span className="text-gradient font-semibold">Artificial Intelligence</span>
                {' major in South Korea, obsessed with turning messy real-world problems into elegant, learnable systems.'}
              </p>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                {
                  "From fine-tuning vision transformers for medical imaging to building Korean-language LLM agents, I love the whole loop — reading the paper, writing the training script, and shipping something people actually use. I care deeply about models that are fair, explainable, and efficient enough to run anywhere."
                }
              </p>
            </Reveal>

            <ul className="grid gap-4 sm:grid-cols-3">
              {facts.map((fact, i) => (
                <Reveal as="li" key={fact.label} delay={200 + i * 100} className="glass rounded-2xl p-5">
                  <fact.icon className="size-5 text-cyber" aria-hidden="true" />
                  <p className="mt-4 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                    {fact.label}
                  </p>
                  <p className="mt-1 text-sm font-medium">{fact.value}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Reveal delay={150} className="mt-20">
        <p className="mb-6 text-center font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Languages &amp; tools I work with
        </p>
        <TechMarquee />
      </Reveal>
    </section>
  )
}
