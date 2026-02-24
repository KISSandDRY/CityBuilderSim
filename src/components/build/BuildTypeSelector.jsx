import { useState } from 'react'
import { BUILD_TYPES, CATEGORIES } from '../../data/constants'
import { Card, CardTitle } from '../ui/Card'
import styles from './BuildTypeSelector.module.css'

export default function BuildTypeSelector({ selectedType, onSelect }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = []
  let i = 0
  do {
    const bt = BUILD_TYPES[i]
    if (activeCategory === 'all' || bt.category === activeCategory) {
      filtered.push(bt)
    }
    i++
  } while (i < BUILD_TYPES.length)

  return (
    <Card>
      <CardTitle>🏛️ Select Building Type</CardTitle>
      <div className={styles.filterBar}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.filterActive : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {filtered.map(bt => (
          <button
            key={bt.type}
            className={`${styles.card} ${styles['type_' + bt.type.split('_')[0]]} ${selectedType === bt.type ? styles.selected : ''}`}
            onClick={() => onSelect(bt.type)}
          >
            <div className={styles.icon}>{bt.icon}</div>
            <div className={styles.name}>{bt.name}</div>
            <div className={styles.cost}>
              💰 <span>{bt.cost.toLocaleString()} ₴</span>
              {' · '}👷 {bt.workers}
              {' · '}📅 {bt.days} days
            </div>
            {bt.incomePerDay > 0 && (
              <div className={styles.income}>📈 +{bt.incomePerDay} ₴/day</div>
            )}
            {bt.happyBonus !== 0 && (
              <div className={styles.happy} style={{ color: bt.happyBonus > 0 ? 'var(--accent3)' : 'var(--accent2)' }}>
                😊 {bt.happyBonus > 0 ? '+' : ''}{bt.happyBonus}% happiness
              </div>
            )}
          </button>
        ))}
      </div>
    </Card>
  )
}
