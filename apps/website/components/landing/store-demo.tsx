'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import store, { useModel, useModelEffectsState } from '@/lib/store'
import { useState } from 'react'

export function GlobalStoreDemoUI() {
  const [state, dispatchers] = useModel('todos');
  const { sync } = useModelEffectsState('todos');
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    dispatchers.add(inputValue);
    setInputValue('');
  };

  const filteredItems = state.items.filter((item: any) => {
    if (state.filter === 'active') return !item.done;
    if (state.filter === 'completed') return item.done;
    return true;
  });

  const activeCount = state.items.filter((i: any) => !i.done).length;

  return (
    <div className={cn(
      'flex flex-col text-left bg-base border border-line rounded-[var(--musubi-radius)] overflow-hidden',
      'w-full shadow-sm flex flex-col'
    )}>
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b border-line bg-surface/30">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-fg font-mono">
            Task Board
          </h3>
          <span className="text-xs text-dim font-mono">
            {activeCount} active {activeCount === 1 ? 'task' : 'tasks'} remaining
          </span>
        </div>
        <Button size="sm" onClick={() => dispatchers.sync()} disabled={sync?.isLoading}>
          {sync?.isLoading ? 'Syncing to Cloud...' : 'Sync Data'}
        </Button>
      </div>
      
      {/* Body */}
      <div className="flex flex-col p-6 gap-5 bg-surface/10">
        
        {/* Input Form */}
        <form onSubmit={handleAdd} className="flex gap-2">
          <input 
            type="text" 
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="flex-grow px-3 py-2 bg-base border border-line rounded-md text-sm font-mono focus:outline-none focus:border-fg/50 transition-colors"
          />
          <Button type="submit" size="sm" disabled={!inputValue.trim()}>Add Task</Button>
        </form>

        {/* Filter Controls */}
        <div className="flex gap-2 pb-2 border-b border-line">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => dispatchers.setFilter(f)}
              className={cn(
                "px-3 py-1 text-xs font-mono rounded-full capitalize transition-colors border",
                state.filter === f 
                  ? "bg-fg text-base border-fg" 
                  : "bg-transparent text-dim border-line hover:text-fg hover:border-fg/30"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="flex flex-col gap-2 min-h-[160px]">
          {filteredItems.length === 0 ? (
             <div className="flex-grow flex items-center justify-center border border-dashed border-line/50 rounded-md">
               <span className="text-sm font-mono text-dim">No tasks found.</span>
             </div>
          ) : (
            filteredItems.map((item: any) => (
              <div 
                key={item.id} 
                className="group flex items-center gap-3 p-3 bg-surface rounded-md border border-line hover:border-fg/20 transition-colors"
              >
                <div 
                  onClick={() => dispatchers.toggle(item.id)}
                  className={cn(
                    "w-5 h-5 rounded flex items-center justify-center border transition-colors cursor-pointer flex-shrink-0",
                    item.done ? "bg-[#28c840] border-[#28c840]" : "border-line bg-transparent hover:border-fg/50"
                  )}
                >
                  {item.done && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  )}
                </div>
                
                <span 
                  onClick={() => dispatchers.toggle(item.id)}
                  className={cn(
                    "text-sm font-mono transition-all flex-grow cursor-pointer",
                    item.done ? "text-dim line-through" : "text-fg"
                  )}
                >
                  {item.text}
                </span>

                <button 
                  onClick={() => dispatchers.remove(item.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-dim hover:text-[#ff5f57] transition-all"
                  title="Delete task"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer - Time Travel */}
      <div className="flex justify-between items-center p-4 border-t border-line bg-surface/30">
        <span className="text-sm font-mono text-dim">Built-in Time Travel</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => store.undo()}>
            Undo Action
          </Button>
          <Button variant="outline" size="sm" onClick={() => store.redo()}>
            Redo Action
          </Button>
        </div>
      </div>
    </div>
  )
}
