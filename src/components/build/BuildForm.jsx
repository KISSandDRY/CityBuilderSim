import { Card, CardTitle } from '../ui/Card'
import Notification from '../ui/Notification'
import styles from './BuildForm.module.css'
import '../../styles/components.css'

export default function BuildForm({ form, handleChange, handleSubmit, handleReset, notif }) {
  return (
    <Card>
      <CardTitle>📝 Construction Parameters</CardTitle>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Notification notif={notif} />
        <div className="form-group">
          <label htmlFor="f-name">Object name</label>
          <input
            id="f-name"
            name="name"
            type="text"
            placeholder="E.g.: House #5"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="f-workers">Workers</label>
            <input id="f-workers" name="workers" type="number" placeholder="0" min="1" value={form.workers} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="f-days">Days</label>
            <input id="f-days" name="days" type="number" placeholder="0" min="1" value={form.days} onChange={handleChange} />
          </div>
        </div>
        <div className={styles.actions}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            ⚒️ BUILD
          </button>
          <button type="button" className="btn btn-danger" onClick={handleReset}>
            ✕ Clear
          </button>
        </div>
      </form>
    </Card>
  )
}
