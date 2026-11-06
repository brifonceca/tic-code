import Link from 'next/link'
import { Code2 } from 'lucide-react'
import { STUDENT_EMAIL } from '@/lib/curriculum'

export function SiteHeader() {
  const initials = STUDENT_EMAIL.slice(0, 2).toUpperCase()

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5 rounded-md focus-visible:outline-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Code2 className="size-4.5" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-semibold tracking-tight">Tic Code</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">ETEC</span>
          </span>
        </Link>

        <div
          className="flex items-center gap-2.5 rounded-full border border-border bg-card py-1 pr-1 pl-3"
          aria-label={`Sesión activa: ${STUDENT_EMAIL}`}
        >
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">{STUDENT_EMAIL}</span>
          <span className="sr-only sm:hidden">{STUDENT_EMAIL}</span>
          <span
            className="flex size-7 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold"
            aria-hidden="true"
          >
            {initials}
          </span>
        </div>
      </div>
    </header>
  )
}
