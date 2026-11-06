'use client'

import { useEffect, useRef } from 'react'
import { Ban, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type ConsoleLine = {
  type: 'command' | 'info' | 'log' | 'success' | 'error' | 'summary'
  text: string
}

const LINE_CLASS: Record<ConsoleLine['type'], string> = {
  command: 'text-foreground',
  info: 'text-muted-foreground',
  log: 'text-foreground/90',
  success: 'text-success',
  error: 'text-destructive',
  summary: 'text-warning',
}

export function OutputConsole({ lines, onClear }: { lines: ConsoleLine[]; onClear: () => void }) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' })
  }, [lines])

  return (
    <div className="flex h-56 shrink-0 flex-col border-t border-border bg-editor-chrome">
      <div className="flex items-center justify-between border-b border-border px-3">
        <span className="flex items-center gap-2 border-b-2 border-primary py-1.5 text-[11px] font-medium uppercase tracking-widest">
          <Terminal className="size-3.5" aria-hidden="true" />
          Consola
        </span>
        <Button variant="ghost" size="icon-sm" onClick={onClear} aria-label="Limpiar consola">
          <Ban aria-hidden="true" />
        </Button>
      </div>
      <div
        role="log"
        aria-live="polite"
        aria-label="Resultados de la ejecución"
        className="flex-1 overflow-y-auto px-3 py-2 font-mono text-xs leading-5"
      >
        {lines.map((line, index) => (
          <div key={index} className={cn('whitespace-pre-wrap break-words', LINE_CLASS[line.type])}>
            {line.type === 'command' && <span className="text-primary">{'$ '}</span>}
            {line.type === 'log' && <span className="text-muted-foreground">{'> '}</span>}
            {line.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  )
}
