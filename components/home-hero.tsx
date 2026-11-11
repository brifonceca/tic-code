'use client'

import { BookOpen, CheckCircle2, Layers } from 'lucide-react'
import { SUBJECTS } from '@/lib/curriculum'
import { useProgress } from '@/components/progress-provider'

export function HomeHero() {
  const { totalCompleted } = useProgress()
  const totalExercises = SUBJECTS.reduce((sum, subject) => sum + subject.exercises.length, 0)

  const stats = [
    { label: 'Ejercicios resueltos', value: `${totalCompleted}/${totalExercises}`, icon: CheckCircle2 },
    { label: 'Materias técnicas', value: SUBJECTS.length, icon: BookOpen },
    { label: 'Años de cursada', value: 6, icon: Layers },
  ]

  return (
    <section className="flex flex-col gap-8 md:py-2 lg:flex-row lg:items-end lg:justify-between">
      

      
    </section>
  )
}
