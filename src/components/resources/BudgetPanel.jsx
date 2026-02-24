import { useCity } from '../../context/CityContext'
import { Card, CardTitle } from '../ui/Card'
import ProgressBar from '../ui/ProgressBar'
import { FINANCE_ROWS } from '../../data/constants'
import styles from './BudgetPanel.module.css'
import '../../styles/components.css'

export default function BudgetPanel() {
  const { state } = useCity()
  const { budget, budgetSpent, workers } = state

  const total = budget + budgetSpent
  const pct   = total > 0 ? Math.round((budgetSpent / total) * 100) : 0

  return (
    <Card className={styles.panel}>
      <CardTitle>💰 City Budget</CardTitle>
      <div className={styles.bigNumber}>
        <div className={styles.icon}>🏦</div>
        <div className={styles.num}>{budget.toLocaleString()} ₴</div>
        <div className={styles.lbl}>Current budget</div>
      </div>
      <ProgressBar label="Spent" pct={pct} color="var(--gold)" />
      <table className="fin-table" style={{ marginTop: '1rem' }}>
        <thead><tr><th>Item</th><th>Amount</th></tr></thead>
        <tbody>
          {FINANCE_ROWS.map((row, i) => (
            <tr key={i}>
              <td>{row.label}</td>
              <td className={row.type === 'income' ? 'income' : 'expense'}>
                {row.type === 'income' ? '+' : '-'}{row.amount.toLocaleString()} ₴
              </td>
            </tr>
          ))}
          <tr>
            <td>👷 Worker wages</td>
            <td className="expense">-{(workers.active * 500).toLocaleString()} ₴</td>
          </tr>
        </tbody>
      </table>
    </Card>
  )
}
