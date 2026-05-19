'use client'

import { useState } from 'react'
import { CopyButton } from './copy-button'
import { cn } from '@/lib/cn'
import { Terminal } from 'lucide-react'

export function PackageManager({ className }: { className?: string }) {
  const [active, setActive] = useState<'pnpm' | 'npm' | 'yarn' | 'bun' | 'deno' | 'ylt'>('pnpm')

  const commands = {
    pnpm: 'pnpm add musubi',
    npm: 'npm install musubi',
    yarn: 'yarn add musubi',
    bun: 'bun add musubi',
    deno: 'deno add musubi',
    ylt: 'ylt add musubi',
  }

  const renderCommand = (cmd: string) => {
    const parts = cmd.split(' ')
    return (
      <>
        <span className="text-[#ff5f57]/80">{parts[0]}</span>{' '}
        <span className="text-[#febc2e]/80">{parts[1]}</span>{' '}
        <span className="text-[#28c840]/80">{parts.slice(2).join(' ')}</span>
      </>
    )
  }

  return (
    <div className={cn('relative overflow-hidden rounded-[var(--musubi-radius)] border border-line bg-surface text-sm shadow-sm', className)}>
      <div className="flex items-center gap-2 px-3 py-2 border-b border-line bg-base">
        <div className="bg-surface border border-line rounded p-1">
          <Terminal className="w-3.5 h-3.5 text-fg/70" />
        </div>
        <div className="flex items-center gap-1 ml-1">
          {(['pnpm', 'npm', 'yarn', 'bun', 'deno', 'ylt'] as const).map((pm) => (
            <button
              key={pm}
              onClick={() => setActive(pm)}
              className={cn(
                'px-3 py-1 rounded-md font-mono text-xs transition-colors',
                active === pm ? 'bg-surface border border-line text-fg shadow-sm' : 'text-dim hover:text-muted transparent'
              )}
            >
              {pm}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <CopyButton
            text={commands[active]}
            className="text-dim hover:text-fg transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center px-4 py-3">
        <code className="font-mono text-[13px]">
          {renderCommand(commands[active])}
        </code>
      </div>
    </div>
  )
}
