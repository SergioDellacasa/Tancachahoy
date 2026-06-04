import styles from './Hero.module.css'

export default function Hero({ clima, dolar, farmacia, feriado }) {
  const hoy = new Date()
  const dias = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  const fechaHumana = `${dias[hoy.getDay()]}, ${hoy.getDate()} de ${meses[hoy.getMonth()]}`

  return (
    <section className={styles.hero}>
      <div className={styles.bg} />

      <div className={styles.content}>
        <p className={styles.kicker}>
          <span className={styles.kickerLine} />
          Tancacha · Córdoba · Argentina
        </p>

        <h1 className={styles.headline}>
          <span className={styles.headlineTop}>Tu pueblo,</span>
          <em className={styles.headlineEm}>cada día</em>
        </h1>

        <p className={styles.sub}>
          Noticias, comercios, farmacia, deportes, quiniela e historia.
          <br />Todo Tancacha en un solo lugar.
        </p>

        <div className={styles.actions}>
          <a href="#noticias" className={styles.btnPrimary}>
            Últimas noticias
          </a>
          <a href="#deportes" className={styles.btnLink}>
            Deportes locales →
          </a>
        </div>
      </div>

      {/* Strip de datos en vivo */}
      <div className={styles.dataStrip}>
        <div className={styles.datumDate}>
          <div className={styles.datumLabel}>Hoy</div>
          <div className={styles.datumValue} style={{ fontSize: '1rem', lineHeight: 1.2 }}>
            {fechaHumana}
          </div>
        </div>

        <div className={styles.datum}>
          <div className={styles.datumLabel}>Temperatura</div>
          <div className={styles.datumValue}>
            {clima?.ok ? `${clima.temp}°C` : '—'}
          </div>
          <div className={styles.datumSub}>
            {clima?.ok ? `${clima.desc} · ${clima.icon}` : 'Sin datos'}
          </div>
        </div>

        <div className={styles.datum}>
          <div className={styles.datumLabel}>Lluvia 7 días</div>
          <div className={styles.datumValue}>
            {clima?.ok ? `${clima.lluvia7} mm` : '—'}
          </div>
          <div className={styles.datumSub}>Acumulado</div>
        </div>

        <div className={styles.datum}>
          <div className={styles.datumLabel}>Dólar blue</div>
          <div className={styles.datumValue}>
            {dolar?.blue ? `$${dolar.blue.venta}` : '—'}
          </div>
          <div className={styles.datumSub}>
            {dolar?.oficial ? `Oficial $${dolar.oficial.venta}` : ''}
          </div>
        </div>

        <div className={styles.datum}>
          <div className={styles.datumLabel}>Farmacia de turno</div>
          <div className={styles.datumValue} style={{ fontSize: '.9rem', lineHeight: 1.2 }}>
            {farmacia || '—'}
          </div>
          <div className={styles.datumSub}>{dias[hoy.getDay()]}</div>
        </div>

        {feriado && (
          <div className={styles.datum}>
            <div className={styles.datumLabel}>Próximo feriado</div>
            <div className={styles.datumValue} style={{ fontSize: '.9rem', lineHeight: 1.2 }}>
              {feriado.dia} {feriado.mes}
            </div>
            <div className={styles.datumSub}>{feriado.countdown}</div>
          </div>
        )}
      </div>
    </section>
  )
}
