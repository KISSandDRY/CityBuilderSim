import '../../styles/components.css'

export function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>
}

export function CardTitle({ children }) {
  return <div className="card-title">{children}</div>
}
