// TODO: import actions and implement reducer for each action
import { ADD_BOOK, REMOVE_BOOK, SEARCH_BOOKS } from './actions';
export default function reducer(prevState, { action, payload }) {
  switch (action) {
    case ADD_BOOK:
      const addedFavoriteBooks = [...prevState.favoriteBooks, payload]
      saveToLocalStorage(addedFavoriteBooks)
      return {
        ...prevState,
        favoriteBooks: [...prevState.favoriteBooks, payload]
      }
    case REMOVE_BOOK:
      const removedFavoriteBooks = prevState.favoriteBooks.filter(book => book.id !== payload)
      saveToLocalStorage(removedFavoriteBooks)
      return {
        ...prevState,
        favoriteBooks: prevState.favoriteBooks.filter(book => book.id !== payload)
      }
    case SEARCH_BOOKS:
      return {
        ...prevState,
        bookSearchResults: payload
      }
    default:
      return prevState
  }
}

// This helper function stores the favoriteBook state in localStorage as a string
function saveToLocalStorage(favBooks) {
  localStorage.setItem('favoriteBooks', JSON.stringify(favBooks))
}