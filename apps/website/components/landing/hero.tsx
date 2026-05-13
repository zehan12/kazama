"use client"
import { HeroDemo } from '@/components/landing/hero-demo'
import { PackageManager } from '@/components/ui/package-manager'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Preact, React, NextJs, RemixLight, RemixDark, ViteJS, ReactRouter } from 'developer-icons'
import FrameworkSupport from './FrameworkSupport'

export function Hero() {
  return (
    <section className="w-full border-b border-line">
      <div className="max-w-4xl mx-auto px-4 py-14 sm:px-6 sm:py-20 md:py-28">
        <div className="mb-10 flex justify-end">
          <ThemeToggle />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-fg leading-[1] mb-2">
          musubi
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-dim mb-1 font-sans">
          結び
        </p>
        <p className="text-sm text-dim font-mono mb-8">
          Japanese · noun · &quot;connection&quot; · &quot;bringing together&quot;
        </p>

        <p className="font-medium text-fg mb-4">
          Fast 3.8kB alternative to Redux with the same modern API.
        </p>

        <p className="text-muted max-w-xl mb-10 leading-relaxed">
          A high-performance React ecosystem for all your state needs. Includes a fast, immutable global store, type-safe URL state management, and a powerful request client for data fetching.
        </p>

        <p className="text-sm text-dim max-w-2xl mb-8 leading-relaxed">
          Powered by useSyncExternalStore and Immer for predictable updates. Features include time-travel debugging, granular re-renders, auto-tracking for async effects, and end-to-end TypeScript support.
        </p>

        <FrameworkSupport />
        <HeroDemo />
        <PackageManager className="w-full sm:max-w-[450px]" />
      </div>
    </section>
  )
}
