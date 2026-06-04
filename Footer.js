import styles from './Footer.module.css'
import Link from 'next/link'

const LINKS = [
  { label: 'Noticias', href: '#noticias' },
  { label: 'Deportes', href: '#deportes' },
  { label: 'Ofertas', href: '#ofertas' },
  { label: 'Comercios', href: '#comercios' },
  { label: 'Historia', href: '#historia' },
  { label: 'Farmacia', href: '#farmacia' },
  { label: 'Quiniela', href: '#quiniela' },
  { label: 'Anunciate', href: '#anunciate' },
]

const REDES = [
  { label: 'Instagram', href: 'https://instagram.com/mitancacha', short: 'IG' },
  { label: 'Facebook',  href: 'https://facebook.com/mitancacha',  short: 'FB' },
  { label: 'TikTok',    href: 'https://tiktok.com/@mitancacha',   short: 'TK' },
  { label: 'WhatsApp',  href: 'https://wa.me/5493571000000',       short: 'WA' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}><em>Mi</em>Tancacha</div>
            <p className={styles.tagline}>El portal de Tancacha, Córdoba, Argentina</p>
            <div className={styles.redes}>
              {REDES.map(r => (
                <a key={r.href} href={r.href} target="_blank" rel="noopener" className={styles.red} title={r.label}>
                  {r.short}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.cols}>
            <div>
              <div className={styles.colTitle}>Secciones</div>
              <div className={styles.colLinks}>
                {LINKS.slice(0, 5).map(l => (
                  <a key={l.href} href={l.href} className={styles.colLink}>{l.label}</a>
                ))}
              </div>
            </div>
            <div>
              <div className={styles.colTitle}>Servicios</div>
              <div className={styles.colLinks}>
                {LINKS.slice(5).map(l => (
                  <a key={l.href} href={l.href} className={styles.colLink}>{l.label}</a>
                ))}
                {REDES.map(r => (
                  <a key={r.href} href={r.href} target="_blank" rel="noopener" className={styles.colLink}>{r.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>
            Tancacha, Córdoba · Fundada el 15 de octubre de 1913
          </span>
          <span className={styles.src}>
            Datos: Open-Meteo · dolarapi.com · nolaborables.com.ar
          </span>
        </div>
      </div>
    </footer>
  )
}
