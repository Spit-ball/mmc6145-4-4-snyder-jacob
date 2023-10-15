import { Link } from 'react-router-dom'
import styles from './style.module.css'

export default function BookPreview({
  title,
  authors,
  thumbnail,
  id
}) {
  return (
    <Link to={`/book/${id}`} style={{textDecoration: 'none'}} className={styles.preview}>
      <img
        src={thumbnail ? thumbnail : "https://via.placeholder.com/128x190?text=NO COVER"}
        alt={title} />
      <div>
        <p><strong>{title}</strong></p>
        {authors && <p>By: {authors.join(", ").replace(/, ([^,]*)$/, ', and $1')}</p>}
      </div>
    </Link>
  )
}