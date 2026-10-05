import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import { SiteNav } from '@/components/site-nav'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main className="relative overflow-x-clip">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-30 bg-[linear-gradient(to_right,oklch(1_0_0/0.025)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_75%)]"
        />
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Sakin · Gangwon-do, South Korea</p>
          <p>
            built with <span className="text-cyber">Next.js</span> + <span className="text-neon">curiosity</span>
          </p>
        </div>
      </footer>
    </>
  )
}
