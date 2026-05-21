"use client"
import { HeroDemo } from '@/components/landing/hero-demo'
import { PackageManager } from '@/components/ui/package-manager'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Preact, React, NextJs, RemixLight, RemixDark, ViteJS, ReactRouter } from 'developer-icons'
import FrameworkSupport from './FrameworkSupport'
import { Volume2 } from 'lucide-react'

export function Hero() {
  const playPronunciation = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('風間');
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="w-full border-b border-line">
      <div className="max-w-4xl mx-auto px-4 py-14 sm:px-6 sm:py-20 md:py-28">
        <div className="mb-10 flex justify-end">
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-fg leading-[1]">
            kazama
          </h1>
          <button
            onClick={playPronunciation}
            className="p-2 md:p-3 rounded-full hover:bg-line/50 text-dim hover:text-fg transition-colors"
            aria-label="Play pronunciation"
            title="Play pronunciation"
          >
            <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
        <p className="text-xl sm:text-2xl md:text-3xl font-light text-dim mb-1 font-sans">
          風間
        </p>
        <p className="text-sm text-dim font-mono mb-8">
          Japanese · surname · &quot;between the winds&quot; · &quot;place of the wind&quot;
        </p>

        <p className="font-medium text-fg mb-4">
          Fast 3.8kB alternative to Redux with the same modern API.
        </p>

        <p className="text-muted max-w-xl mb-10 leading-relaxed">
          A high-performance React ecosystem for all your state needs. Includes a fast, immutable global store, type-safe URL state management, and a powerful request client for data fetching.
        </p>

        <p className="text-sm text-dim max-w-2xl mb-8 leading-relaxed">
          Powered by useSyncExternalStore and Immer for predictable updates. Features include time-travel debugging, granular re-renders, auto-tracking for async effects, and end-to-end TypeScript support.
        </p>

        <FrameworkSupport />
        <HeroDemo />
        <PackageManager className="w-full sm:max-w-[450px]" />
      </div>
    </section>
  )
}
