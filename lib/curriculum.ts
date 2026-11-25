import { SUBJECTS } from "./mocks"

export type Language = 'python' | 'javascript'

export type Difficulty = 'Fácil' | 'Media' | 'Difícil'

export type TestCase = {
  args: unknown[]
  expected: unknown
}

export type Exercise = {
  id: string
  title: string
  difficulty: Difficulty
  fnName: string
  params: string[]
  statement: string
  hints: string[]
  tests: TestCase[]
}

export type Subject = {
  id: string
  year: number
  name: string
  description: string
  languages: Language[]
  defaultLanguage: Language
  exercises: Exercise[]
}

export type Year = {
  number: number
  label: string
  focus: string
}

export const LANGUAGES: Record<Language, { label: string; extension: string; indent: string }> = {
  python: { label: 'Python', extension: 'py', indent: '    ' },
  javascript: { label: 'JavaScript', extension: 'js', indent: '  ' },
}



export function getSubjectsByYear(year: number) {
  return SUBJECTS.filter((subject) => subject.year === year)
}


// Mapeo para conectar los IDs numéricos de la API con los IDs de texto de la currícula
export const ID_MAP: Record<string, string> = {
  '1': 'pensam-compu',
  '3': 'pens-compu',
  //'4': 'algoritmos-1',
  '5': 'tec-control',
  '6': 'algo-progra',
  '7': 'log-compu',
  '8': 'algo-estru-datos',
  '9': 'dis-software',
  '10':'progr-web',
  '11':'algoritmos-avanzados',
  '12': 'grafos',
  '15': 'admin-gestion-bd'
}

export function getSubject(id: string | number) {
  const stringId = String(id)
  const realId = ID_MAP[stringId] || stringId
  return SUBJECTS.find((subject) => subject.id === realId)
}

export function getExercise(subjectId: string, exerciseId: string) {
  const subject = getSubject(subjectId)
  const exercise = subject?.exercises.find((item) => item.id === exerciseId)
  return subject && exercise ? { subject, exercise } : undefined
}

export function exerciseKey(subjectId: string, exerciseId: string) {
  return `${subjectId}/${exerciseId}`
}

export function getStarterCode(exercise: Exercise, language: Language) {
  const params = exercise.params.join(', ')
  if (language === 'python') {
    return `def ${exercise.fnName}(${params}):\n    # Escribí tu solución acá\n    pass\n`
  }
  return `function ${exercise.fnName}(${params}) {\n  // Escribí tu solución acá\n}\n`
}

export function formatValue(value: unknown, language: Language): string {
  if (value === undefined || value === null) return language === 'python' ? 'None' : String(value)
  if (typeof value === 'boolean') {
    return language === 'python' ? (value ? 'True' : 'False') : String(value)
  }
  if (typeof value === 'string') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map((item) => formatValue(item, language)).join(', ')}]`
  return String(value)
}

export const STUDENT_EMAIL = 'britanyfonceca@etec.uba.ar'

export const INITIAL_COMPLETED = [
  'intro-programacion/sumar',
  'intro-programacion/es-par',
  'intro-programacion/mayor-de-tres',
  'logica-algoritmos/contar-vocales',
  'logica-algoritmos/factorial',
  'programacion-1/sumar-lista',
  'algoritmos-1/fizzbuzz',
  'estructuras-datos-1/eliminar-duplicados',
]
