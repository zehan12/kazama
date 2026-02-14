import { ArrowLeftRight, Zap, Magnet, Package2, Eye, Sparkles } from 'lucide-react'

const features = [
  {
    icon: ArrowLeftRight,
    title: 'useSyncExternalStore',
    description: 'Powered by React 18\'s native state synchronization hook for tear-free, concurrent-safe renders.',
  },
  {
    icon: Zap,
    title: 'Granular Re-renders',
    description: 'Component re-renders are deeply optimized out-of-the-box. Subscribe to only what you need.',
  },
  {
    icon: Magnet,
    title: 'Immer Integration',
    description: 'Write mutative state logic using Immer.js. No more deeply nested object spreads.',
  },
  {
    icon: Package2,
    title: 'Zero Redux Boilerplate',
    description: 'Enjoy Redux DevTools and predictable state flows without the verbose action creators and dispatch types.',
  },
  {
    icon: Eye,
    title: 'Async Trackers',
    description: 'Async effects automatically track their loading and error states. Access them instantly with useModelEffectsState.',
  },
  {
    icon: Sparkles,
    title: 'TypeScript Native',
    description: 'End-to-end type safety. State, reducers, and effects are fully inferred by the compiler.',
  },
]

export function FeaturesGrid() {
  return (
    <section className="w-full border-b border-line">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 sm:py-16">
        <div className="overflow-hidden rounded-[var(--hiraki-radius)] border border-line bg-surface">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="border-b border-r border-line p-6 last:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <Icon className="w-4 h-4 text-dim mb-4" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-fg mb-2 font-mono">{f.title}</p>
                <p className="text-xs text-dim leading-relaxed">{f.description}</p>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    </section>
  )
}
