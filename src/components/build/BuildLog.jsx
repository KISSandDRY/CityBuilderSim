import { useState } from 'react'
import { useCity } from '../../context/CityContext'
import { Card, CardTitle } from '../ui/Card'
import styles from './BuildLog.module.css'

export default function BuildLog() {
  const { state } = useCity()
  const [visible, setVisible] = useState(true)

  return (
    <>
      {state.constructions.length > 0 && (
        <Card>
          <CardTitle>⚙️ Active Construction</CardTitle>
          <div className={styles.list}>
            {state.constructions.map(c => (
              <div key={c.id} className={styles.activeItem}>
                <div className={styles.activeTop}>
                  <span>{c.icon} {c.name}</span>
                  <span className={styles.daysLeft}>
                    ⏳ {c.daysLeft} / {c.daysTotal} days
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${((c.daysTotal - c.daysLeft) / c.daysTotal) * 100}%` }}
                  />
                </div>
                <div className={styles.activeSub}>
                  👷 {c.workers} workers assigned
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      <Card>
        <div className={styles.header}>
          <CardTitle>📋 Build Log</CardTitle>
          <button className={styles.toggleBtn} onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'}
          </button>
        </div>
        {visible && (
          <div className={styles.list}>
            {state.buildLog.map((entry, i) => (
              <div key={i} className={styles.item}>
                <span className={styles.time}>Day {entry.day}</span>
                <span>{entry.msg}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  )
}
