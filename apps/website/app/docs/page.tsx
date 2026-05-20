import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Overview | Kizuna',
}

export default async function DocsOverviewPage() {
  return (
    <div className="flex flex-col text-fg pt-2 pb-2">

      {/* Header Group */}
      <div className="flex flex-col gap-6 mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
          The docs should prove the developer experience, not just say it.
        </h1>

        <p className="text-[17px] text-muted leading-relaxed">
          Kizuna is for teams that want powerful state and API management without inheriting a massive boilerplate system. The library handles mutability, async tracking, suspense, and URL synchronization. Your product still owns the final logic.
        </p>
      </div>

      {/* Tags (Pills) */}
      <div className="flex flex-wrap gap-3 mb-8">
        {['zero-boilerplate', 'immer-powered', 'suspense-ready', 'type-safe'].map(tag => (
          <span
            key={tag}
            className="px-4 py-1 rounded-full border border-line text-[13px] font-mono text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col gap-3 p-5 rounded-[12px] border border-line bg-transparent">
          <h3 className="text-[15px] font-semibold text-fg">Global State</h3>
          <p className="text-[14px] text-muted leading-relaxed">
            Immer-powered mutable reducers, auto-generated dispatchers, time-travel debugging, and persistent storage all built-in.
          </p>
        </div>

        <div className="flex flex-col gap-3 p-5 rounded-[12px] border border-line bg-transparent">
          <h3 className="text-[15px] font-semibold text-fg">API Fetching</h3>
          <p className="text-[14px] text-muted leading-relaxed">
            SWR-style fetching, caching, and background revalidation through <code>useLoader</code>, plus ahooks <code>useRequest</code> integration.
          </p>
        </div>

        <div className="flex flex-col gap-3 p-5 rounded-[12px] border border-line bg-transparent">
          <h3 className="text-[15px] font-semibold text-fg">URL Sync</h3>
          <p className="text-[14px] text-muted leading-relaxed">
            Nuqs-inspired URL synchronization with type-safe parsers and intelligent microtask batching for complex query parameters.
          </p>
        </div>
      </div>

      {/* Bottom Tags */}
      <div className="flex flex-wrap gap-3">
        {['react-18', 'concurrent-safe', 'framework-agnostic', 'lightweight'].map(tag => (
          <span
            key={tag}
            className="px-4 py-1 rounded-full border border-line text-[13px] font-mono text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Next Page Pagination */}
      <div className="mt-16">
        <Link 
          href="/docs/installation" 
          className="flex flex-col items-end gap-1.5 p-5 rounded-[12px] border border-line hover:bg-line/50 transition-colors w-full"
        >
          <span className="font-semibold text-fg flex items-center gap-1">
            Installation 
            <ChevronRight className="w-4 h-4" />
          </span>
          <span className="text-[14px] text-muted">Install the package in your React framework of choice</span>
        </Link>
      </div>
    </div>
  )
}
