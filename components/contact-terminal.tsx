'use client'

import { useState } from 'react'
import { CornerDownLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const CONTACT_EMAIL = 'hello@minjun.ai'

type LogLine = { text: string; tone?: 'muted' | 'ok' | 'err' }

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function ContactTerminal() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [logs, setLogs] = useState<LogLine[]>([])
  const [busy, setBusy] = useState(false)

  const push = (line: LogLine) => setLogs((prev) => [...prev, line])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (busy) return
    setLogs([])

    const trimmed = { name: name.trim(), email: email.trim(), message: message.trim() }
    if (!trimmed.name || !trimmed.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
      push({ text: 'error: all fields required — check your email format and try again.', tone: 'err' })
      return
    }

    setBusy(true)
    push({ text: '$ ./send_message --encrypt --priority=high', tone: 'muted' })
    await wait(350)
    push({ text: '› validating payload ........ ok', tone: 'ok' })
    await wait(350)
    push({ text: '› establishing secure channel ........ ok', tone: 'ok' })
    await wait(400)

    const subject = encodeURIComponent(`Portfolio inquiry from ${trimmed.name}`)
    const body = encodeURIComponent(`${trimmed.message}\n\n— ${trimmed.name} (${trimmed.email})`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

    push({ text: `✓ handed off to your mail client. talk soon, ${trimmed.name}.`, tone: 'ok' })
    setBusy(false)
  }

  const fieldClass =
    'w-full min-w-0 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none md:text-base'

  return (
    <div className="glass overflow-hidden rounded-3xl shadow-[0_0_80px_-30px_var(--cyber)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
        <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="size-3 rounded-full bg-[#28c840]" aria-hidden="true" />
        <p className="ml-3 font-mono text-xs text-muted-foreground">sakinshanur@gmail.com: ~/contact</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5 font-mono md:p-8" noValidate>
        <p className="text-sm text-muted-foreground">
          <span className="text-cyber">sakin.ai</span> v2.6.0 — {"type your message and hit enter."}
        </p>

        <label className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="shrink-0 text-sm">
            <span className="text-neon">{">"}</span> <span className="text-cyber">name</span>
            <span className="text-muted-foreground">:</span>
          </span>
          <input
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="sakin shanur"
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="shrink-0 text-sm">
            <span className="text-neon">{">"}</span> <span className="text-cyber">email</span>
            <span className="text-muted-foreground">:</span>
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sakin@example.com"
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm">
            <span className="text-neon">{">"}</span> <span className="text-cyber">message</span>
            <span className="text-muted-foreground">:</span>
          </span>
          <textarea
            name="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing || e.keyCode === 229) return
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                e.currentTarget.form?.requestSubmit()
              }
            }}
            placeholder="Let's build something intelligent together..."
            className={cn(fieldClass, 'resize-none rounded-xl border border-white/10 bg-black/20 p-4 focus:border-cyber/60')}
          />
        </label>

        <div
          aria-live="polite"
          className={cn('flex flex-col gap-1 text-xs md:text-sm', logs.length === 0 && 'hidden')}
        >
          {logs.map((line, i) => (
            <p
              key={i}
              className={cn(
                'animate-in fade-in slide-in-from-left-2 duration-300',
                line.tone === 'ok' && 'text-emerald-400',
                line.tone === 'err' && 'text-destructive',
                line.tone === 'muted' && 'text-muted-foreground',
              )}
            >
              {line.text}
            </p>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            <kbd className="rounded border border-white/15 px-1.5 py-0.5">⌘</kbd>{' '}
            <kbd className="rounded border border-white/15 px-1.5 py-0.5">Enter</kbd> to send
          </p>
          <button
            type="submit"
            disabled={busy}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyber to-neon px-6 py-3 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_40px_-6px_var(--cyber)] disabled:opacity-60"
          >
            {busy ? 'transmitting...' : './send'}
            <CornerDownLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  )
}
