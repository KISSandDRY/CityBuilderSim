import { useCity } from '../../context/CityContext'
import styles from './BudgetCard.module.css'

export default function BudgetCard() {
  const { state } = useCity()
  const { budget, budgetSpent } = state

  const total    = budget + budgetSpent
  const spentPct = total > 0 ? Math.round((budgetSpent / total) * 100) : 0
  const freePct  = 100 - spentPct

  const rows = [
    { label: '💰 Available', value: budget.toLocaleString() + ' ₴',      color: 'var(--accent3)' },
    { label: '📤 Spent',     value: budgetSpent.toLocaleString() + ' ₴',  color: 'var(--accent2)' },
    { label: '📊 Total',     value: total.toLocaleString() + ' ₴',        color: 'var(--accent)'  },
  ]

  const items = []
  let i = 0
  do {
    const row = rows[i]
    items.push(
      <div key={i} className={styles.row}>
        <span className={styles.rowLabel}>{row.label}</span>
        <span className={styles.rowValue} style={{ color: row.color }}>{row.value}</span>
      </div>
    )
    i++
  } while (i < rows.length)

  return (
    <div className={styles.card}>
      <div className={styles.title}>💰 City Budget</div>
      <div className={styles.bigNum}>{budget.toLocaleString()} ₴</div>
      <div className={styles.subLabel}>Current budget</div>
      <div className={styles.donutWrap}>
        <svg className={styles.donut} viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border)" strokeWidth="3.8" />
          <circle
            cx="18" cy="18" r="15.9"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="3.8"
            strokeDasharray={`${spentPct} ${freePct}`}
            strokeDashoffset="25"
            strokeLinecap="round"
          />
        </svg>
        <div className={styles.donutLabel}>
          <span className={styles.donutPct}>{freePct}%</span>
          <span className={styles.donutSub}>free</span>
        </div>
      </div>
      <div className={styles.rows}>{items}</div>
    </div>
  )
}
