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
    <section className="flex flex-col gap-8 py-10 md:py-14 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex max-w-2xl flex-col gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">{'// plataforma de práctica'}</p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          Aprendé a programar resolviendo problemas reales.
        </h1>
        <p className="text-pretty leading-relaxed text-muted-foreground md:text-lg">
          Elegí tu año, entrá a una materia y resolvé ejercicios de programación, algoritmos y estructuras de
          datos. Cada solución se corrige automáticamente con pruebas en tiempo real.
        </p>
      </div>

      <dl className="grid grid-cols-3 gap-3 lg:w-[420px]">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
            <Icon className="size-4 text-primary" aria-hidden="true" />
            <dd className="font-mono text-xl font-semibold">{value}</dd>
            <dt className="text-xs leading-snug text-muted-foreground">{label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
