import { useCity } from '../../context/CityContext'
import styles from './StatusBar.module.css'

export default function StatusBar() {
  const { state } = useCity()
  const { budget, workers, materials, happiness, objects } = state

  const items = [
    { label: '💰 Budget',   value: budget.toLocaleString() + ' ₴' },
    { label: '👷 Workers',  value: `${workers.active} busy / ${workers.total} total` },
    { label: '🧱 Brick',   value: materials.brick.amount + ' t' },
    { label: '🌳 Happiness', value: happiness + '%' },
    { label: '🏠 Buildings', value: objects },
    { label: '📅 Day',      value: state.day },
  ]

  return (
    <div className={styles.bar} role="status" aria-label="City status">
      {items.map(item => (
        <span key={item.label}>
          {item.label}: <span className={styles.val}>{item.value}</span>
        </span>
      ))}
    </div>
  )
}
