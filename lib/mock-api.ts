import type { AnoApi } from '@/lib/api'
import { ID_MAP } from '@/lib/curriculum'
import { SUBJECTS, YEARS } from '@/lib/mocks'

// SubjectCard y las rutas /materia/{id} resuelven la materia por el id numérico de la API,
// así que el mock usa los mismos ids: invertimos ID_MAP (slug -> id).
const ID_BY_SLUG = new Map(Object.entries(ID_MAP).map(([id, slug]) => [slug, Number(id)]))

/** Misma forma que GET /api/anos, armada con los datos de lib/mocks.ts. */
export function getMockAnosConCursos(): AnoApi[] {
  return YEARS.map((year) => ({
    id: year.number,
    numero: year.number,
    nombre: year.label,
    foco: year.focus,
    cursos: SUBJECTS.filter((subject) => subject.year === year.number).map((subject) => {
      const id = ID_BY_SLUG.get(subject.id)
      if (id === undefined) throw new Error(`Falta "${subject.id}" en ID_MAP (lib/curriculum.ts)`)
      return {
        id,
        slug: subject.id,
        nombre: subject.name,
        descripcion: subject.description,
        anoId: year.number,
      }
    }),
  }))
}
