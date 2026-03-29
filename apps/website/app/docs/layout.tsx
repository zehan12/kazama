import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { DocsToc } from '@/components/docs/docs-toc'
import { DocsHeader } from '@/components/docs/docs-header'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-base text-fg flex flex-col">
      <DocsHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_240px]">
            <aside className="self-start pb-6 pt-8 lg:pb-0 lg:pt-0 lg:sticky lg:top-16 lg:h-[calc(100svh-4rem)] lg:overflow-y-auto lg:py-10 lg:border-r lg:border-line scrollbar-none">
              <div className="lg:pr-8">
                <DocsSidebar />
              </div>
            </aside>
            <div
              id="docs-content"
              className="min-w-0 py-10 lg:px-12 lg:py-0 scroll-smooth"
            >
              <div className="pb-4 lg:pb-6 lg:pt-10 max-w-3xl mx-auto">
                {children}
              </div>
            </div>
            <aside className="hidden xl:block self-start lg:sticky lg:top-16 lg:h-[calc(100svh-4rem)] py-10 overflow-y-auto scrollbar-none">
              <div className="pl-8">
                <DocsToc />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
