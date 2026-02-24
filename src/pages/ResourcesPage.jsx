import BudgetCard         from '../components/ui/BudgetCard'
import HappinessIndicator from '../components/ui/HappinessIndicator'
import MaterialsPanel     from '../components/resources/MaterialsPanel'
import WorkersPanel       from '../components/resources/WorkersPanel'
import styles from './ResourcesPage.module.css'
import '../styles/components.css'

export default function ResourcesPage() {
  return (
    <section>
      <h1 className="sec-title">📦 City Resources</h1>
      <div className={styles.layout}>
        <BudgetCard />
        <HappinessIndicator />
        <MaterialsPanel />
        <WorkersPanel />
      </div>
    </section>
  )
}
