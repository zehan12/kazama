'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import store, { useModel, useModelEffectsState } from '@/lib/store'

export function UserProfileDemo() {
  const [state, dispatchers] = useModel('user');
  const { getUserInfo } = useModelEffectsState('user');

  return (
    <div className={cn(
      'flex flex-col text-left bg-base border border-line rounded-[var(--musubi-radius)] overflow-hidden',
      'w-full shadow-sm flex flex-col'
    )}>
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b border-line bg-surface/30">
        <h3 className="text-base font-semibold text-fg font-mono">
          User Profile
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => dispatchers.reset()} disabled={getUserInfo.isLoading || state.id === '000'}>
            Reset
          </Button>
          <Button size="sm" onClick={() => dispatchers.getUserInfo()} disabled={getUserInfo.isLoading}>
            {getUserInfo.isLoading ? 'Fetching...' : 'Fetch User'}
          </Button>
        </div>
      </div>
      
      {/* Body */}
      <div className="flex flex-col p-6">
        <div className="flex flex-col gap-4 p-5 bg-surface rounded-md border border-line">
          <div className="flex justify-between items-center pb-4 border-b border-line">
            <span className="text-sm font-mono text-dim">Status (Auto-tracked)</span>
            <span className="text-sm font-mono font-medium">
              {getUserInfo.isLoading ? (
                <span className="text-[#febc2e]">isLoading: true</span>
              ) : getUserInfo.error ? (
                <span className="text-[#ff5f57]">error: {String(getUserInfo.error.message || 'Error')}</span>
              ) : (
                <span className="text-[#28c840]">Idle</span>
              )}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-mono text-dim">Username</span>
            <span className="text-base font-mono text-fg font-medium">{state.username}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-mono text-dim">ID</span>
            <span className="text-base font-mono text-fg">{state.id}</span>
          </div>
        </div>
      </div>

      {/* Footer - Time Travel */}
      <div className="mt-auto flex justify-between items-center p-4 border-t border-line bg-surface/30">
        <span className="text-sm font-mono text-dim">Time Travel Debugging</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => store.undo()}>
            Undo
          </Button>
          <Button variant="outline" size="sm" onClick={() => store.redo()}>
            Redo
          </Button>
        </div>
      </div>
    </div>
  )
}
