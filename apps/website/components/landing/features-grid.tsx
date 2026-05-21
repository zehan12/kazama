import { Database, Link2, CloudDownload, Zap, Package2, ShieldCheck } from 'lucide-react'

const features = [
  {
    icon: Database,
    title: 'Global Store',
    description: 'Fast, immutable global state powered by Immer.js and React 18\'s native useSyncExternalStore.',
  },
  {
    icon: Link2,
    title: 'URL State Management',
    description: 'Type-safe URL query parameters seamlessly synced with component state using the useQueryState hook.',
  },
  {
    icon: CloudDownload,
    title: 'API & Request Client',
    description: 'Powerful data fetching hooks with automatic caching, request deduplication, and loading states.',
  },
  {
    icon: Zap,
    title: 'Granular Re-renders',
    description: 'Deeply optimized performance out-of-the-box. Components only re-render when their exact subscriptions change.',
  },
  {
    icon: Package2,
    title: 'Zero Redux Boilerplate',
    description: 'Enjoy Redux DevTools support and predictable state flows without the verbose action creators or dispatch types.',
  },
  {
    icon: ShieldCheck,
    title: 'End-to-End Type Safety',
    description: '100% written in TypeScript. Models, URL parsers, and API responses are strictly typed and fully inferred.',
  },
]

export function FeaturesGrid() {
  return (
    <section className="w-full border-b border-line">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 sm:py-16">
        <div className="overflow-hidden rounded-[var(--kazama-radius)] border border-line bg-surface">
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
