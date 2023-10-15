// TODO: Load/parse 'favoriteBooks' from localStorage
// TODO: Export initial state object as default
// initial state should have keys bookSearchResults and favoriteBooks
// bookSearchResults should be an empty array
// favoriteBooks should be the value from localStorage or an empty array if localStorage value is falsy
const getFavBooks = localStorage.getItem('favoriteBooks')

const initialState = {
    bookSearchResults: [],
    favoriteBooks: getFavBooks ? JSON.parse(getFavBooks) : []
}

export default initialState