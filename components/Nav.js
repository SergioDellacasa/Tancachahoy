'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Nav.module.css'

const LINKS = [
  { href: '#noticias',  label: 'Noticias' },
  { href: '#deportes',  label: 'Deportes' },
  { href: '#ofertas',   label: 'Ofertas' },
  { href: '#comercios', label: 'Comercios' },
  { href: '#historia',  label: 'Historia' },
]

const REDES = [
  { href: 'https://instagram.com/mitancacha', label: 'IG' },
  { href: 'https://facebook.com/mitancacha',  label: 'FB' },
  { href: 'https://tiktok.com/@mitancacha',   label: 'TK' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link href="/" className={styles.logo}>
        <em>Mi</em>Tancacha
      </Link>

      <ul className={styles.links}>
        {LINKS.map(l => (
          <li key={l.href}>
            <a href={l.href} className={styles.link}>{l.label}</a>
          </li>
        ))}
      </ul>

      <div className={styles.right}>
        <div className={styles.redes}>
          {REDES.map(r => (
            <a key={r.href} href={r.href} target="_blank" rel="noopener" className={styles.red}>
              {r.label}
            </a>
          ))}
        </div>
        <a href="#anunciate" className={styles.cta}>Anunciate</a>
      </div>

      {/* Mobile burger */}
      <button
        className={styles.burger}
        onClick={() => setOpen(!open)}
        aria-label="Menú"
      >
        <span /><span /><span />
      </button>

      {open && (
        <div className={styles.mobile}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className={styles.mobileLink} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#anunciate" className={styles.mobileCta} onClick={() => setOpen(false)}>
            Anunciate
          </a>
        </div>
      )}
    </nav>
  )
}
