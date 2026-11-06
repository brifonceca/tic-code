'use client'

import { useMemo, useRef } from 'react'
import { LANGUAGES, type Language } from '@/lib/curriculum'
import { tokenize, type TokenType } from '@/lib/highlight'

const TOKEN_CLASS: Record<TokenType, string> = {
  keyword: 'text-syntax-keyword',
  string: 'text-syntax-string',
  number: 'text-syntax-number',
  comment: 'text-syntax-comment italic',
  function: 'text-syntax-function',
  builtin: 'text-syntax-builtin',
  plain: '',
}

type CodeEditorProps = {
  value: string
  language: Language
  onChange: (value: string) => void
  onRun: () => void
  label: string
}

export function CodeEditor({ value, language, onChange, onRun, label }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const tokens = useMemo(() => tokenize(value, language), [value, language])
  const lineCount = value.split('\n').length
  const indent = LANGUAGES[language].indent

  const replaceSelection = (text: string, start: number, end: number, cursor: number) => {
    const next = value.slice(0, start) + text + value.slice(end)
    onChange(next)
    requestAnimationFrame(() => {
      textareaRef.current?.setSelectionRange(cursor, cursor)
    })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.nativeEvent.isComposing || event.keyCode === 229) return
    const target = event.currentTarget
    const { selectionStart: start, selectionEnd: end } = target

    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault()
      onRun()
      return
    }

    if (event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault()
      replaceSelection(indent, start, end, start + indent.length)
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      const lineStart = value.lastIndexOf('\n', start - 1) + 1
      const currentLine = value.slice(lineStart, start)
      const baseIndent = currentLine.match(/^\s*/)?.[0] ?? ''
      const opensBlock = language === 'python' ? /:\s*$/.test(currentLine) : /[{[(]\s*$/.test(currentLine)
      const insert = `\n${baseIndent}${opensBlock ? indent : ''}`
      replaceSelection(insert, start, end, start + insert.length)
    }
  }

  return (
    <div className="relative min-h-0 flex-1 overflow-auto bg-editor font-mono text-[13px] leading-6">
      <div className="flex min-h-full w-max min-w-full">
        <div
          aria-hidden="true"
          className="sticky left-0 z-10 select-none bg-editor py-3 pr-4 pl-4 text-right text-muted-foreground/50 tabular-nums"
        >
          {Array.from({ length: lineCount }, (_, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div>
        <div className="grid flex-1 py-3 pr-8 [tab-size:4]">
          <pre
            aria-hidden="true"
            className="pointer-events-none m-0 whitespace-pre font-mono [grid-area:1/1]"
          >
            {tokens.map((token, index) => (
              <span key={index} className={TOKEN_CLASS[token.type]}>
                {token.text}
              </span>
            ))}
            {'\n '}
          </pre>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            aria-label={label}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            wrap="off"
            className="m-0 resize-none overflow-hidden whitespace-pre border-0 bg-transparent p-0 font-mono text-transparent caret-foreground outline-none selection:bg-syntax-function/25 selection:text-transparent [grid-area:1/1]"
          />
        </div>
      </div>
    </div>
  )
}
