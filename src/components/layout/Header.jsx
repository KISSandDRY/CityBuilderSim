import styles from './Header.module.css'

export default function Header({ pages, currentPage, onNavigate }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        CITY<em>BUILDER</em>SIM
      </div>
      <nav className={styles.nav} aria-label="Main navigation">
        {pages.map(page => (
          <button
            key={page.id}
            className={`${styles.navBtn} ${currentPage === page.id ? styles.active : ''}`}
            onClick={() => onNavigate(page.id)}
          >
            {page.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
