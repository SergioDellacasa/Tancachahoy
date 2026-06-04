import styles from './SectionRule.module.css'

export function SectionRule({ label, info }) {
  return (
    <div className={styles.rule}>
      <span className={styles.label}>{label}</span>
      <div className={styles.line} />
      {info && <span className={styles.info}>{info}</span>}
    </div>
  )
}
