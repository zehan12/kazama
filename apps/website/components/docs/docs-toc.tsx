'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

interface TocItem {
  id: string
  text: string
  level: number
}

export function DocsToc() {
  const pathname = usePathname()
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let handleScroll: () => void

    // Generate TOC from h2 tags in the DOM
    const generateToc = () => {
      const headings = Array.from(document.querySelectorAll('h2'))
      const newItems = headings.map((heading) => {
        if (!heading.id) {
          heading.id = heading.innerText.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        }
        return {
          id: heading.id,
          text: heading.innerText,
          level: 2,
        }
      })
      setItems(newItems)

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id)
            }
          })
        },
        { 
          rootMargin: '-80px 0px -80% 0px' 
        }
      )

      headings.forEach((heading) => observer?.observe(heading))

      // Fallback for the last item if page is too short to scroll it into the intersection zone
      handleScroll = () => {
        if (window.innerHeight + Math.ceil(window.scrollY) >= document.documentElement.scrollHeight - 10) {
          if (newItems.length > 0) {
            setActiveId(newItems[newItems.length - 1].id)
          }
        }
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    // Small delay to ensure content is fully mounted
    const timeout = setTimeout(() => {
      generateToc()
    }, 100)

    return () => {
      clearTimeout(timeout)
      if (observer) observer.disconnect()
      if (handleScroll) window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  if (items.length === 0) return null

  return (
    <div className="space-y-4">
      <p className="text-[11px] font-bold tracking-wider text-fg uppercase">On this page</p>
      <ul className="space-y-2.5 text-[13px] text-muted border-l border-line/50">
        {items.map((item) => (
          <li key={item.id} className="relative">
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                const target = document.getElementById(item.id)
                
                if (target) {
                  const offset = 80 // 64px header + padding
                  const elementPosition = target.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.scrollY - offset
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                }
                
                setActiveId(item.id)
                history.pushState(null, '', `#${item.id}`)
              }}
              className={cn(
                'transition-colors hover:text-fg line-clamp-2 block pl-4 font-medium',
                activeId === item.id ? 'text-green' : ''
              )}
            >
              {activeId === item.id && (
                <span className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-green rounded-r-full" />
              )}
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
