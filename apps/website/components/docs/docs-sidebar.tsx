'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { docsNav } from '@/components/docs/docs-content'
import { cn } from '@/lib/cn'

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="lg:max-h-[calc(100svh-10rem)] lg:overflow-y-auto">
      <nav className="flex flex-col gap-6 pt-10">
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
    </div>
  )
}
