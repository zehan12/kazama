"use client"
import { HeroDemo } from '@/components/landing/hero-demo'
import { PackageManager } from '@/components/ui/package-manager'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Preact, React, NextJs, RemixLight, RemixDark, ViteJS, ReactRouter } from 'developer-icons'

export function Hero() {
  return (
    <section className="w-full border-b border-line">
      <div className="max-w-4xl mx-auto px-4 py-14 sm:px-6 sm:py-20 md:py-28">
        <div className="mb-10 flex justify-end">
          <ThemeToggle />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-fg leading-[1] mb-2">
          React State Toolkit
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-dim mb-1 font-sans">
          State, URL, and API management
        </p>
        <p className="text-sm text-dim font-mono mb-6">
          Lightweight · modular · zero boilerplate
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

        <div className="mt-12 mb-8">
          <p className="text-xs font-mono text-dim mb-4 uppercase tracking-wider">Works seamlessly with</p>
          <div className="flex items-center gap-6 duration-300">
            <React className="w-8 h-8" />
            <NextJs className="w-8 h-8" />
            <RemixLight className="w-6 h-6 hidden dark:block" />
            <RemixDark className="w-6 h-6 block dark:hidden" />
            <img src="vite.svg" alt="vite" className="w-6 h-6" />
            <Preact className="w-8 h-8" />
            <img src="https://nuqs.dev/tanstack-logo.png" alt="TanStack" className="w-8 h-8 object-contain" />
            <ReactRouter className="w-8 h-8" />
          </div>
        </div>

        <HeroDemo />
        <PackageManager className="w-full sm:max-w-[450px]" />
      </div>
    </section>
  )
}
