import { useCity } from '../../context/CityContext'
import { CELL_CONFIG, MAP_LEGEND } from '../../data/constants'
import styles from './CityMap.module.css'

export default function CityMap({ onCellClick }) {
  const { state } = useCity()

  return (
    <div>
      <div className={styles.legend} aria-label="Map legend">
        {MAP_LEGEND.map(item => (
          <div key={item.type} className={styles.legendItem}>
            <div className={styles.legendColor} style={{ background: item.color }} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      {state.selectedMapIdx !== null && (
        <div className={styles.selectionHint}>
          📍 Plot #{state.selectedMapIdx} selected — building will be placed here
        </div>
      )}
      <div className={styles.grid} role="grid" aria-label="City map">
        {state.cityMap.map((type, idx) => {
          const cfg        = CELL_CONFIG[type] ?? CELL_CONFIG.empty
          const isSelected = idx === state.selectedMapIdx
          return (
            <div
              key={idx}
              role="gridcell"
              className={`${styles.cell} ${isSelected ? styles.selected : ''}`}
              data-type={type}
              title={cfg.label}
              style={{ background: cfg.bg }}
              onClick={() => onCellClick && onCellClick(type, idx)}
            >
              {isSelected ? '📍' : cfg.icon}
            </div>
          )
        })}
      </div>
    </div>
  )
}
