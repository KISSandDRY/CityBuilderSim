import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <div className={styles.logo}>CITYBUILDERSIM</div>
          <p className={styles.desc}>
            A city management simulator. Build, develop and manage your own city.
          </p>
        </div>
        <div>
          <div className={styles.colTitle}>🔧 Features</div>
          <ul className={styles.list}>
            <li>🏙️ City map on CSS Grid</li>
            <li>🏗️ Construction management</li>
            <li>📦 Resource control</li>
            <li>👷 Worker management</li>
            <li>💰 Financial tracking</li>
          </ul>
        </div>
        <address className={styles.contacts}>
          <div className={styles.colTitle}>📞 Contact</div>
          <ul className={styles.list}>
            <li>📍 <span className={styles.dim}>Address:</span> 1 City St, Bandera</li>
            <li>📞 <span className={styles.dim}>Phone:</span> +1 212 123-4567</li>
            <li>📧 <span className={styles.dim}>Email:</span> info@citybuildersim.com</li>
            <li>🌐 <span className={styles.dim}>Web:</span> citybuildersim.com</li>
            <li>🕐 <span className={styles.dim}>Support:</span> 9am – 6pm</li>
          </ul>
        </address>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 CityBuilderSim. All rights reserved.</span>
      </div>
    </footer>
  )
}
