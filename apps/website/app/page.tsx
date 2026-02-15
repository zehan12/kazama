import { Hero } from '@/components/landing/hero'
import { FeaturesGrid } from '@/components/landing/features-grid'
import { CodeShowcase } from '@/components/landing/code-showcase'
import { LiveDemo } from '@/components/landing/live-demo'
import { InstallCta } from '@/components/landing/install-cta'

export default function Page() {
  return (
    <main className="min-h-svh bg-base text-fg overflow-x-hidden">
      <Hero />
      <FeaturesGrid />
      <CodeShowcase />
      <LiveDemo />
      <InstallCta />
    </main>
  )
}
