import { SiteHeader } from '@/components/site-header'
import { HomeHero } from '@/components/home-hero'
import { YearGrid } from '@/components/year-grid'

export default function HomePage() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-6">
        <HomeHero/>
        <YearGrid />
      </main>
    </div>
  )
}
