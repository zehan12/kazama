import Link from 'next/link'
import { ArrowLeft, Languages, ChevronDown } from 'lucide-react'
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

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 lg:gap-4 lg:pl-8">
            <div className="lg:hidden w-48">
              <DocsSearch />
            </div>

            <div className="flex items-center gap-4">
              <div className="h-5 w-px bg-line hidden sm:block" />
              
              <button className="hidden sm:flex items-center gap-1.5 text-muted hover:text-fg transition-colors">
                <Languages className="w-[18px] h-[18px]" />
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              
              <div className="h-5 w-px bg-line hidden sm:block" />
              
              <ThemeToggle />
              
              <div className="h-5 w-px bg-line hidden sm:block" />
              
              <a 
                href="https://github.com/zehan12/kazama" 
                target="_blank" 
                rel="noreferrer"
                className="text-muted hover:text-fg transition-colors hidden sm:block"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
