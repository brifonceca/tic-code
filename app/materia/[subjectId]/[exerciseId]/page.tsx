import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { PracticeWorkspace } from '@/components/practice/practice-workspace'
import { SUBJECTS, getExercise } from '@/lib/curriculum'

type Params = Promise<{ subjectId: string; exerciseId: string }>

export function generateStaticParams() {
  return SUBJECTS.flatMap((subject) =>
    subject.exercises.map((exercise) => ({ subjectId: subject.id, exerciseId: exercise.id })),
  )
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { subjectId, exerciseId } = await params
  const found = getExercise(subjectId, exerciseId)
  return { title: found ? `${found.exercise.title} · Tic Code` : 'Ejercicio · Tic Code' }
}

export default async function ExercisePage({ params }: { params: Params }) {
  const { subjectId, exerciseId } = await params
  if (!getExercise(subjectId, exerciseId)) notFound()

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <SiteHeader />
      <PracticeWorkspace key={`${subjectId}/${exerciseId}`} subjectId={subjectId} exerciseId={exerciseId} />
    </div>
  )
}
