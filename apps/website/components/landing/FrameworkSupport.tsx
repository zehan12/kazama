"use client"
import { NextJs, Preact, React, RemixDark, RemixLight, ReactRouter } from 'developer-icons'
import { useTheme } from 'next-themes'
import { Activity } from 'react'

export default function FrameworkSupport() {

    const { resolvedTheme } = useTheme()
    return (
        <section>
            <div className="mt-12 mb-8">
                <p className="text-xs font-mono text-dim mb-4 uppercase tracking-wider">Works seamlessly with</p>
                <div className="flex items-center gap-6 duration-300">
                    <React className="w-8 h-8" />
                    <NextJs className="w-8 h-8" />
                    <Activity mode={resolvedTheme === "dark" ? "visible" : "hidden"}>
                        <RemixLight className="w-6 h-6 " />
                    </Activity>
                    <Activity mode={resolvedTheme === "dark" ? "hidden" : "visible"}>
                        <RemixDark className="w-6 h-6 " />
                    </Activity>
                    <img src="vite.svg" alt="vite" className="w-6 h-6" />
                    <Preact className="w-8 h-8" />
                    <img src="https://nuqs.dev/tanstack-logo.png" alt="TanStack" className="w-8 h-8 object-contain" />
                    <ReactRouter className="w-8 h-8" />
                </div>
            </div>
        </section>
    )
}