import { cn } from "@/lib/cn"
import React from "react"

interface ApiTableProps {
  children: React.ReactNode
}

export function ApiTable({ children }: ApiTableProps) {
  return (
    <div className="w-full border border-white/10 bg-[#0a0a0a] rounded-2xl overflow-hidden my-8">
      <div className="grid grid-cols-[minmax(200px,2fr)_4fr_minmax(100px,1fr)] items-center px-6 py-4 border-b border-white/10">
        <div className="text-[13px] font-mono text-[#888]">prop</div>
        <div className="text-[13px] font-mono text-[#888]">type <span className="mx-2 opacity-40">·</span> description</div>
        <div className="text-[13px] font-mono text-[#888] text-right">default</div>
      </div>
      <div className="flex flex-col">
        {children}
      </div>
    </div>
  )
}

interface ApiRowProps {
  prop: string
  type: string
  description: React.ReactNode
  defaultValue?: string
  required?: boolean
}

export function ApiRow({ prop, type, description, defaultValue = "-", required }: ApiRowProps) {
  return (
    <div className="grid grid-cols-[minmax(200px,2fr)_4fr_minmax(100px,1fr)] items-start px-6 py-5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
      <div className="flex items-center gap-2 pr-4 pt-0.5">
        <code className="text-[10px] px-2 py-0.5 bg-transparent border border-white/10 rounded-full text-[#e5e5e5] whitespace-nowrap">
          {prop}
        </code>
        {required && (
          <span className="text-[10px] font-mono text-red-500/80 tracking-wider">Required</span>
        )}
      </div>
      <div className="flex flex-col pr-4">
        <div className="text-[11px] font-mono text-[#888] mb-1.5 break-all">{type}</div>
        <div className="text-[12px] text-[#a1a1aa] leading-relaxed">{description}</div>
      </div>
      <div className="flex justify-end pt-0.5">
        <code className="text-[12px] font-mono text-[#888] text-right">
          {defaultValue}
        </code>
      </div>
    </div>
  )
}
