'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { docsNav } from '@/components/docs/docs-content'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function DocsPager() {
  const pathname = usePathname()

  // Flatten the navigation tree
  const flatNav = docsNav.flatMap(section => 
    section.items.map(item => ({ ...item, section: section.title }))
  )

  // Normalize pathname to prevent trailing slash mismatch
  const normalizedPath = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname

  const currentIndex = flatNav.findIndex(item => item.href === normalizedPath)

  if (currentIndex === -1) {
    return null
  }

  const prev = currentIndex > 0 ? flatNav[currentIndex - 1] : null
  const next = currentIndex < flatNav.length - 1 ? flatNav[currentIndex + 1] : null

  return (
    <div className="mt-16 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
      {prev && (
        <Link 
          href={prev.href}
          className="flex-1 w-full rounded-xl border border-line bg-surface/30 p-4 transition-colors hover:bg-surface/60 group"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-fg">
              <ChevronLeft className="h-4 w-4 text-muted transition-transform group-hover:-translate-x-1" />
              <span>{prev.label}</span>
            </div>
            {prev.description && (
              <p className="text-sm text-muted line-clamp-1 truncate ml-5.5">
                {prev.description}
              </p>
            )}
          </div>
        </Link>
      )}
      
      {next && (
        <Link 
          href={next.href}
          className="flex-1 w-full rounded-xl border border-line bg-surface/30 p-4 transition-colors hover:bg-surface/60 group text-right"
        >
          <div className="flex flex-col space-y-2 items-end">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-fg">
              <span>{next.label}</span>
              <ChevronRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-1" />
            </div>
            {next.description && (
              <p className="text-sm text-muted line-clamp-1 truncate mr-5.5">
                {next.description}
              </p>
            )}
          </div>
        </Link>
      )}
    </div>
  )
}
