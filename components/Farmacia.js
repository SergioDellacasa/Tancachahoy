import styles from './Farmacia.module.css'

const DIAS_FULL = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
const DIAS_ABR  = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']

export default function Farmacia({ hoy, proximos }) {
  const dow = new Date().getDay()

  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>
            Hoy, {DIAS_FULL[dow].toLowerCase()}
          </p>
          <h2 className={styles.titulo}>
            Farmacia<br />de turno
          </h2>
          <p className={styles.sub}>Esta noche le corresponde atender a</p>
          <p className={styles.nombre}>Farmacia {hoy}</p>
        </div>

        <div className={styles.right}>
          <div className={styles.schedule}>
            <div className={`${styles.row} ${styles.rowToday}`}>
              <span className={styles.todayDot} />
              <span className={styles.rowDay}>Hoy — {DIAS_ABR[dow]}</span>
              <span className={styles.rowFarm}>{hoy}</span>
            </div>
            {proximos?.map((p, i) => (
              <div key={i} className={styles.row}>
                <span className={styles.rowDay}>{p.abrev}</span>
                <span className={styles.rowFarm}>{p.farmacia}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
