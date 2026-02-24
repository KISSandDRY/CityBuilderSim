import { useState } from 'react'
import { useCity } from '../context/CityContext'
import CityMap from '../components/city/CityMap'
import CityStats from '../components/city/CityStats'
import BuildingCard from '../components/city/BuildingCard'
import BudgetCard from '../components/ui/BudgetCard'
import HappinessIndicator from '../components/ui/HappinessIndicator'
import { Card, CardTitle } from '../components/ui/Card'
import { BUILD_TYPES, CATEGORIES } from '../data/constants'
import styles from './CityPage.module.css'
import '../styles/components.css'

export default function CityPage({ onNavigate }) {
  const { state, dispatch } = useCity()
  const [modalTarget, setModalTarget]     = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')

  function handleCellClick(type, mapIdx) {
    if (type === 'empty' || type === 'grass') {
      dispatch({ type: 'SELECT_MAP_CELL', payload: mapIdx })
      onNavigate('build')
    } else if (type !== 'construction') {
      setModalTarget({ mapIdx, type })
    }
  }

  function confirmDemolish() {
    dispatch({ type: 'DEMOLISH', payload: { mapIdx: modalTarget.mapIdx } })
    setModalTarget(null)
  }

  const filteredTypes = []
  let fi = 0
  do {
    const bt = BUILD_TYPES[fi]
    if (activeCategory === 'all' || bt.category === activeCategory) {
      filteredTypes.push(bt)
    }
    fi++
  } while (fi < BUILD_TYPES.length)

  const DEMOLISHABLE = ['house','house_lv2','house_lv3','biz','biz_lv2','biz_lv3','factory','factory_lv2','park','park_lv2']

  return (
    <article>
      <div className={styles.topBar}>
        <h1 className="sec-title" style={{ margin: 0, flex: 1 }}>🏙️ My City</h1>
        <div className={styles.dayBlock}>
          <span className={styles.dayLabel}>📅 Day</span>
          <span className={styles.dayNum}>{state.day}</span>
          <button className="btn btn-primary" onClick={() => dispatch({ type: 'NEXT_DAY' })}>
            ⏩ Next Day
          </button>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.mapCol}>
          <Card>
            <CardTitle>
              🗺️ City Map — CSS Grid 14×10
              <span className={styles.mapHint}> · Click a building to open its card</span>
            </CardTitle>
            <CityMap onCellClick={handleCellClick} />
          </Card>

          <Card>
            <CardTitle>🏗️ Available Buildings</CardTitle>
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
            <div className={styles.buildList}>
              {filteredTypes.map(bt => (
                <div
                  key={bt.type}
                  className={styles.buildItem}
                  onClick={() => onNavigate('build')}
                  title="Click to go to Construction"
                >
                  <span className={styles.buildIcon}>{bt.icon}</span>
                  <div className={styles.buildInfo}>
                    <div className={styles.buildName}>{bt.name}</div>
                    <div className={styles.buildMeta}>
                      💰 {bt.cost.toLocaleString()} ₴ · 👷 {bt.workers} · 📅 {bt.days} days
                    </div>
                  </div>
                  <span className={styles.buildArrow}>→</span>
                </div>
              ))}
              {filteredTypes.length === 0 && (
                <p style={{ color: 'var(--dim)', fontSize: '.85rem' }}>No buildings in this category</p>
              )}
            </div>
          </Card>

          <div className={styles.indicatorRow}>
            <BudgetCard />
            <HappinessIndicator />
          </div>
        </div>

        <aside className={styles.statsCol}>
          <CityStats />
        </aside>
      </div>

      {modalTarget && (
        <div className={styles.overlay} onClick={() => setModalTarget(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setModalTarget(null)}>✕</button>
            <BuildingCard
              mapIdx={modalTarget.mapIdx}
              type={modalTarget.type}
              onClose={() => setModalTarget(null)}
            />
            {DEMOLISHABLE.includes(modalTarget.type) && (
              <div className={styles.demolishSection}>
                <p className={styles.demolishHint}>
                  🔨 Demolish this building? <strong>50% of materials</strong> will be returned. No money refund.
                </p>
                <button className="btn btn-danger" style={{ width: '100%' }} onClick={confirmDemolish}>
                  🔨 Demolish Building
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  )
}
