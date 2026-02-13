import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { DocsSearch } from '@/components/docs/docs-search'

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-base/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center px-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-between lg:grid lg:grid-cols-[240px_minmax(0,1fr)_240px] lg:w-full">
          {/* Logo / Home */}
          <div className="flex items-center lg:pr-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          {/* Search */}
          <div className="hidden lg:flex items-center lg:px-12">
            <div className="w-full max-w-md">
              <DocsSearch />
            </div>
          </div>

          {/* Theme Toggle & Mobile Search */}
          <div className="flex items-center justify-end gap-3 lg:pl-8">
            <div className="lg:hidden w-48">
              <DocsSearch />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
