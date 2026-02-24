import { useBuildForm } from "../hooks/useBuildForm"
import { useCity } from "../context/CityContext"
import BuildTypeSelector from "../components/build/BuildTypeSelector"
import RequiredMaterials from "../components/build/RequiredMaterials"
import BuildLog          from "../components/build/BuildLog"
import BuildForm         from "../components/build/BuildForm"
import CostSummary       from "../components/build/CostSummary"
import styles from "./BuildPage.module.css"
import "../styles/components.css"

export default function BuildPage() {
  const { state } = useCity()
  const { selectedType, handleSelectType, buildType, form, handleChange, handleSubmit, handleReset, notif } = useBuildForm()

  return (
    <section>
      <h1 className="sec-title">Construction</h1>
      {state.selectedMapIdx !== null
        ? <p style={{ color: "var(--accent3)", fontSize: ".88rem", marginBottom: "1rem" }}>
            Plot #{state.selectedMapIdx} selected - building will be placed here
          </p>
        : <p style={{ color: "var(--dim)", fontSize: ".88rem", marginBottom: "1rem" }}>
            Tip: click a green cell on the map first to choose the exact plot
          </p>
      }
      <div className={styles.layout}>
        <div className={styles.left}>
          <BuildTypeSelector selectedType={selectedType} onSelect={handleSelectType} />
          <RequiredMaterials buildType={buildType} />
          <BuildLog />
        </div>
        <div className={styles.right}>
          <BuildForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
            notif={notif}
          />
          <CostSummary buildType={buildType} workers={form.workers} days={form.days} />
        </div>
      </div>
    </section>
  )
}
