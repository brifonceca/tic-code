/**
 * Capa de acceso al backend (Spring Boot).
 *
 * Por ahora SOLO la home consume datos reales. El resto de la app
 * (materias, ejercicios, progreso) sigue usando el mock de lib/curriculum.ts.
 */

// Variable de entorno SIN prefijo NEXT_PUBLIC_: solo existe en el servidor de Next.
// Está bien así porque la home pide los datos desde un Server Component.
const API_URL = process.env.BACKEND_URL ?? 'http://localhost:8080'

// --- Tipos: espejo de los DTOs del backend (AnoConCursosResponse / CursosResponse) ---

export type CursoApi = {
  id: number
  slug: string
  nombre: string
  descripcion: string | null
  anoId: number | null
}

export type AnoApi = {
  id: number
  numero: number
  nombre: string
  foco: string | null
  cursos: CursoApi[]
}

// --- Endpoints ---

export async function getAnosConCursos(): Promise<AnoApi[]> {
  const response = await fetch(`${API_URL}/api/anos`, {
    // Siempre datos frescos de la base: no cacheamos.
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`El backend respondió ${response.status} al pedir /api/anos`)
  }

  return response.json()
}
