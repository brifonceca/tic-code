'use client'

import { FileCode2, Loader2, Play, RotateCcw, X } from 'lucide-react'
import { LANGUAGES, type Language } from '@/lib/curriculum'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CodeEditor } from '@/components/practice/code-editor'
import { OutputConsole, type ConsoleLine } from '@/components/practice/output-console'

type EditorPanelProps = {
  language: Language
  languages: Language[]
  code: string
  isRunning: boolean
  consoleLines: ConsoleLine[]
  onCodeChange: (value: string) => void
  onLanguageChange: (language: Language) => void
  onRun: () => void
  onReset: () => void
  onClearConsole: () => void
}

export function EditorPanel({
  language,
  languages,
  code,
  isRunning,
  consoleLines,
  onCodeChange,
  onLanguageChange,
  onRun,
  onReset,
  onClearConsole,
}: EditorPanelProps) {
  const fileName = `solucion.${LANGUAGES[language].extension}`
  const items = languages.map((item) => ({ value: item, label: LANGUAGES[item].label }))

  return (
    <section
      aria-label="Editor de código"
      className="flex h-[85dvh] shrink-0 flex-col border-t border-border bg-editor lg:h-auto lg:min-h-0 lg:border-t-0"
    >
      <div className="flex items-center justify-between gap-2 border-b border-border bg-editor-chrome px-2 py-1.5">
        <div className="flex items-center gap-2">
          <Select
            items={items}
            value={language}
            onValueChange={(value) => value && onLanguageChange(value as Language)}
          >
            <SelectTrigger size="sm" aria-label="Lenguaje de programación" className="min-w-32 font-mono text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value} className="font-mono text-xs">
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="sm" onClick={onReset} className="text-muted-foreground">
            <RotateCcw data-icon="inline-start" aria-hidden="true" />
            <span className="hidden sm:inline">Reiniciar</span>
          </Button>
        </div>
        <Button size="sm" onClick={onRun} disabled={isRunning}>
          {isRunning ? (
            <Loader2 data-icon="inline-start" className="animate-spin" aria-hidden="true" />
          ) : (
            <Play data-icon="inline-start" aria-hidden="true" />
          )}
          {isRunning ? 'Ejecutando…' : 'Ejecutar código'}
          <kbd className="ml-1 hidden rounded bg-primary-foreground/15 px-1 font-mono text-[10px] md:inline">
            Ctrl ↵
          </kbd>
        </Button>
      </div>

      <div role="tablist" aria-label="Archivos abiertos" className="flex border-b border-border bg-editor-chrome">
        <div
          role="tab"
          aria-selected="true"
          className="flex items-center gap-2 border-t-2 border-r border-t-primary border-r-border bg-editor px-4 py-2 font-mono text-xs"
        >
          <FileCode2 className="size-3.5 text-syntax-function" aria-hidden="true" />
          {fileName}
          <X className="size-3 text-muted-foreground" aria-hidden="true" />
        </div>
        <div className="flex items-center px-4 py-2 font-mono text-xs text-muted-foreground/60">pruebas.test</div>
      </div>

      <CodeEditor
        value={code}
        language={language}
        onChange={onCodeChange}
        onRun={onRun}
        label={`Editor de código ${LANGUAGES[language].label}`}
      />

      <OutputConsole lines={consoleLines} onClear={onClearConsole} />

      <div className="flex items-center justify-between bg-primary px-3 py-0.5 font-mono text-[11px] text-primary-foreground">
        <span>{LANGUAGES[language].label}</span>
        <span>UTF-8 · Espacios: {LANGUAGES[language].indent.length}</span>
      </div>
    </section>
  )
}
