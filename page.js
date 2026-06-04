// Server Component — corre en el servidor, no en el browser
import Topbar       from '@/components/Topbar'
import Nav          from '@/components/Nav'
import Hero         from '@/components/Hero'
import Efemerides   from '@/components/Efemerides'
import Noticias     from '@/components/Noticias'
import Clima        from '@/components/Clima'
import Farmacia     from '@/components/Farmacia'
import DatosRapidos from '@/components/DatosRapidos'
import Historia     from '@/components/Historia'
import Footer       from '@/components/Footer'

// Importar section rule helper
import { SectionRule } from '@/components/SectionRule'

// Lib: data fetching server-side
import { getClima }          from '@/lib/clima'
import { getDolar }          from '@/lib/dolar'
import { getFarmacia, getProximosDias } from '@/lib/farmacia'
import { getProximoFeriado } from '@/lib/feriados'
import { getEfemerides }     from '@/lib/efemerides'
import { getQuiniela }       from '@/lib/quiniela'

// Inline de secciones que aún no tienen componente propio
import styles from './page.module.css'

export const revalidate = 3600 // revalidar la página cada 1 hora

export default async function Home() {
  // Fetch paralelo de todos los datos
  const [clima, dolar, quiniela] = await Promise.all([
    getClima(),
    getDolar(),
    getQuiniela(),
  ])

  // Datos síncronos (no necesitan fetch)
  const hoy        = new Date()
  const farmaciaHoy = getFarmacia(hoy)
  const proximos   = getProximosDias(hoy, 6)
  const feriado    = getProximoFeriado(hoy)
  const efemerides = getEfemerides(hoy)

  return (
    <>
      <Topbar clima={clima} dolar={dolar} farmacia={farmaciaHoy} />
      <Nav />

      <main>
        {/* 1. HERO — primera impresión cinematográfica */}
        <Hero
          clima={clima}
          dolar={dolar}
          farmacia={farmaciaHoy}
          feriado={feriado}
        />

        {/* 2. EFEMÉRIDES preview */}
        <Efemerides data={efemerides} preview />

        {/* 3. NOTICIAS LOCALES */}
        <SectionRule label="Noticias de Tancacha" info="Actualización manual" />
        <Noticias />

        {/* 4. CLIMA — sección oscura inmersiva */}
        <SectionRule label="Clima" info="Open-Meteo · Actualizado cada hora" />
        <Clima clima={clima} />

        {/* 5. FARMACIA */}
        <SectionRule label="Farmacia de turno" />
        <Farmacia hoy={farmaciaHoy} proximos={proximos} />

        {/* 6. QUINIELA + FERIADO */}
        <SectionRule label="Quiniela y feriados" />
        <DatosRapidos feriado={feriado} quiniela={quiniela} />

        {/* 7. HISTORIA — sección emocional */}
        <SectionRule label="Identidad local" />
        <Historia />

        {/* 8. EFEMÉRIDES completas */}
        <SectionRule label="Efemérides completas" info={efemerides?.titulo} />
        <Efemerides data={efemerides} />
      </main>

      <Footer />
    </>
  )
}
