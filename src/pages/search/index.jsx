import BookList from '../../components/bookList'
import { useBookContext } from "../../context/book";
import * as actions from '../../context/book/actions'
import { useState, useRef } from 'react'
import styles from './style.module.css'

export default function Search() {
  const [{bookSearchResults}, dispatch] = useBookContext()
  const [query, setQuery] = useState("")
  const [previousQuery, setPreviousQuery] = useState()
  const [fetching, setFetching] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (fetching || !query.trim() || query === previousQuery) return
    setPreviousQuery(query)
    setFetching(true)
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?langRestrict=en&q=${query}&maxResults=16`
    )
    if (res.status !== 200) return
    const data = await res.json()
    dispatch({
      action: actions.SEARCH_BOOKS,
      payload: data
        .items
        .map(({id, volumeInfo}) => ({
          ...volumeInfo,
          id,
          thumbnail: volumeInfo?.imageLinks?.thumbnail
        }))
    })
    setFetching(false)
  }

  const inputRef = useRef()
  const inputDivRef = useRef()

  return (
    <main className={styles.search}>
      <h1>Book Search</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="book-search">Search by author, title, and/or keywords:</label>
        <div ref={inputDivRef}>
          <input
            ref={inputRef}
            type="text"
            name="book-search"
            id="book-search"
            value={query}
            onChange={e => setQuery(e.target.value)} />
          <button type="submit">Submit</button>
        </div>
      </form>
      {
        fetching
        ? <Loading />
        : bookSearchResults?.length
          ? <BookList books={bookSearchResults} />
          : <NoResults
            {...{inputRef, inputDivRef, previousQuery}}
            clearSearch={() => setQuery("")}/>
      }
    </main>
  )
}

function Loading() {
  return <span className={styles.loading}>Loading...⌛</span>
}

function NoResults({ inputDivRef, inputRef, previousQuery, clearSearch }) {
  function handleLetsSearchClick() {
    inputRef.current.focus()
    if (previousQuery) clearSearch()
    if (inputDivRef.current.classList.contains(styles.starBounce)) return
    inputDivRef.current.classList.add(styles.starBounce)
    inputDivRef.current.onanimationend = function () {
      inputDivRef.current.classList.remove(styles.starBounce)
    }
  }
  return (
    <div className={styles.noResults}>
      <p><strong>{previousQuery ? `No Books Found for "${previousQuery}"` : "Nothing to see here yet. 👻👀"}</strong></p>
      <button onClick={handleLetsSearchClick}>
        {
          previousQuery
          ? `Search again?`
          : `Let's find a book! 🔍`
        }
      </button>
    </div>
  )
}