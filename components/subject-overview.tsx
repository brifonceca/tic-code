'use client'

import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Circle, Play } from 'lucide-react'
import { LANGUAGES, YEARS, getSubject, type Difficulty } from '@/lib/curriculum'
import { useProgress } from '@/components/progress-provider'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Fácil: 'border-success/30 bg-success/10 text-success',
  Media: 'border-warning/30 bg-warning/10 text-warning',
  Difícil: 'border-destructive/30 bg-destructive/10 text-destructive',
}

export function SubjectOverview({ subjectId }: { subjectId: string }) {
  const subject = getSubject(subjectId)
  const { subjectProgress, isCompleted } = useProgress()
  if (!subject) return null

  const progress = subjectProgress(subject)
  const year = YEARS.find((item) => item.number === subject.year)

  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/"
        className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Volver a los años
      </Link>

      <header className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">{year?.label}</span>
          <h1 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">{subject.name}</h1>
          <p className="max-w-xl leading-relaxed text-muted-foreground">{subject.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {subject.languages.map((language) => (
              <Badge key={language} variant="secondary" className="font-mono text-[11px]">
                {LANGUAGES[language].label}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 md:w-64">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progreso</span>
            <span className="font-mono">{progress.percent}%</span>
          </div>
          <Progress value={progress.percent} aria-label={`Progreso en ${subject.name}`} />
          <span className="font-mono text-xs text-muted-foreground">
            {progress.completed} de {progress.total} ejercicios completados
          </span>
        </div>
      </header>

      <section aria-labelledby="activities-title" className="flex flex-col gap-3">
        <h2 id="activities-title" className="text-lg font-semibold">
          Actividades
        </h2>
        <ol className="flex flex-col gap-2">
          {subject.exercises.map((exercise, index) => {
            const done = isCompleted(subject.id, exercise.id)
            return (
              <li key={exercise.id}>
                <Link
                  href={`/materia/${subject.id}/${exercise.id}`}
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5 transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {done ? (
                    <CheckCircle2 className="size-5 shrink-0 text-success" aria-label="Completado" />
                  ) : (
                    <Circle className="size-5 shrink-0 text-muted-foreground" aria-label="Pendiente" />
                  )}
                  <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-medium">{exercise.title}</span>
                    <span className="truncate text-xs text-muted-foreground">{exercise.tests.length} pruebas automáticas</span>
                  </span>
                  <Badge variant="outline" className={cn('hidden sm:inline-flex', DIFFICULTY_STYLES[exercise.difficulty])}>
                    {exercise.difficulty}
                  </Badge>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors group-hover:text-primary">
                    <Play className="size-3.5" aria-hidden="true" />
                    <span className="hidden sm:inline">{done ? 'Repasar' : 'Resolver'}</span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}
