'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import store from '@/lib/store'

export function LiveDemo() {
  const [state, dispatchers] = store.useModel('user');
  const { getUserInfo } = store.useModelEffectsState('user');

  return (
    <section className="w-full border-b border-line bg-surface/50">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 text-center flex flex-col items-center">
        <p className="text-xs font-mono text-dim mb-2">interactive</p>
        <h2 className="text-2xl font-bold text-fg mb-4">See it in Action</h2>
        <p className="text-sm text-muted max-w-lg mx-auto mb-12 leading-relaxed">
          Experience the automatic async effect tracking. Click the button below to trigger the <code className="font-mono text-xs bg-raised px-1.5 py-0.5 border border-line">getUserInfo()</code> API fetch and watch the store handle the loading state automatically.
        </p>

        <div className={cn(
          'flex flex-col text-left bg-base border border-line rounded-[var(--hiraki-radius)] overflow-hidden',
          'w-full max-w-lg shadow-sm'
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
          <div className="flex justify-between items-center p-4 border-t border-line bg-surface/30">
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
      </div>
    </section>
  )
}
