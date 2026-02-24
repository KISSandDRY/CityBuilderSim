import { useCity } from '../../context/CityContext'
import { Card, CardTitle } from '../ui/Card'
import styles from './WorkersPanel.module.css'
import '../../styles/components.css'

export default function WorkersPanel() {
  const { state, dispatch } = useCity()
  const { workers } = state

  function hireWorker() {
    if (state.budget < 10000) {
      alert('❌ Insufficient budget! Need 10,000 ₴')
      return
    }
    dispatch({ type: 'HIRE_WORKER' })
  }

  function fireWorker() {
    if (workers.total <= 0)              { alert('❌ No workers to dismiss!');       return }
    if (workers.active >= workers.total) { alert('❌ All workers are busy!'); return }
    dispatch({ type: 'FIRE_WORKER' })
  }

  return (
    <Card>
      <CardTitle>👷 City Workers</CardTitle>
      <div className={styles.center}>
        <div className={styles.sub}>Busy / Total</div>
        <div className={styles.bigNum}>{workers.active} / {workers.total}</div>
        <div className={styles.dots}>
          {Array.from({ length: workers.total }, (_, i) => {
            const isBusy = i < workers.active
            return (
              <div
                key={i}
                className={`${styles.dot} ${isBusy ? styles.busy : ''}`}
                title={`${workers.names[i] ?? 'Worker ' + (i + 1)} — ${isBusy ? 'Busy' : 'Free'}`}
              />
            )
          })}
        </div>
        <div className={styles.btns}>
          <button className="btn btn-success" onClick={hireWorker}>+ Hire</button>
          <button className="btn btn-danger"  onClick={fireWorker}>− Dismiss</button>
        </div>
        <p className={styles.legend}>🟢 Green — busy · 🟠 Orange — free</p>
      </div>
      <div style={{ marginTop: '1.2rem' }}>
        <div className="card-title">📋 Worker List</div>
        <div className={styles.list}>
          {Array.from({ length: workers.total }, (_, i) => {
            const isBusy = i < workers.active
            const name   = workers.names[i] ?? `Worker ${i + 1}`
            return (
              <div key={i} className={styles.workerRow}>
                <span>👷 {name}</span>
                <span className={isBusy ? styles.statusBusy : styles.statusFree}>
                  {isBusy ? '⚒️ Busy' : '✅ Free'}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
