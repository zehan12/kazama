'use client'

import Link from 'next/link'
import { Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import { useModel } from '@/lib/store'
import NumberFlow from '@number-flow/react'

export function HeroDemo() {
  const [state, dispatchers] = useModel('counter')

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-12">
        <Button size="lg" onClick={() => dispatchers.increment()}>
          Increment State ({state.count})
        </Button>
        <Link
          href="/docs"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--kazama-radius)] px-5 text-sm font-medium text-muted transition-colors hover:text-fg"
          style={{ border: '1px solid var(--code-border-strong)', background: 'var(--code-bg)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
        >
          Docs
        </Link>
        <a
          href="https://github.com/zehan12/kazama"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--kazama-radius)] px-5 text-sm font-medium text-muted transition-colors hover:text-fg"
          style={{ border: '1px solid var(--code-border-strong)', background: 'var(--code-bg)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          GitHub
        </a>
      </div>

      <div className={cn(
        'flex flex-col bg-surface border border-line rounded-[var(--kazama-radius)]',
        'max-h-[85dvh] outline-none max-w-sm mb-12'
      )}>
        <div className="flex flex-col gap-4 p-6">
          <div>
            <h3 className="text-base font-semibold text-fg font-mono">
              useModel('counter')
            </h3>
            <p className="text-sm text-dim mt-1">
              Test out the reactive state updates.
            </p>
          </div>

          <div className="flex items-center p-4 bg-base rounded-md border border-line">
            <div className="flex items-center gap-2 text-lg font-mono">
              <span className="text-dim shrink-0">Count:</span>
              <NumberFlow
                value={state.count}
                format={{ 
                  minimumIntegerDigits: 2,
                  notation: Math.abs(state.count) >= 1e11 ? 'compact' : 'standard',
                  maximumFractionDigits: 2
                }}
                className="font-semibold text-fg"
                animated={true}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => dispatchers.sub5()}>
              -5
            </Button>
            <Button variant="outline" size="sm" onClick={() => dispatchers.decrement()}>
              <Minus className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => dispatchers.increment()}>
              <Plus className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => dispatchers.add5()}>
              +5
            </Button>
            <Button variant="outline" size="sm" onClick={() => dispatchers.mul5()}>
              x5
            </Button>
            <Button variant="outline" size="sm" onClick={() => dispatchers.pow2()}>
              x²
            </Button>
            <div className="w-full h-px bg-line my-1" />
            <Button variant="secondary" size="sm" className="w-full" onClick={() => dispatchers.reset()}>
              Reset Counter
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
