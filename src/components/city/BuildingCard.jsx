import { useCity } from '../../context/CityContext'
import { UPGRADE_CONFIG, getBaseType, getLevel, CELL_CONFIG } from '../../data/constants'
import styles from './BuildingCard.module.css'
import '../../styles/components.css'

export default function BuildingCard({ mapIdx, type, onClose }) {
  const { state, dispatch } = useCity()

  const baseType   = getBaseType(type)
  const currentLvl = getLevel(type)
  const cfg        = UPGRADE_CONFIG[baseType]
  const cellCfg    = CELL_CONFIG[type] ?? CELL_CONFIG.house
  const canUpgrade = cfg && currentLvl < cfg.levels.length - 1

  let resourcesOk = true
  let missingList = []
  if (cfg) {
    const reqKeys = Object.keys(cfg.upgradeReq)
    let i = 0
    do {
      const key    = reqKeys[i]
      const needed = cfg.upgradeReq[key]
      const mat    = state.materials[key]
      const have   = mat ? mat.amount : 0
      if (have < needed) {
        resourcesOk = false
        missingList.push(`${mat?.icon ?? '📦'} ${mat?.name ?? key}: have ${have}, need ${needed}`)
      }
      i++
    } while (i < reqKeys.length)
  }

  const budgetOk = cfg ? state.budget >= cfg.upgradeCost : false

  function handleUpgrade() {
    dispatch({ type: 'UPGRADE_OBJECT', payload: { mapIdx } })
    onClose()
  }

  const CATEGORY_LABELS = {
    house:   { cat: '🏠 Residential', color: 'var(--accent)'  },
    biz:     { cat: '🏢 Commercial',  color: 'var(--gold)'    },
    factory: { cat: '🏭 Industrial',  color: 'var(--accent2)' },
    park:    { cat: '🌳 Green zone',  color: 'var(--accent3)' },
  }
  const catInfo = CATEGORY_LABELS[baseType] ?? { cat: 'Infrastructure', color: 'var(--dim)' }

  return (
    <div className={styles.card}>
      <div className={styles.iconWrap} style={{ background: cellCfg.bg }}>
        <span className={styles.icon}>{cellCfg.icon || '🏗️'}</span>
      </div>
      <div className={styles.header}>
        <div className={styles.name}>{cellCfg.label}</div>
        <div className={styles.category} style={{ color: catInfo.color }}>{catInfo.cat}</div>
      </div>
      {cfg && (
        <div className={styles.levels}>
          {cfg.levels.map((lv, idx) => (
            <div
              key={idx}
              className={`${styles.levelDot} ${idx <= currentLvl ? styles.levelDotActive : ''}`}
              title={lv.label}
            />
          ))}
          <span className={styles.levelLabel}>{cfg.levels[currentLvl]?.label ?? 'Level 1'}</span>
        </div>
      )}
      {cfg && (
        <div className={styles.stats}>
          {cfg.levels[currentLvl]?.popBonus > 0 && (
            <div className={styles.stat}>
              <span className={styles.statLabel}>👥 Population</span>
              <span className={styles.statVal}>+{cfg.levels[currentLvl].popBonus}</span>
            </div>
          )}
          {cfg.levels[currentLvl]?.incomePerDay > 0 && (
            <div className={styles.stat}>
              <span className={styles.statLabel}>💰 Income/day</span>
              <span className={styles.statVal} style={{ color: 'var(--accent3)' }}>
                +{cfg.levels[currentLvl].incomePerDay} ₴
              </span>
            </div>
          )}
          {cfg.levels[currentLvl]?.happyBonus !== undefined && cfg.levels[currentLvl].happyBonus !== 0 && (
            <div className={styles.stat}>
              <span className={styles.statLabel}>😊 Happiness</span>
              <span className={styles.statVal} style={{ color: cfg.levels[currentLvl].happyBonus > 0 ? 'var(--accent3)' : 'var(--accent2)' }}>
                {cfg.levels[currentLvl].happyBonus > 0 ? '+' : ''}{cfg.levels[currentLvl].happyBonus}%
              </span>
            </div>
          )}
        </div>
      )}
      {canUpgrade && (
        <div className={styles.upgradeSection}>
          <div className={styles.upgradeTitle}>
            ⬆️ Upgrade to {cfg.levels[currentLvl + 1]?.label}
          </div>
          <div className={styles.upgradeCost}>💰 {cfg.upgradeCost.toLocaleString()} ₴</div>
          <div className={styles.upgradeReq}>
            {Object.entries(cfg.upgradeReq).map(([key, amt]) => {
              const mat  = state.materials[key]
              const have = mat?.amount ?? 0
              const ok   = have >= amt
              return (
                <span key={key} className={ok ? styles.reqOk : styles.reqBad}>
                  {mat?.icon} {amt} t
                </span>
              )
            })}
          </div>
          {missingList.length > 0 && (
            <div className={styles.warning}>❌ Missing: {missingList.join(', ')}</div>
          )}
          {!budgetOk && (
            <div className={styles.warning}>❌ Insufficient budget</div>
          )}
          <button
            className="btn btn-success"
            style={{ width: '100%', marginTop: '0.5rem' }}
            onClick={handleUpgrade}
            disabled={!resourcesOk || !budgetOk}
          >
            ⬆️ Upgrade
          </button>
        </div>
      )}
      {!canUpgrade && cfg && (
        <div className={styles.maxLevel}>✨ Maximum level reached</div>
      )}
    </div>
  )
}
