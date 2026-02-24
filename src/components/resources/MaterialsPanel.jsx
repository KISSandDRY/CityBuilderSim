import { useState } from 'react'
import { useCity } from '../../context/CityContext'
import { Card, CardTitle } from '../ui/Card'
import styles from './MaterialsPanel.module.css'
import '../../styles/components.css'

const ICON_OPTIONS = [
  '🧱','🪨','🪵','⚙️','🔩','🔧','💎','🏗️','🪟','🏜️',
  '🌲','🌊','🔥','⚡','💡','🧪','🛢️','🪙','💰','🪣',
]

const UNIT_OPTIONS = ['t', 'kg', 'm³', 'pcs', 'L', 'kW', 'MW', 'km']

const INITIAL_FORM = { name: '', icon: '🧱', unit: 't', amount: '', max: '' }

export default function MaterialsPanel() {
  const { state, dispatch } = useCity()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm]         = useState(INITIAL_FORM)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const name   = form.name.trim()
    const amount = parseInt(form.amount)
    const max    = parseInt(form.max)

    if (!name)                           { setError('Enter resource name'); return }
    if (isNaN(amount) || amount < 0)     { setError('Enter a valid initial amount'); return }
    if (isNaN(max) || max <= 0)          { setError('Maximum must be greater than 0'); return }
    if (amount > max)                    { setError('Initial amount cannot exceed maximum'); return }

    const key = name.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now()
    dispatch({ type: 'ADD_MATERIAL', payload: { key, name, icon: form.icon, unit: form.unit, amount, max } })

    setSuccess(`✅ Resource "${name}" added!`)
    setForm(INITIAL_FORM)
    setTimeout(() => { setSuccess(''); setShowForm(false) }, 2000)
  }

  return (
    <Card>
      <div className={styles.header}>
        <CardTitle>🧱 City Materials</CardTitle>
        <button
          className={styles.addBtn}
          onClick={() => { setShowForm(v => !v); setError(''); setSuccess('') }}
        >
          {showForm ? '✕ Cancel' : '+ New Resource'}
        </button>
      </div>

      {showForm && (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.formTitle}>📦 Add New Resource</div>
          <div className="form-group">
            <label htmlFor="res-name">Resource name</label>
            <input
              id="res-name"
              name="name"
              type="text"
              placeholder="E.g.: Gold, Oil, Timber..."
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Icon</label>
            <div className={styles.iconGrid}>
              {ICON_OPTIONS.map(ico => (
                <button
                  key={ico}
                  type="button"
                  className={`${styles.iconBtn} ${form.icon === ico ? styles.iconBtnActive : ''}`}
                  onClick={() => setForm(f => ({ ...f, icon: ico }))}
                >
                  {ico}
                </button>
              ))}
            </div>
            <div className={styles.iconPreview}>
              Selected: <span className={styles.iconPreviewVal}>{form.icon}</span>
            </div>
          </div>
          <div className="form-group">
            <label>Unit of measurement</label>
            <div className={styles.unitRow}>
              {UNIT_OPTIONS.map(u => (
                <button
                  key={u}
                  type="button"
                  className={`${styles.unitBtn} ${form.unit === u ? styles.unitBtnActive : ''}`}
                  onClick={() => setForm(f => ({ ...f, unit: u }))}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="res-amount">Initial amount</label>
              <input
                id="res-amount"
                name="amount"
                type="number"
                placeholder="0"
                min="0"
                value={form.amount}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="res-max">Maximum ({form.unit})</label>
              <input
                id="res-max"
                name="max"
                type="number"
                placeholder="1000"
                min="1"
                value={form.max}
                onChange={handleChange}
              />
            </div>
          </div>
          {form.name && form.amount !== '' && form.max && (
            <div className={styles.preview}>
              <span>{form.icon} {form.name}</span>
              <span className={styles.previewAmt}>{form.amount || 0} / {form.max} {form.unit}</span>
            </div>
          )}
          {error   && <div className="notif error">{error}</div>}
          {success && <div className="notif success">{success}</div>}
          <button type="submit" className="btn btn-success" style={{ width: '100%' }}>
            📦 Add Resource
          </button>
        </form>
      )}

      <div className={styles.list}>
        {Object.entries(state.materials).map(([key, mat]) => {
          const unit = mat.unit ?? 't'
          const pct  = Math.round((mat.amount / mat.max) * 100)
          let fillColor
          if (pct >= 70)      fillColor = 'var(--accent3)'
          else if (pct >= 40) fillColor = 'var(--gold)'
          else                fillColor = 'var(--accent2)'
          return (
            <div key={key} className={styles.item}>
              <div className={styles.top}>
                <span className={styles.name}>{mat.icon} {mat.name}</span>
                <span className={styles.amount}>{mat.amount} / {mat.max} {unit}</span>
              </div>
              <div className={styles.bar}>
                <div className={styles.fill} style={{ width: `${pct}%`, background: fillColor }} />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
