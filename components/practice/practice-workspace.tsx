'use client'

import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { LANGUAGES, YEARS, getExercise, getStarterCode, formatValue, type Language } from '@/lib/curriculum'
import { runTests, type TestResult } from '@/lib/runner'
import { useProgress } from '@/components/progress-provider'
import { ExercisePanel } from '@/components/practice/exercise-panel'
import { EditorPanel } from '@/components/practice/editor-panel'
import type { ConsoleLine } from '@/components/practice/output-console'

export type TestStatus = 'pending' | 'running' | 'passed' | 'failed'

export function PracticeWorkspace({ subjectId, exerciseId }: { subjectId: string; exerciseId: string }) {
  const found = getExercise(subjectId, exerciseId)!
  const { subject, exercise } = found
  const { getDraft, saveDraft, markCompleted, isCompleted } = useProgress()

  const [language, setLanguage] = useState<Language>(subject.defaultLanguage)
  const [code, setCode] = useState(
    () => getDraft(subjectId, exerciseId, subject.defaultLanguage) ?? getStarterCode(exercise, subject.defaultLanguage),
  )
  const [statuses, setStatuses] = useState<TestStatus[]>(() => exercise.tests.map(() => 'pending'))
  const [results, setResults] = useState<TestResult[]>([])
  const [consoleLines, setConsoleLines] = useState<ConsoleLine[]>([
    { type: 'info', text: `Tic Code Runner listo. Presioná "Ejecutar código" o Ctrl + Enter para probar tu solución.` },
  ])
  const [isRunning, setIsRunning] = useState(false)
  const runIdRef = useRef(0)

  const resetChecks = () => {
    setStatuses(exercise.tests.map(() => 'pending'))
    setResults([])
  }

  const handleCodeChange = (value: string) => {
    setCode(value)
    saveDraft(subjectId, exerciseId, language, value)
  }

  const handleLanguageChange = (next: Language) => {
    if (next === language) return
    setLanguage(next)
    setCode(getDraft(subjectId, exerciseId, next) ?? getStarterCode(exercise, next))
    resetChecks()
    setConsoleLines((prev) => [...prev, { type: 'info', text: `Lenguaje cambiado a ${LANGUAGES[next].label}.` }])
  }

  const handleReset = () => {
    const starter = getStarterCode(exercise, language)
    setCode(starter)
    saveDraft(subjectId, exerciseId, language, starter)
    resetChecks()
    setConsoleLines([{ type: 'info', text: 'Código restablecido a la plantilla inicial.' }])
  }

  const handleRun = useCallback(async () => {
    if (isRunning) return
    const runId = ++runIdRef.current
    const fileName = `solucion.${LANGUAGES[language].extension}`
    setIsRunning(true)
    setStatuses(exercise.tests.map(() => 'running'))
    setConsoleLines([{ type: 'command', text: `${language === 'python' ? 'python' : 'node'} ${fileName} --test` }])

    const output = await runTests({
      language,
      code,
      fnName: exercise.fnName,
      tests: exercise.tests,
      onStatus: (message) => setConsoleLines((prev) => [...prev, { type: 'info', text: message }]),
    })
    if (runId !== runIdRef.current) return

    const lines: ConsoleLine[] = output.logs.map((text) => ({ type: 'log', text }))
    if (output.error) {
      lines.push({ type: 'error', text: output.error })
      setStatuses(exercise.tests.map(() => 'failed'))
      setResults(exercise.tests.map(() => ({ passed: false, error: output.error })))
    } else {
      setStatuses(output.results.map((result) => (result.passed ? 'passed' : 'failed')))
      setResults(output.results)
      output.results.forEach((result, index) => {
        const test = exercise.tests[index]
        const call = `${exercise.fnName}(${test.args.map((arg) => formatValue(arg, language)).join(', ')})`
        if (result.passed) {
          lines.push({ type: 'success', text: `PASS  Prueba ${index + 1}: ${call}` })
        } else if (result.error) {
          lines.push({ type: 'error', text: `FALLA Prueba ${index + 1}: ${call} → ${result.error}` })
        } else {
          lines.push({
            type: 'error',
            text: `FALLA Prueba ${index + 1}: ${call} → esperado ${formatValue(test.expected, language)}, obtenido ${formatValue(result.actual, language)}`,
          })
        }
      })
    }

    const passedCount = output.error ? 0 : output.results.filter((result) => result.passed).length
    const allPassed = passedCount === exercise.tests.length
    lines.push({
      type: allPassed ? 'success' : 'summary',
      text: allPassed
        ? `Todas las pruebas superadas (${passedCount}/${exercise.tests.length}). ¡Ejercicio completado!`
        : `${passedCount}/${exercise.tests.length} pruebas superadas.`,
    })
    if (allPassed) markCompleted(subjectId, exerciseId)

    setConsoleLines((prev) => [...prev, ...lines])
    setIsRunning(false)
  }, [isRunning, language, code, exercise, markCompleted, subjectId, exerciseId])

  const index = subject.exercises.findIndex((item) => item.id === exercise.id)
  const nextExercise = subject.exercises[index + 1]
  const prevExercise = subject.exercises[index - 1]
  const year = YEARS.find((item) => item.number === subject.year)

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <nav aria-label="Ubicación" className="border-b border-border bg-editor-chrome">
        <ol className="flex h-10 items-center gap-1.5 overflow-x-auto px-4 text-xs whitespace-nowrap text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground">
              {year?.label}
            </Link>
          </li>
          <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
          <li>
            <Link href={`/materia/${subject.id}`} className="hover:text-foreground">
              {subject.name}
            </Link>
          </li>
          <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
          <li aria-current="page" className="text-foreground">
            {exercise.title}
          </li>
        </ol>
      </nav>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:grid lg:grid-cols-[minmax(340px,5fr)_7fr] lg:overflow-hidden">
        <ExercisePanel
          subject={subject}
          exercise={exercise}
          language={language}
          statuses={statuses}
          results={results}
          completed={isCompleted(subjectId, exerciseId)}
          prevExercise={prevExercise}
          nextExercise={nextExercise}
          position={index + 1}
        />
        <EditorPanel
          language={language}
          languages={subject.languages}
          code={code}
          isRunning={isRunning}
          consoleLines={consoleLines}
          onCodeChange={handleCodeChange}
          onLanguageChange={handleLanguageChange}
          onRun={handleRun}
          onReset={handleReset}
          onClearConsole={() => setConsoleLines([])}
        />
      </div>
    </div>
  )
}
