import BookPreview from "../bookPreview"
import styles from './style.module.css'

export default function BookList({books}) {
  return (
    <div className={styles.bookList}>
      {books.map(book => <BookPreview key={book.id} {...book} />)}
    </div>
  )
}