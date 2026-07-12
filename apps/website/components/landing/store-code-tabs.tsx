"use client";

import { useState, ReactNode, isValidElement } from "react";
import { cn } from "@/lib/cn";
import { CopyButton } from "@/components/ui/copy-button";

interface StoreCodeTabsProps {
  storeTab: React.ReactNode;
  appTab: React.ReactNode;
}

export function StoreCodeTabs({ storeTab, appTab }: StoreCodeTabsProps) {
  const [activeTab, setActiveTab] = useState<'store' | 'app'>('store');

  return (
    <div className="w-full overflow-hidden border border-line bg-[#eff1f5] dark:bg-[#1e1e2e] rounded-[var(--kazama-radius)] relative mt-2 flex flex-col">
      <div className="flex items-center gap-4 px-4 pt-3 pb-0 border-b border-line bg-[#e6e9ef] dark:bg-[#181825]">
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
        <div className="absolute top-4 right-4">
          <CopyButton 
            text={isValidElement(activeTab === 'store' ? storeTab : appTab) ? ((activeTab === 'store' ? storeTab : appTab) as any).props.code || "" : ""} 
            className="text-dim hover:text-fg bg-base border border-line rounded-md px-2 py-1 shadow-sm" 
          />
        </div>
      </div>
    </div>
  );
}
