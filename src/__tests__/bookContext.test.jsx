import { vi } from 'vitest'
import fakeBookContext from './util/fakeBookContextState.json'
import reducer from '../context/book/reducer'
import * as actions from '../context/book/actions'
import initialState from '../context/book/state'
import { useBookContext, BookProvider } from '../context/book'
import { render, screen, fireEvent } from '@testing-library/react'

describe('book context', () => {
  describe('actions', () => {
    it('should export ADD_BOOK', () => {
      expect(actions).toHaveProperty('ADD_BOOK')
    })
    it('should export SEARCH_BOOKS', () => {
      expect(actions).toHaveProperty('SEARCH_BOOKS')
    })
    it('should export REMOVE_BOOK', () => {
      expect(actions).toHaveProperty('REMOVE_BOOK')
    })
  })

  describe('initial state', () => {
    it('should have bookSearchResults property that is an empty array', async () => {
      expect(initialState).toHaveProperty('bookSearchResults', [])
    })
    it('should have favoriteBooks property that is an empty array if localStorage is clear', async () => {
      expect(initialState).toHaveProperty('favoriteBooks', [])
    })
    it('should load favoriteBooks state from localStorage if saved under key "favoriteBooks"', async () => {
      localStorage.getItem.mockImplementationOnce(vi.fn(() => JSON.stringify(fakeBookContext.favoriteBooks)))
      // this is an ESM hack to re-import a module without cache
      const {default: initialState} = await import(`../context/book/state?=${Date.now()}`)
      expect(localStorage.getItem).toHaveBeenCalledTimes(1)
      expect(localStorage.getItem).toHaveBeenCalledWith('favoriteBooks')
      expect(initialState.favoriteBooks).toEqual(fakeBookContext.favoriteBooks)
    })
  })

  describe('reducer', () => {
    it('should return initial state when called with incorrect action', () => {
      const initialState = {favoriteBooks: [], bookSearchResults: []}
      const newState = reducer(initialState, {action: 'bogus action'})
      expect(newState).toEqual(initialState)
    })
    it('should add a book to favorites', () => {
      const otherBook = fakeBookContext.favoriteBooks[0]
      const initialState = {favoriteBooks: [otherBook], bookSearchResults: []}
      const bookToAdd = fakeBookContext.favoriteBooks[1]
      const newState = reducer(initialState, {action: actions.ADD_BOOK, payload: bookToAdd})
      expect(newState).toEqual({...initialState, favoriteBooks: [otherBook, bookToAdd]})
    })
    it('should remove a book from favorites by id', () => {
      const otherBook = fakeBookContext.favoriteBooks[0]
      const bookToRemove = fakeBookContext.favoriteBooks[1]
      const initialState = {favoriteBooks: [otherBook, bookToRemove], bookSearchResults: []}
      const newState = reducer(initialState, {action: actions.REMOVE_BOOK, payload: bookToRemove.id})
      expect(newState).toEqual({...initialState, favoriteBooks: [otherBook]})
    })
    it('should add search results to state', () => {
      const {favoriteBooks, bookSearchResults} = fakeBookContext
      const initialState = {favoriteBooks, bookSearchResults: []}
      const newState = reducer(initialState, {action: actions.SEARCH_BOOKS, payload: bookSearchResults})
      expect(newState).toEqual({favoriteBooks, bookSearchResults})
    })
    it('should write to localStorage when adding a book', () => {
      const [bookToAdd, otherBook] = fakeBookContext.favoriteBooks
      const initialState = {favoriteBooks: [otherBook], bookSearchResults: []}
      reducer(initialState, {action: actions.ADD_BOOK, payload: bookToAdd})
      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
      expect(localStorage.setItem).toHaveBeenCalledWith("favoriteBooks", JSON.stringify([otherBook, bookToAdd]))
    })
    it('should write to localStorage when removing a book', () => {
      const [bookToRemove, otherBook] = fakeBookContext.favoriteBooks
      const initialState = {favoriteBooks: [bookToRemove, otherBook], bookSearchResults: []}
      reducer(initialState, {action: actions.REMOVE_BOOK, payload: bookToRemove.id})
      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
      expect(localStorage.setItem).toHaveBeenCalledWith("favoriteBooks", JSON.stringify([otherBook]))
    })
  })
  describe('useBookContext and BookProvider', () => {
    it('should be exported from src/context/book', () => {
      expect(useBookContext).toBeDefined()
      expect(typeof useBookContext).toBe('function')
      expect(BookProvider).toBeDefined()
      expect(typeof BookProvider).toBe('function')
    })
    it('should share state with components', () => {
      const Dummy = () => {
        const [state] = useBookContext()
        return <>{JSON.stringify(state)}</>
      }
      const { container } = render(<BookProvider><Dummy/></BookProvider>)
      const renderedState = JSON.parse(container.textContent)
      expect(renderedState).toEqual(initialState)
    })
    it('should share dispatch fn with components', () => {
      const Dummy = () => {
        const [state, dispatch] = useBookContext()
        return (
          <>
            <div>
              {JSON.stringify(state.favoriteBooks)}
            </div>
            <button onClick={() => dispatch({
              action: actions.ADD_BOOK,
              payload: 'banana'
            })}>
              click me
            </button>
          </>
        )
      }
      render(<BookProvider><Dummy/></BookProvider>)
      fireEvent.click(screen.getByText('click me'))
      expect(screen.getByText(/banana/i)).toBeInTheDocument()
    })
  })
})
