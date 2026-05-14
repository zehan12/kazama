'use client'

import { Button } from '@/components/ui/button'
import { useLoader } from '@musubi/core'

function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'Alice Engineering', role: 'Staff Software Engineer' })
    }, 1200)
  })
}

export function RequestDemoUI() {
  const { data, isLoading, refetch, isFetching } = useLoader({
    key: ['demo-user', '1'],
    loader: fetchUser,
    revalidateOnFocus: false, // disable for demo so it doesn't spin wildly when typing
  });

  return (
    <div className="flex flex-col text-left bg-base border border-line rounded-[var(--musubi-radius)] overflow-hidden w-full shadow-sm">
      <div className="flex justify-between items-center p-5 border-b border-line bg-surface/30">
        <h3 className="text-base font-semibold text-fg font-mono">
          Data Fetching
        </h3>
        <Button size="sm" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Fetching...' : 'Refetch'}
        </Button>
      </div>
      
      <div className="flex flex-col p-6">
        <div className="flex flex-col gap-4 p-5 bg-surface rounded-md border border-line">
          <div className="flex justify-between items-center pb-4 border-b border-line">
            <span className="text-sm font-mono text-dim">Cache Status</span>
            <span className="text-sm font-mono font-medium">
              {isFetching ? (
                <span className="text-[#febc2e]">revalidating...</span>
              ) : (
                <span className="text-[#28c840]">stale-while-revalidate (idle)</span>
              )}
            </span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm font-mono text-dim mb-2">Response Data</span>
            {isLoading && !data ? (
               <div className="h-20 w-full animate-pulse bg-line/50 rounded-md"></div>
            ) : (
              <pre className="text-sm font-mono bg-[#0d0d0d] p-4 rounded-xl text-[#86efac] overflow-x-auto border border-line/40">
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
