import styles from './Efemerides.module.css'

export default function Efemerides({ data, preview = false }) {
  if (!data) return null

  const items = preview
    ? [data.argentina[0], data.mundo[0]].filter(Boolean)
    : [...(data.celebraciones || []), ...data.argentina, ...data.mundo]

  if (preview) {
    return (
      <section className={styles.previewWrap}>
        <div className={styles.previewInner}>
          <div className={styles.previewHeader}>
            <div className={styles.bigDate}>{data.dia}</div>
            <div className={styles.titleBlock}>
              <p className={styles.overline}>Efemérides del día</p>
              <h2 className={styles.previewTitle}>{data.titulo}</h2>
            </div>
          </div>
          <div className={styles.previewCards}>
            {data.argentina[0] && (
              <div className={styles.previewCard}>
                <div className={styles.cardYear}>{data.argentina[0].y}</div>
                <p className={styles.flag}>Argentina</p>
                <p className={styles.cardText}>{data.argentina[0].t}</p>
              </div>
            )}
            {data.mundo[0] && (
              <div className={styles.previewCard}>
                <div className={styles.cardYear}>{data.mundo[0].y}</div>
                <p className={styles.flag}>Mundo</p>
                <p className={styles.cardText}>{data.mundo[0].t}</p>
              </div>
            )}
          </div>
          <a href="#efemerides" className={styles.verMas}>
            Ver todas las efemérides
          </a>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.fullWrap} id="efemerides">
      <div className={styles.fullInner}>
        <div className={styles.fullHeader}>
          <h2 className={styles.fullTitle}>
            Efemérides del <em>{data.titulo}</em>
          </h2>
          <span className={styles.fullSub}>
            {data.argentina.length} hechos de Argentina · {data.mundo.length} del mundo
          </span>
        </div>

        {data.celebraciones?.length > 0 && (
          <>
            <div className={styles.secTitle}>Hoy se celebra</div>
            {data.celebraciones.map((d, i) => (
              <div key={i} className={styles.fullItem}>
                <div className={styles.fullYear}>—</div>
                <div className={styles.fullText}>
                  <strong>{d.n}.</strong> {d.d}
                </div>
              </div>
            ))}
          </>
        )}

        <div className={styles.secTitle}>Argentina</div>
        {data.argentina.map((e, i) => (
          <div key={i} className={styles.fullItem}>
            <div className={styles.fullYear}>{e.y}</div>
            <div className={styles.fullText}>{e.t}</div>
          </div>
        ))}

        <div className={styles.secTitle}>Mundo</div>
        {data.mundo.map((e, i) => (
          <div key={i} className={styles.fullItem}>
            <div className={styles.fullYear}>{e.y}</div>
            <div className={styles.fullText}>{e.t}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
