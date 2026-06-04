import styles from './Historia.module.css'

const DATOS = [
  { label: 'Fundación', val: '15 de octubre de 1913, con la apertura de la estación ferroviaria. Los ingleses que tendían las vías transformaron "Tancacho" en "Tancacha".' },
  { label: 'Población', val: '5.650 habitantes (2022) · Departamento Tercero Arriba, Córdoba' },
  { label: 'Economía', val: 'Agrícola-ganadera. Sede de Bunge Argentina. Soja, maíz, maní, trigo, sorgo y avena.' },
  { label: 'Patrona', val: 'Santa Teresa de Jesús · Fiesta patronal el 15 de octubre' },
  { label: 'Hijo ilustre', val: 'Actor Javier Portales, nacido el 21 de abril de 1937' },
  { label: 'Escudo', val: 'Cruz de la fe · Flecha del cacique Tancacho · Rosas de Santa Teresa · Líneas blancas por las vías del ferrocarril. Aprobado en 1965.' },
  { label: 'Cooperativa', val: 'COSP · Energía eléctrica y aguas corrientes · Fundada el 6/11/1943' },
  { label: 'Municipalidad', val: 'Bartolomé Mitre 543 · (03571) 460201' },
]

export default function Historia() {
  return (
    <section className={styles.wrap} id="historia">
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>Tancacha, Córdoba</p>
          <div className={styles.year}>1913</div>
          <h2 className={styles.titulo}>
            Un pueblo<br />con historia
          </h2>
        </div>

        <div className={styles.right}>
          <p className={styles.intro}>
            "Del quechua <em>Tankay</em> —empujar— y <em>Kancha</em> —pista de juego—.
            Un nombre que habla de raíces, de juego, de tierra."
          </p>

          <div className={styles.datos}>
            {DATOS.map((d, i) => (
              <div key={i} className={styles.dato}>
                <span className={styles.datoLabel}>{d.label}</span>
                <span className={styles.datoVal}>{d.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
