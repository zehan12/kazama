import { HeroDemo } from '@/components/landing/hero-demo'
import { PackageManager } from '@/components/ui/package-manager'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Hero() {
  return (
    <section className="w-full border-b border-line">
      <div className="max-w-4xl mx-auto px-4 py-14 sm:px-6 sm:py-20 md:py-28">
        <div className="mb-10 flex justify-end">
          <ThemeToggle />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-fg leading-[1] mb-2">
          react-store
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-dim mb-1 font-sans">
          Fast, immutable state
        </p>
        <p className="text-sm text-dim font-mono mb-8">
          Lightweight · hook-based · zero boilerplate
        </p>

        <p className="text-base text-muted max-w-xl mb-10 leading-relaxed">
          A high-performance React store component modeled after the Ice.js store. 
          Powered by useSyncExternalStore and Immer for predictable, immutable updates 
          without the boilerplate of Redux.
        </p>

        <p className="text-sm text-dim max-w-2xl mb-8 leading-relaxed">
          Full support for time-travel debugging via Redux DevTools. Auto-tracking for 
          async effects, granular re-renders, and full TypeScript support out of the box.
        </p>

        <HeroDemo />

        <PackageManager className="w-full sm:max-w-[450px]" />
      </div>
    </section>
  )
}
