import styles from './Clima.module.css'

const DIAS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']

export default function Clima({ clima }) {
  if (!clima?.ok) return null

  const hoy = new Date()

  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.lugar}>Tancacha, Córdoba</p>
          <div className={styles.tempWrap}>
            <span className={styles.temp}>{clima.temp}°</span>
            <span className={styles.icon}>{clima.icon}</span>
          </div>
          <p className={styles.desc}>{clima.desc}</p>
          <div className={styles.detalles}>
            <span>Viento {clima.viento} km/h</span>
            <span className={styles.dot}>·</span>
            <span>Humedad {clima.humedad}%</span>
            <span className={styles.dot}>·</span>
            <span>Sensación {clima.sensacion}°C</span>
          </div>
          <div className={styles.lluvia}>
            <span className={styles.lluviaN}>{clima.lluvia7}</span>
            <span className={styles.lluviaU}>mm en 7 días</span>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.pronostico}>
            {clima.pronostico.map((d, i) => {
              const fecha = new Date()
              fecha.setDate(fecha.getDate() + i + 1)
              return (
                <div key={i} className={styles.pronosticoDia}>
                  <div className={styles.pronosticoDiaNom}>{DIAS[fecha.getDay()]}</div>
                  <div className={styles.pronosticoIcon}>{d.icon}</div>
                  <div className={styles.pronosticoTemp}>
                    <span className={styles.tempMax}>{d.maxima}°</span>
                    <span className={styles.tempMin}>{d.minima}°</span>
                  </div>
                  {d.lluvia > 20 && (
                    <div className={styles.pronosticoLluvia}>{d.lluvia}%</div>
                  )}
                </div>
              )
            })}
          </div>

          <p className={styles.fuente}>Datos: Open-Meteo · Tancacha, Córdoba</p>
        </div>
      </div>
    </section>
  )
}
