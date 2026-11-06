'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { YEARS, getSubjectsByYear } from '@/lib/curriculum'
import { useProgress } from '@/components/progress-provider'
import { SubjectCard } from '@/components/subject-card'
import { cn } from '@/lib/utils'

export function YearGrid() {
  const [selectedYear, setSelectedYear] = useState<number | null>(1)
  const { subjectProgress } = useProgress()
  const selected = YEARS.find((year) => year.number === selectedYear)

  return (
    <section aria-labelledby="years-title" className="flex flex-col gap-6">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="years-title" className="text-xl font-semibold tracking-tight">
            Elegí tu año
          </h2>
          <p className="text-sm text-muted-foreground">Entra a tu año para ver las materias.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {YEARS.map((year) => {
          const subjects = getSubjectsByYear(year.number)
          const totals = subjects.reduce(
            (acc, subject) => {
              const progress = subjectProgress(subject)
              return { done: acc.done + progress.completed, total: acc.total + progress.total }
            },
            { done: 0, total: 0 },
          )
          const percent = totals.total ? Math.round((totals.done / totals.total) * 100) : 0
          const isSelected = selectedYear === year.number

          return (
            <button
              key={year.number}
              type="button"
              onClick={() => setSelectedYear(isSelected ? null : year.number)}
              aria-expanded={isSelected}
              aria-controls="year-subjects"
              className={cn(
                'group flex flex-col gap-4 rounded-xl border bg-card p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-foreground/20 hover:bg-accent',
              )}
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    'font-mono text-4xl font-semibold tracking-tighter',
                    isSelected ? 'text-primary' : 'text-foreground',
                  )}
                >
                  {year.number}°
                </span>
                <ChevronDown
                  className={cn('size-4 text-muted-foreground transition-transform', isSelected && 'rotate-180 text-primary')}
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">{year.label}</span>
                <span className="text-xs leading-snug text-muted-foreground">{year.focus}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="h-1 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percent}%` }} />
                </div>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {percent}% · {subjects.length} materias
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <div id="year-subjects" aria-live="polite">
        {selected ? (
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/50 p-4 animate-in fade-in slide-in-from-top-2 md:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">Materias de {selected.label}</h3>
              <span className="font-mono text-xs text-muted-foreground">{selected.focus}</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {getSubjectsByYear(selected.number).map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Seleccioná un año para desplegar sus materias.
          </p>
        )}
      </div>
    </section>
  )
}
