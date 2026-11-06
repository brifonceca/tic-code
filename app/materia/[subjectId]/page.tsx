import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SubjectOverview } from '@/components/subject-overview'
import { SUBJECTS, getSubject } from '@/lib/curriculum'

export function generateStaticParams() {
  return SUBJECTS.map((subject) => ({ subjectId: subject.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ subjectId: string }> }): Promise<Metadata> {
  const { subjectId } = await params
  const subject = getSubject(subjectId)
  return { title: subject ? `${subject.name} · Tic Code` : 'Materia · Tic Code' }
}

export default async function SubjectPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params
  if (!getSubject(subjectId)) notFound()

  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-4 py-10 md:px-6">
        <SubjectOverview subjectId={subjectId} />
      </main>
    </div>
  )
}
