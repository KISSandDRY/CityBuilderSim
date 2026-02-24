import '../../styles/components.css'

export default function Notification({ notif }) {
  if (!notif) return null
  return (
    <div className={`notif ${notif.type}`} role="alert">
      {notif.msg}
    </div>
  )
}
