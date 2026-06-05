import styles from './DatosRapidos.module.css'

export default function DatosRapidos({ feriado, quiniela }) {
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        {/* FERIADO */}
        <div className={styles.block}>
          <div className={styles.blockLabel}>Próximo feriado nacional</div>
          {feriado ? (
            <>
              <div className={styles.ferBig}>{feriado.dia}</div>
              <div className={styles.ferMonth}>{feriado.mes} {feriado.anio || ''}</div>
              <div className={styles.ferName}>{feriado.nombre}</div>
              <div className={styles.ferCd}>{feriado.countdown}</div>
            </>
          ) : (
            <p className={styles.noData}>Sin próximos feriados</p>
          )}
        </div>

        {/* QUINIELA */}
        <div className={styles.block}>
          <div className={styles.blockLabel}>Quiniela — cabezas del día</div>
          {quiniela?.provincias?.map(prov => (
            <div key={prov.nombre}>
              <div className={styles.quinProv}>{prov.nombre}</div>
              <table className={styles.quinTable}>
                <thead>
                  <tr>
                    <th>Sorteo</th>
                    <th>Cabeza</th>
                  </tr>
                </thead>
                <tbody>
                  {prov.sorteos.map(s => (
                    <tr key={s.nombre}>
                      <td>{s.nombre}</td>
                      <td className={!s.jugado ? styles.nd : ''}>
                        {s.jugado ? s.cabeza : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
