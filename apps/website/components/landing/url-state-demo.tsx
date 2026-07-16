'use client'

import { useQueryState, parseAsInteger, parseAsString } from 'kazama-core';

export function URLStateDemoUI() {
  const [hello, setHello] = useQueryState("hello", parseAsString.withDefault(""));
  const [count, setCount] = useQueryState("count", parseAsInteger.withDefault(0));

  return (
    <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
      <button
        onClick={() => setCount((c) => c + 1)}
        className="h-10 px-4 bg-fg text-base rounded-md font-medium text-sm transition-opacity hover:opacity-90 shrink-0"
      >
        Count: {count}
      </button>

      <input
        value={hello}
        placeholder="Enter your name"
        onChange={(e) => setHello(e.target.value || '')}
        className="h-10 px-3 bg-surface border border-line rounded-md text-sm text-fg placeholder:text-dim focus:outline-none focus:border-fg/30 transition-colors w-full sm:w-56"
      />

      <p className="text-fg text-base whitespace-nowrap">
        Hello, {hello || "anonymous visitor"}!
      </p>
    </div>
  );
}
