'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { LANGUAGES, type Subject } from '@/lib/curriculum'
import { useProgress } from '@/components/progress-provider'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export function SubjectCard({ subject }: { subject: Subject }) {
  const { subjectProgress } = useProgress()
  const progress = subjectProgress(subject)
  const isDone = progress.completed === progress.total

  return (
    <Link
      href={`/materia/${subject.id}`}
      className="group flex flex-col gap-5 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h4 className="font-semibold leading-snug">{subject.name}</h4>
          <p className="text-sm leading-relaxed text-muted-foreground">{subject.description}</p>
        </div>
        <ArrowRight
          className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {subject.languages.map((language) => (
          <Badge key={language} variant="secondary" className="font-mono text-[11px]">
            {LANGUAGES[language].label}
          </Badge>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progreso</span>
          <span className={isDone ? 'font-mono text-primary' : 'font-mono text-foreground'}>
            {progress.completed}/{progress.total} ejercicios
          </span>
        </div>
        <Progress value={progress.percent} aria-label={`Progreso en ${subject.name}`} />
      </div>
    </Link>
  )
}
