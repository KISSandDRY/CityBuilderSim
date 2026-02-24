import { useCity } from '../../context/CityContext'
import { Card, CardTitle } from '../ui/Card'
import styles from './RequiredMaterials.module.css'

export default function RequiredMaterials({ buildType }) {
  const { state } = useCity()

  if (!buildType) {
    return (
      <Card>
        <CardTitle>🧱 Required Materials</CardTitle>
        <p className={styles.hint}>Select a building type to see requirements.</p>
      </Card>
    )
  }

  return (
    <Card>
      <CardTitle>🧱 Required for: {buildType.name}</CardTitle>
      <div className={styles.list}>
        {Object.entries(buildType.req).map(([key, needed]) => {
          const mat    = state.materials[key]
          const have   = mat ? mat.amount : 0
          const enough = have >= needed
          return (
            <div key={key} className={styles.item}>
              <span className={styles.name}>
                {mat?.icon ?? '📦'} {mat?.name ?? key}
              </span>
              <span className={styles.amounts}>
                Need: <strong>{needed} t</strong>
                {' | '}
                Have:{' '}
                <strong className={enough ? styles.enough : styles.short}>{have} t</strong>
                {' '}{enough ? '✅' : '❌'}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
