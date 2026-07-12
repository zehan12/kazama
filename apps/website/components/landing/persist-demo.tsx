"use client";

import { useModel } from "@/lib/store";
import { useState, useEffect } from "react";
import { Moon, Sun, Bell, BellOff } from "lucide-react";

export function PersistDemoUI() {
  const [state, dispatchers] = useModel('settings');
  const [localStorageValue, setLocalStorageValue] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Poll localStorage to display its raw contents
  useEffect(() => {
    const checkStorage = () => {
      const val = window.localStorage.getItem('react-store-demo');
      if (val) {
        try {
          const parsed = JSON.parse(val);
          setLocalStorageValue(JSON.stringify(parsed, null, 2));
        } catch {
          setLocalStorageValue(val);
        }
      } else {
        setLocalStorageValue('null');
      }
    };

    checkStorage();
    const interval = setInterval(checkStorage, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full items-start">
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <p className="text-sm font-medium text-dim">Store State</p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => dispatchers.toggleTheme()}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-line rounded-lg text-sm font-medium text-fg hover:bg-raised transition-colors flex-1 justify-center"
          >
            {!mounted || state.theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
            <span>Theme: {!mounted ? 'dark' : state.theme}</span>
          </button>
          <button 
            onClick={() => dispatchers.toggleNotifications()}
            className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-line rounded-lg text-sm font-medium text-fg hover:bg-raised transition-colors flex-1 justify-center"
          >
            {!mounted || state.notifications ? <Bell size={16} /> : <BellOff size={16} />}
            <span>Alerts: {!mounted ? 'On' : state.notifications ? 'On' : 'Off'}</span>
          </button>
        </div>
        <p className="text-xs text-muted leading-relaxed mt-2">
          Interact with the UI. The state changes are automatically serialized and saved to localStorage because it's in the allowlist.
        </p>
      </div>

      <div className="w-full md:w-1/2 bg-surface border border-line rounded-[var(--kazama-radius)] overflow-hidden relative shadow-inner">
        <div className="px-4 py-2.5 border-b border-line bg-raised flex justify-between items-center">
          <span className="text-[11px] font-mono text-dim tracking-wider">localStorage</span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28c840] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#28c840]"></span>
            </span>
            <span className="text-[10px] uppercase font-bold text-[#28c840] tracking-widest">Live</span>
          </div>
        </div>
        <div className="p-4 overflow-x-auto text-[13px] font-mono text-fg whitespace-pre min-h-[140px] leading-relaxed">
          {localStorageValue || 'Waiting...'}
        </div>
      </div>
    </div>
  );
}
