const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="glass flex w-full bg-background/75! backdrop-blur-xl max-w-3xl items-center justify-between gap-4 rounded-full py-2 pr-2 pl-5"
      >
        <a href="#top" className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-cyber shadow-[0_0_12px_var(--cyber)]"
          />
          sakin.ai
        </a>
        <ul className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
        >
          {"Let's talk"}
        </a>
      </nav>
    </header>
  )
}
