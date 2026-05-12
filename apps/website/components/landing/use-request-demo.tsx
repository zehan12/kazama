'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function UseRequestDemoUI() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  
  const handleRequest = () => {
    setLoading(true)
    setTimeout(() => {
      setData({ id: 42, title: 'Learn React Store', completed: false })
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col text-left bg-base border border-line rounded-[var(--hiraki-radius)] overflow-hidden w-full shadow-sm">
      <div className="flex justify-between items-center p-5 border-b border-line bg-surface/30">
        <h3 className="text-base font-semibold text-fg font-mono">
          useRequest Hook
        </h3>
        <Button size="sm" onClick={handleRequest} disabled={loading}>
          {loading ? 'Requesting...' : 'Fire Request'}
        </Button>
      </div>
      
      <div className="flex flex-col p-6">
        <div className="flex flex-col gap-4 p-5 bg-surface rounded-md border border-line">
          <div className="flex justify-between items-center pb-4 border-b border-line">
            <span className="text-sm font-mono text-dim">Request State</span>
            <span className="text-sm font-mono font-medium">
              {loading ? (
                <span className="text-[#febc2e]">loading: true</span>
              ) : data ? (
                <span className="text-[#28c840]">loading: false (Success)</span>
              ) : (
                <span className="text-dim">Idle</span>
              )}
            </span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm font-mono text-dim mb-2">Data</span>
            {loading && !data ? (
               <div className="h-20 w-full animate-pulse bg-line/50 rounded-md"></div>
            ) : data ? (
              <pre className="text-sm font-mono bg-[#0d0d0d] p-4 rounded-xl text-[#86efac] overflow-x-auto border border-line/40">
                {JSON.stringify(data, null, 2)}
              </pre>
            ) : (
               <div className="h-20 w-full border border-dashed border-line/50 rounded-md flex items-center justify-center">
                 <span className="text-dim text-sm">Click 'Fire Request' to load data</span>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
