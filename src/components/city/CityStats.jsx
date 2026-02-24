import { useCity } from '../../context/CityContext'
import { Card, CardTitle } from '../ui/Card'
import ProgressBar from '../ui/ProgressBar'
import { getBaseType } from '../../data/constants'
import styles from './CityStats.module.css'

export default function CityStats() {
  const { state } = useCity()
  const { population, happiness, day, cityMap } = state

  const counts = { house: 0, biz: 0, factory: 0, park: 0, road: 0, construction: 0 }
  let mi = 0
  do {
    const base = getBaseType(cityMap[mi])
    if (counts[base] !== undefined) counts[base]++
    mi++
  } while (mi < cityMap.length)

  const totalBuildings = counts.house + counts.biz + counts.factory + counts.park

  const stats = [
    { val: population.toLocaleString(), lbl: 'Population' },
    { val: totalBuildings,              lbl: 'Buildings'  },
    { val: happiness + '%',             lbl: 'Happiness'  },
    { val: day,                         lbl: 'Day'        },
  ]

  const MAX_SLOTS = 40
  const progressData = []
  const progressSrc = [
    { label: '🏠 Residential', count: counts.house,   color: 'var(--accent)'  },
    { label: '🏢 Commercial',  count: counts.biz,     color: 'var(--gold)'    },
    { label: '🌳 Green',       count: counts.park,    color: 'var(--accent3)' },
    { label: '🏭 Industrial',  count: counts.factory, color: 'var(--accent2)' },
  ]
  let pi = 0
  do {
    const item = progressSrc[pi]
    progressData.push({
      ...item,
      pct: Math.min(100, Math.round((item.count / MAX_SLOTS) * 100)),
    })
    pi++
  } while (pi < progressSrc.length)

  const objRows = [
    { emoji: '🏠', name: 'Houses',        count: counts.house,        sub: `Population: +${counts.house * 80}`,                           color: 'var(--accent)'  },
    { emoji: '🏢', name: 'Businesses',    count: counts.biz,          sub: `Income: +${(counts.biz * 1200).toLocaleString()} ₴/day`,      color: 'var(--gold)'    },
    { emoji: '🏭', name: 'Factories',     count: counts.factory,      sub: `Income: +${(counts.factory * 2000).toLocaleString()} ₴/day`,  color: 'var(--accent2)' },
    { emoji: '🌳', name: 'Parks',         count: counts.park,         sub: `Happiness: +${counts.park * 3}%`,                             color: 'var(--accent3)' },
    { emoji: '🏗️', name: 'Under construction', count: counts.construction, sub: 'Currently being built',                                 color: 'var(--gold)'    },
  ]

  const objItems = []
  let oi = 0
  do {
    const obj = objRows[oi]
    if (obj.count > 0) {
      objItems.push(
        <div key={oi} className={styles.objItem} style={{ borderLeft: `3px solid ${obj.color}` }}>
          <span className={styles.objEmoji}>{obj.emoji}</span>
          <div className={styles.objInfo}>
            <div className={styles.objName}>{obj.name}</div>
            <div className={styles.objSub}>{obj.sub}</div>
          </div>
          <span className={styles.objCount}>{obj.count}</span>
        </div>
      )
    }
    oi++
  } while (oi < objRows.length)

  return (
    <div className={styles.wrap}>
      <Card>
        <CardTitle>📊 City Statistics</CardTitle>
        <div className="stat-grid">
          {stats.map(s => (
            <div key={s.lbl} className="stat-box">
              <span className="s-val">{s.val}</span>
              <span className="s-lbl">{s.lbl}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardTitle>🏗️ City Structure</CardTitle>
        <div className={styles.progressList}>
          {progressData.map(p => (
            <ProgressBar key={p.label} label={`${p.label} (${p.count})`} pct={p.pct} color={p.color} />
          ))}
        </div>
      </Card>
      <Card>
        <CardTitle>🏆 Infrastructure</CardTitle>
        <div className={styles.objList}>
          {objItems.length > 0 ? objItems : (
            <p style={{ color: 'var(--dim)', fontSize: '.85rem' }}>No buildings yet</p>
          )}
        </div>
      </Card>
    </div>
  )
}
