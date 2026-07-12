"use client";

import { useState } from 'react';
import { cn } from '@/lib/cn';

interface StoreCodeTabsProps {
  storeTab: React.ReactNode;
  appTab: React.ReactNode;
}

export function StoreCodeTabs({ storeTab, appTab }: StoreCodeTabsProps) {
  const [activeTab, setActiveTab] = useState<'store' | 'app'>('store');

  return (
    <div className="w-full overflow-hidden border border-line bg-surface rounded-[var(--kazama-radius)] relative mt-2 flex flex-col">
      <div className="flex items-center gap-4 px-4 pt-3 pb-0 border-b border-line bg-raised">
        <button
          onClick={() => setActiveTab('store')}
          className={cn(
            "text-xs font-mono pb-2 border-b-2 transition-colors",
            activeTab === 'store' ? "text-fg border-[#28c840]" : "text-dim border-transparent hover:text-muted"
          )}
        >
          store.ts
        </button>
        <button
          onClick={() => setActiveTab('app')}
          className={cn(
            "text-xs font-mono pb-2 border-b-2 transition-colors",
            activeTab === 'app' ? "text-fg border-[#28c840]" : "text-dim border-transparent hover:text-muted"
          )}
        >
          App.tsx
        </button>
      </div>
      <div className="relative">
        {activeTab === 'store' ? storeTab : appTab}
        <button className="absolute top-4 right-4 text-dim hover:text-fg transition-colors cursor-pointer bg-transparent border-none p-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        </button>
      </div>
    </div>
  );
}
