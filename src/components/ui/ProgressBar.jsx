import '../../styles/components.css'

export default function ProgressBar({ label, pct, color = 'var(--accent)' }) {
  return (
    <div className="progress-wrap">
      <div className="progress-lbl">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}
