import { cn } from '@/lib/utils'

const rowOne = [
  'Python',
  'PyTorch',
  'TensorFlow',
  'JAX',
  'C++',
  'CUDA',
  'Hugging Face',
  'scikit-learn',
  'OpenCV',
  'NumPy',
  'Pandas',
]
const rowTwo = [
  'LangChain',
  'Transformers',
  'Weights & Biases',
  'ONNX',
  'FastAPI',
  'Docker',
  'Kubernetes',
  'TypeScript',
  'Rust',
  'PostgreSQL',
  'AI SDK',
]

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee-group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <ul
        className={cn('animate-marquee flex w-max shrink-0 gap-3 pr-3', reverse && 'marquee-reverse')}
        style={{ '--marquee-duration': reverse ? '48s' : '40s' } as React.CSSProperties}
      >
        {[...items, ...items].map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= items.length}
            className="glass flex items-center gap-2.5 rounded-full px-5 py-2.5 font-mono text-sm whitespace-nowrap"
          >
            <span
              aria-hidden="true"
              className={cn(
                'size-1.5 rounded-full',
                i % 2 === 0 ? 'bg-cyber shadow-[0_0_8px_var(--cyber)]' : 'bg-neon shadow-[0_0_8px_var(--neon)]',
              )}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function TechMarquee() {
  return (
    <div className="flex flex-col gap-3">
      <MarqueeRow items={rowOne} />
      <MarqueeRow items={rowTwo} reverse />
    </div>
  )
}
