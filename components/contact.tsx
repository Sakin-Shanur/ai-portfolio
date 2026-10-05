import { Mail } from 'lucide-react'
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '@/components/brand-icons'
import { ContactTerminal } from '@/components/contact-terminal'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const socials = [
  { href: 'https://github.com/Sakin-Shanur', label: 'GitHub', icon: Github },
  { href: 'https://www.linkedin.com/', label: 'LinkedIn', icon: Linkedin },
  { href: 'mailto:sakinshanur@gmail.com', label: 'Email', icon: Mail },
]

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 px-6 py-28 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 -z-10 size-[36rem] rounded-full bg-cyber/10 blur-[160px]"
      />
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <SectionHeading
            index="03"
            eyebrow="Contact"
            title="Open a channel."
            description="Research collaborations, internships, or a wild AI idea — my inbox is always listening."
          />
          <Reveal delay={300}>
            <ul className="mt-10 flex gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="glass grid size-12 place-items-center rounded-full transition-all hover:-translate-y-1 hover:text-cyber hover:shadow-[0_0_30px_-6px_var(--cyber)]"
                  >
                    <s.icon className="size-5" aria-hidden="true" />
                    <span className="sr-only">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={150} className="lg:col-span-3">
          <ContactTerminal />
        </Reveal>
      </div>
    </section>
  )
}
