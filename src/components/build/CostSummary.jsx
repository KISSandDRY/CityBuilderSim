import { useMemo } from 'react'
import { Card, CardTitle } from '../ui/Card'
import styles from './CostSummary.module.css'
import '../../styles/components.css'

export default function CostSummary({ buildType, workers, days }) {
  const rows = useMemo(() => {
    if (!buildType) return []
    const w = parseInt(workers) || buildType.workers
    const d = parseInt(days)    || buildType.days
    return [
      { label: '🏛️ Base cost',                   amount: buildType.cost                    },
      { label: `👷 Labour (${w}×${d} days)`,     amount: w * d * 500                       },
      { label: '🧱 Materials',                    amount: Math.round(buildType.cost * 0.4) },
    ]
  }, [buildType, workers, days])

  const total = rows.reduce((s, r) => s + r.amount, 0)

  return (
    <Card>
      <CardTitle>💰 Construction Cost</CardTitle>
      {rows.length === 0 ? (
        <p className={styles.hint}>Fill in the form to calculate cost</p>
      ) : (
        <table className="fin-table">
          <thead>
            <tr><th>Item</th><th>Cost</th></tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.label}</td>
                <td className={i === 0 ? 'income' : 'expense'}>{r.amount.toLocaleString()} ₴</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={styles.total}>
        <span>Total cost:</span>
        <span className={styles.totalVal}>{total.toLocaleString()} ₴</span>
      </div>
    </Card>
  )
}
