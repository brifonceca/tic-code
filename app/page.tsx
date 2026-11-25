import { connection } from 'next/server'
import { SiteHeader } from '@/components/site-header'
import { YearGrid } from '@/components/year-grid'
import { getAnosConCursos, isMockMode, type AnoApi } from '@/lib/api'

// Server Component: el fetch corre en el servidor de Next, no en el navegador.
// Por eso no hay problemas de CORS ni se expone la URL del backend al cliente.
export default async function HomePage() {
  // Se renderiza por request: así USE_MOCK_DATA y BACKEND_URL no quedan fijadas en el build.
  // Va fuera del try/catch porque Next interrumpe el prerender desde acá.
  await connection()

  let anos: AnoApi[] = []
  let error: string | null = null

  try {
    anos = await getAnosConCursos()
  } catch (err) {
    console.error('[home] No se pudo cargar /api/anos:', err)
    error = 'No pudimos conectarnos con el servidor. Verificá que el backend esté levantado, o usá USE_MOCK_DATA=true para trabajar con datos de ejemplo.'
  }

  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-6">
        {isMockMode() && (
          <p role="status" className="mt-4 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">
            Modo demo: estás viendo datos de ejemplo, sin conexión a la base.
          </p>
        )}
        {error ? (
          <p
            role="alert"
            className="mt-8 rounded-2xl border border-dashed border-destructive/50 p-8 text-center text-sm text-muted-foreground"
          >
            {error}
          </p>
        ) : (
          <YearGrid anos={anos} />
        )}
      </main>
    </div>
  )
}
