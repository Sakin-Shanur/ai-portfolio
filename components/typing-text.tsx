'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type TypingTextProps = {
  words: string[]
  className?: string
}

export function TypingText({ words, className }: TypingTextProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex % words.length]
    let delay = deleting ? 40 : 85

    if (!deleting && text === word) delay = 1600
    else if (deleting && text === '') delay = 300

    const timeout = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words])

  return (
    <span aria-hidden="true" className={cn('inline-flex items-center', className)}>
      {text}
      <span className="caret ml-0.5 inline-block h-[1.1em] w-[0.55ch] bg-cyber shadow-[0_0_10px_var(--cyber)]" />
    </span>
  )
}
