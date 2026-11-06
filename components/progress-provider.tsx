'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { INITIAL_COMPLETED, exerciseKey, type Language, type Subject } from '@/lib/curriculum'

type ProgressContextValue = {
  isCompleted: (subjectId: string, exerciseId: string) => boolean
  markCompleted: (subjectId: string, exerciseId: string) => void
  subjectProgress: (subject: Subject) => { completed: number; total: number; percent: number }
  getDraft: (subjectId: string, exerciseId: string, language: Language) => string | undefined
  saveDraft: (subjectId: string, exerciseId: string, language: Language, code: string) => void
  totalCompleted: number
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState<Set<string>>(() => new Set(INITIAL_COMPLETED))
  const [drafts, setDrafts] = useState<Record<string, string>>({})

  const isCompleted = useCallback(
    (subjectId: string, exerciseId: string) => completed.has(exerciseKey(subjectId, exerciseId)),
    [completed],
  )

  const markCompleted = useCallback((subjectId: string, exerciseId: string) => {
    const key = exerciseKey(subjectId, exerciseId)
    setCompleted((prev) => (prev.has(key) ? prev : new Set(prev).add(key)))
  }, [])

  const subjectProgress = useCallback(
    (subject: Subject) => {
      const total = subject.exercises.length
      const done = subject.exercises.filter((exercise) =>
        completed.has(exerciseKey(subject.id, exercise.id)),
      ).length
      return { completed: done, total, percent: total ? Math.round((done / total) * 100) : 0 }
    },
    [completed],
  )

  const getDraft = useCallback(
    (subjectId: string, exerciseId: string, language: Language) =>
      drafts[`${exerciseKey(subjectId, exerciseId)}:${language}`],
    [drafts],
  )

  const saveDraft = useCallback(
    (subjectId: string, exerciseId: string, language: Language, code: string) => {
      setDrafts((prev) => ({ ...prev, [`${exerciseKey(subjectId, exerciseId)}:${language}`]: code }))
    },
    [],
  )

  const value = useMemo(
    () => ({
      isCompleted,
      markCompleted,
      subjectProgress,
      getDraft,
      saveDraft,
      totalCompleted: completed.size,
    }),
    [isCompleted, markCompleted, subjectProgress, getDraft, saveDraft, completed.size],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress debe usarse dentro de ProgressProvider')
  return context
}
