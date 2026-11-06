import type { Language } from '@/lib/curriculum'

export type TokenType = 'keyword' | 'string' | 'number' | 'comment' | 'function' | 'builtin' | 'plain'

export type Token = { text: string; type: TokenType }

const KEYWORDS: Record<Language, Set<string>> = {
  python: new Set([
    'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or', 'is',
    'break', 'continue', 'pass', 'import', 'from', 'as', 'class', 'try', 'except', 'finally',
    'raise', 'with', 'lambda', 'yield', 'global', 'nonlocal', 'True', 'False', 'None',
  ]),
  javascript: new Set([
    'function', 'return', 'if', 'else', 'for', 'while', 'do', 'const', 'let', 'var', 'of', 'in',
    'break', 'continue', 'new', 'class', 'try', 'catch', 'finally', 'throw', 'switch', 'case',
    'default', 'typeof', 'instanceof', 'true', 'false', 'null', 'undefined', 'this', 'async', 'await',
  ]),
}

const BUILTINS: Record<Language, Set<string>> = {
  python: new Set(['print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'abs', 'sum', 'min', 'max', 'sorted', 'enumerate', 'zip']),
  javascript: new Set(['console', 'Math', 'Array', 'Object', 'String', 'Number', 'JSON', 'Set', 'Map']),
}

const PATTERNS: Record<Language, RegExp> = {
  python: /(#.*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)/g,
  javascript: /(\/\/.*|\/\*[\s\S]*?(?:\*\/|$))|("(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?|`(?:\\.|[^`\\])*`?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g,
}

export function tokenize(code: string, language: Language): Token[] {
  const tokens: Token[] = []
  const pattern = new RegExp(PATTERNS[language])
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(code)) !== null) {
    if (match.index > lastIndex) tokens.push({ text: code.slice(lastIndex, match.index), type: 'plain' })
    const [text, comment, string, number, identifier] = match
    let type: TokenType = 'plain'
    if (comment) type = 'comment'
    else if (string) type = 'string'
    else if (number) type = 'number'
    else if (identifier) {
      if (KEYWORDS[language].has(identifier)) type = 'keyword'
      else if (BUILTINS[language].has(identifier)) type = 'builtin'
      else if (/^\s*\(/.test(code.slice(pattern.lastIndex))) type = 'function'
    }
    tokens.push({ text, type })
    lastIndex = pattern.lastIndex
  }

  if (lastIndex < code.length) tokens.push({ text: code.slice(lastIndex), type: 'plain' })
  return tokens
}
