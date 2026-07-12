import React from 'react';
import { cn } from '@/lib/cn';

interface JsonViewerProps {
  data: any;
  className?: string;
}

export function JsonViewer({ data, className }: JsonViewerProps) {
  const highlightJson = (input: any) => {
    let json = input;
    if (typeof json === 'string') {
      try {
        const parsed = JSON.parse(json);
        json = JSON.stringify(parsed, undefined, 2);
      } catch (e) {
        // if not valid JSON, leave as string
      }
    } else {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match: string) {
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          const key = match.replace(/:$/, '');
          return `<span class="text-[var(--syntax-property)]">${key}</span><span class="text-[var(--syntax-punctuation)]">:</span>`;
        } else {
          return `<span class="text-[var(--syntax-string)]">${match}</span>`;
        }
      } else if (/true|false/.test(match)) {
        return `<span class="text-[var(--syntax-property)]">${match}</span>`; 
      } else if (/null/.test(match)) {
        return `<span class="text-[var(--syntax-operator)]">${match}</span>`;
      }
      return `<span class="text-[var(--syntax-number)]">${match}</span>`;
    });
  };

  return (
    <pre
      className={cn("text-[13px] font-mono text-[var(--syntax-plain)] whitespace-pre", className)}
      dangerouslySetInnerHTML={{ __html: highlightJson(data) }}
    />
  );
}
