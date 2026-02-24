import { useCity } from '../../context/CityContext'
import styles from './HappinessIndicator.module.css'

export default function HappinessIndicator() {
  const { state } = useCity()
  const { happiness } = state

  let level, icon, color, desc
  if (happiness >= 80) {
    level = 'Excellent'; icon = '😄'; color = 'var(--accent3)'; desc = 'Residents are thrilled!'
  } else if (happiness >= 60) {
    level = 'Good';      icon = '🙂'; color = 'var(--accent)';  desc = 'Residents are satisfied'
  } else if (happiness >= 40) {
    level = 'Fair';      icon = '😐'; color = 'var(--gold)';    desc = 'Some complaints from residents'
  } else {
    level = 'Poor';      icon = '😞'; color = 'var(--accent2)'; desc = 'Residents are unhappy!'
  }

  const SEGMENTS = 10
  const filled   = Math.round(happiness / 100 * SEGMENTS)
  const segs     = []
  let s = 0
  do {
    segs.push(
      <div
        key={s}
        className={styles.seg}
        style={{ background: s < filled ? color : 'var(--border)' }}
      />
    )
    s++
  } while (s < SEGMENTS)

  return (
    <div className={styles.card}>
      <div className={styles.title}>😊 Resident Happiness</div>
      <div className={styles.face}>{icon}</div>
      <div className={styles.pct} style={{ color }}>{happiness}%</div>
      <div className={styles.level} style={{ color }}>{level}</div>
      <div className={styles.desc}>{desc}</div>
      <div className={styles.scale}>{segs}</div>
      <div className={styles.factors}>
        <div className={styles.factorTitle}>What affects it:</div>
        <div className={styles.factor}><span style={{ color: 'var(--accent3)' }}>+</span> Parks and green spaces</div>
        <div className={styles.factor}><span style={{ color: 'var(--accent3)' }}>+</span> Building upgrades</div>
        <div className={styles.factor}><span style={{ color: 'var(--accent2)' }}>−</span> Factories and industrial buildings</div>
      </div>
    </div>
  )
}
