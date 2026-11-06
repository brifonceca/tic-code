import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Lightbulb, Loader2, PartyPopper, X } from 'lucide-react'
import { formatValue, type Exercise, type Language, type Subject } from '@/lib/curriculum'
import type { TestResult } from '@/lib/runner'
import type { TestStatus } from '@/components/practice/practice-workspace'
import { DIFFICULTY_STYLES } from '@/components/subject-overview'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ExercisePanelProps = {
  subject: Subject
  exercise: Exercise
  language: Language
  statuses: TestStatus[]
  results: TestResult[]
  completed: boolean
  prevExercise?: Exercise
  nextExercise?: Exercise
  position: number
}

const STATUS_LABEL: Record<TestStatus, string> = {
  pending: 'Sin ejecutar',
  running: 'Ejecutando',
  passed: 'Superada',
  failed: 'Fallida',
}

export function ExercisePanel({
  subject,
  exercise,
  language,
  statuses,
  results,
  completed,
  prevExercise,
  nextExercise,
  position,
}: ExercisePanelProps) {
  const passed = statuses.filter((status) => status === 'passed').length
  const total = exercise.tests.length
  const params = exercise.params.join(', ')

  return (
    <section
      aria-labelledby="exercise-title"
      className="flex flex-col border-border lg:min-h-0 lg:overflow-y-auto lg:border-r"
    >
      <div className="flex flex-col gap-6 p-5 md:p-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">
              Actividad {position} de {subject.exercises.length}
            </span>
            <Badge variant="outline" className={DIFFICULTY_STYLES[exercise.difficulty]}>
              {exercise.difficulty}
            </Badge>
            {completed && (
              <Badge variant="outline" className="border-success/30 bg-success/10 text-success">
                <Check className="size-3" aria-hidden="true" />
                Completado
              </Badge>
            )}
          </div>
          <h1 id="exercise-title" className="text-balance text-2xl font-semibold tracking-tight">
            {exercise.title}
          </h1>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Consigna</h2>
          <p className="text-pretty leading-relaxed">{exercise.statement}</p>
          <div className="rounded-lg border border-border bg-editor px-3 py-2.5 font-mono text-sm">
            <span className="text-muted-foreground">Firma: </span>
            <span className="text-syntax-function">{exercise.fnName}</span>
            <span>({params})</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Ejemplo</h2>
          <pre className="overflow-x-auto rounded-lg border border-border bg-editor px-3 py-2.5 font-mono text-sm">
            <code>
              <span className="text-syntax-function">{exercise.fnName}</span>(
              {exercise.tests[0].args.map((arg) => formatValue(arg, language)).join(', ')})
              <span className="text-muted-foreground">{' → '}</span>
              <span className="text-syntax-string">{formatValue(exercise.tests[0].expected, language)}</span>
            </code>
          </pre>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Verificación automática
            </h2>
            <span className="font-mono text-xs" aria-live="polite">
              <span className={passed === total ? 'text-success' : 'text-foreground'}>{passed}</span>
              <span className="text-muted-foreground">/{total} pruebas</span>
            </span>
          </div>

          <ul className="flex flex-col gap-2">
            {exercise.tests.map((test, index) => {
              const status = statuses[index]
              const result = results[index]
              return (
                <li
                  key={index}
                  className={cn(
                    'flex gap-3 rounded-lg border p-3 transition-colors',
                    status === 'passed' && 'border-success/40 bg-success/5',
                    status === 'failed' && 'border-destructive/40 bg-destructive/5',
                    (status === 'pending' || status === 'running') && 'border-border bg-card',
                  )}
                >
                  <span
                    role="img"
                    aria-label={STATUS_LABEL[status]}
                    className={cn(
                      'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border',
                      status === 'passed' && 'border-success bg-success text-primary-foreground',
                      status === 'failed' && 'border-destructive bg-destructive text-white',
                      status === 'pending' && 'border-input',
                      status === 'running' && 'border-input text-muted-foreground',
                    )}
                  >
                    {status === 'passed' && <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />}
                    {status === 'failed' && <X className="size-3.5" strokeWidth={3} aria-hidden="true" />}
                    {status === 'running' && <Loader2 className="size-3 animate-spin" aria-hidden="true" />}
                  </span>
                  <div className="flex min-w-0 flex-col gap-1">
                    <code className="break-all font-mono text-sm">
                      {exercise.fnName}({test.args.map((arg) => formatValue(arg, language)).join(', ')})
                      <span className="text-muted-foreground">{' → '}</span>
                      {formatValue(test.expected, language)}
                    </code>
                    {status === 'failed' && result && (
                      <span className="break-all font-mono text-xs text-destructive">
                        {result.error ?? `Obtenido: ${formatValue(result.actual, language)}`}
                      </span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {passed === total && (
          <div className="flex flex-col gap-3 rounded-xl border border-success/40 bg-success/10 p-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2 font-medium text-success">
              <PartyPopper className="size-4" aria-hidden="true" />
              ¡Excelente! Superaste todas las pruebas.
            </div>
            {nextExercise ? (
              <Button
                className="w-fit"
                render={<Link href={`/materia/${subject.id}/${nextExercise.id}`} />}
                nativeButton={false}
              >
                Siguiente: {nextExercise.title}
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Button>
            ) : (
              <Button
                className="w-fit"
                render={<Link href={`/materia/${subject.id}`} />}
                nativeButton={false}
              >
                Volver a la materia
              </Button>
            )}
          </div>
        )}

        <details className="group rounded-lg border border-border bg-card">
          <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground">
            <Lightbulb className="size-4 text-warning" aria-hidden="true" />
            Ver pista
          </summary>
          <ul className="flex flex-col gap-1 border-t border-border px-3 py-2.5 text-sm leading-relaxed">
            {exercise.hints.map((hint) => (
              <li key={hint}>{hint}</li>
            ))}
          </ul>
        </details>

        <div className="flex items-center justify-between gap-2 border-t border-border pt-4">
          {prevExercise ? (
            <Button
              variant="ghost"
              size="sm"
              render={<Link href={`/materia/${subject.id}/${prevExercise.id}`} />}
              nativeButton={false}
            >
              <ArrowLeft data-icon="inline-start" aria-hidden="true" />
              Anterior
            </Button>
          ) : (
            <span />
          )}
          {nextExercise && (
            <Button
              variant="ghost"
              size="sm"
              render={<Link href={`/materia/${subject.id}/${nextExercise.id}`} />}
              nativeButton={false}
            >
              Siguiente
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
