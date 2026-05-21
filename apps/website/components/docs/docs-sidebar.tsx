'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { docsNav } from '@/components/docs/docs-content'
import { cn } from '@/lib/cn'
import { ExternalLink } from 'lucide-react'

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full">
      {/* Header section matching the image */}
      <div className="flex flex-col gap-2 mb-4 mt-3">
        <span className="text-[13px] text-muted">kazama</span>
        <h2 className="text-xl font-semibold text-fg">Documentation</h2>
        <p className="text-[14px] text-muted mt-1 leading-relaxed">
          The modern, all-in-one state and API management library for React.
          Zero boilerplate, 100% type-safe.
        </p>
      </div>

      <div className="h-px bg-line w-full my-2" />
      <nav className="flex flex-col gap-6 pt-1">
        {docsNav.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <h4 className="text-[11px] font-bold tracking-wider text-fg uppercase">
              {section.title}
            </h4>
            <div className="flex flex-col gap-1.5">
              {section.items.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-[14px] font-medium transition-colors',
                      active
                        ? 'text-green'
                        : 'text-muted hover:text-fg'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="h-px bg-line w-full my-2" />
      {/* Footer Links */}
      <div className="flex flex-col gap-1 py-4">
        <a
          href="https://github.com/react-store/core"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-[14px] font-medium text-muted hover:text-fg px-3 py-2 rounded-md hover:bg-line/50 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          GitHub
        </a>
        <a
          href="https://npmjs.com/package/kazama"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-[14px] font-medium text-muted hover:text-fg px-3 py-2 rounded-md hover:bg-line/50 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          npm package
        </a>
      </div>
    </div>
  )
}
