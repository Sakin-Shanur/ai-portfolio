import { cn } from '@/lib/utils'

const trainLoss = [92, 70, 58, 47, 41, 35, 31, 27, 25, 22, 20, 18.5, 17, 16, 15.2, 14.6, 14, 13.6, 13.2, 13]
const valAcc = [12, 30, 44, 55, 62, 68, 72, 75, 78, 80, 82, 83.5, 85, 86, 87, 87.6, 88.2, 88.6, 89, 89.3]

function toPath(values: number[], width: number, height: number) {
  const step = width / (values.length - 1)
  return values
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${(height - (v / 100) * height).toFixed(1)}`)
    .join(' ')
}

export function TrainingCurve({ className }: { className?: string }) {
  const w = 600
  const h = 140
  const loss = toPath(trainLoss, w, h)
  const acc = toPath(valAcc, w, h)

  return (
    <figure className={cn('rounded-2xl border border-white/10 bg-black/20 p-4', className)}>
      <figcaption className="mb-3 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span>training_run_042 · epoch 20/20</span>
        <span className="flex gap-4">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-cyber" aria-hidden="true" />
            val_acc
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-neon" aria-hidden="true" />
            train_loss
          </span>
        </span>
      </figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-32 w-full overflow-visible" preserveAspectRatio="none" role="img" aria-label="Validation accuracy rising and training loss falling over 20 epochs">
        <defs>
          <linearGradient id="acc-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--cyber)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--cyber)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((y) => (
          <line key={y} x1="0" x2={w} y1={h * y} y2={h * y} stroke="white" strokeOpacity="0.06" strokeDasharray="4 6" />
        ))}
        <path d={`${acc} L${w},${h} L0,${h} Z`} fill="url(#acc-fill)" />
        <path d={acc} fill="none" stroke="var(--cyber)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        <path d={loss} fill="none" stroke="var(--neon)" strokeWidth="2" strokeDasharray="6 5" vectorEffect="non-scaling-stroke" />
      </svg>
    </figure>
  )
}
