'use client'

import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function DocsSearch() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toast('Search is coming soon!', {
          description: 'This feature is currently under development.',
        })
      }
    }
    
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <button
      onClick={() => toast('Search is coming soon!', { description: 'This feature is currently under development.' })}
      className="flex w-full items-center justify-between rounded-[var(--kizuna-radius)] border border-line bg-surface px-3 py-2 text-sm text-dim transition-colors hover:border-line hover:text-fg"
    >
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4" />
        <span className="text-[13px]">Search</span>
      </div>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-line bg-base px-1.5 font-mono text-[10px] font-medium text-muted opacity-100">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  )
}
