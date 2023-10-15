import { Link } from "react-router-dom"
import styles from './style.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" style={{textDecoration: 'none'}}>
        <strong>Booker 📚</strong>
      </Link>
      <div className={styles.links}>
        <Link to="/favorites">Favorites</Link>
        <Link to="/search">Search</Link>
      </div>
    </header>
  )
}