'use client'

import { useEffect, useState } from 'react'
import styles from './Topbar.module.css'

export default function Topbar({ clima, dolar, farmacia }) {
  const [hora, setHora] = useState('')

  useEffect(() => {
    const tick = () => {
      setHora(new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }))
    }
    tick()
    const id = setInterval(tick, 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.topbar}>
      <div className={styles.live}>
        <span className={styles.dot} />
        En vivo
      </div>
      <span className={styles.sep}>·</span>

      <span className={styles.item}>
        <span className={styles.lbl}>Clima</span>
        {clima?.ok
          ? <strong>{clima.temp}°C, {clima.desc}</strong>
          : <strong>—</strong>
        }
      </span>

      <span className={styles.sep}>·</span>

      <span className={styles.item}>
        <span className={styles.lbl}>Dólar blue</span>
        {dolar?.blue
          ? <strong>${dolar.blue.venta}</strong>
          : <strong>—</strong>
        }
      </span>

      <span className={styles.sep}>·</span>

      <span className={styles.item}>
        <span className={styles.lbl}>Soja</span>
        <strong>USD 285/tn</strong>
      </span>

      <span className={styles.sep}>·</span>

      <span className={styles.item}>
        <span className={styles.lbl}>Farmacia</span>
        <strong>{farmacia || '—'}</strong>
      </span>

      {hora && (
        <>
          <span className={styles.sep}>·</span>
          <span className={styles.item}>
            <span className={styles.lbl}>Hora local</span>
            <strong>{hora}</strong>
          </span>
        </>
      )}
    </div>
  )
}
