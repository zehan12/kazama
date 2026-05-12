import type { BundledLanguage } from 'shiki'
import { codeToHtml } from 'shiki'
import { cn } from '@/lib/cn'

interface CodeBlockProps {
  code: string
  lang?: BundledLanguage
  filename?: string
  className?: string
  theme?: string
}

export async function CodeBlock({
  code,
  lang = 'tsx',
  filename,
  className,
  theme,
}: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), theme ? {
    lang,
    theme,
  } : {
    lang,
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    defaultColor: false,
  })

  return (
    <div className={className}>
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-line bg-raised">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <span className="w-2 h-2 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs font-mono text-dim ml-2">{filename}</span>
        </div>
      )}
      <div
        className={cn(
          "[&_pre]:!bg-transparent [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-[12px] [&_pre]:leading-[1.7] md:[&_pre]:overflow-x-hidden md:[&_pre]:whitespace-pre-wrap md:[&_pre]:break-words md:[&_pre]:text-[13px] [&_code]:font-mono",
          !theme && "shiki-dual-theme"
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
