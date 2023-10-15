import { Link } from 'react-router-dom'
import { useBookContext } from '../../context/book'
import BookList from '../../components/bookList'
import styles from './style.module.css'

export default function Favorites() {
  const [{ favoriteBooks }] = useBookContext()

  return (
    <main className={styles.favorites}>
      <h1>Favorite Books</h1>
      {favoriteBooks?.length > 0 ? <BookList books={favoriteBooks} /> : <NoBookText />}
    </main>
  )
}

function NoBookText() {
  return (
    <div className={styles.noBooks}>
      <p><strong>You don't have any books saved to your favorites.</strong></p>
      <p>Why don't you <Link to="/search">go to search</Link> and add some?</p>
    </div>
  )
}