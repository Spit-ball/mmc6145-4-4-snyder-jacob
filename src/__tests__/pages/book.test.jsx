import App from '../../App'
import * as actions from '../../context/book/actions'
import { vi } from 'vitest'
import { fakeContextRender } from '../util/setup'
import { screen, fireEvent } from '@testing-library/react'
import fakeBookContext from '../util/fakeBookContextState.json'

describe('Book Page Component', () => {
  it('should redirect to favorites page if book is not found', async () => {
    fakeContextRender(
      <App />,
      {
        state: {favoriteBooks: [], bookSearchResults: []},
        location: '/book/banana'
      }
    )
    expect(screen.getByText(/Favorite Books/i)).toBeInTheDocument()
  })
  it('should render book info from favorites', async () => {
    const book = fakeBookContext.favoriteBooks[0]
    fakeContextRender(
      <App />,
      {
        state: {favoriteBooks: [book], bookSearchResults: []},
        location: `/book/${book.id}`
      }
    )
    expect(screen.getByText(book.title)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(book.description, 'i'))).toBeInTheDocument()
    const img = screen.getByAltText(book.title)
    expect(img).toBeInTheDocument()
    expect(img.src).toBe(book.thumbnail)
    expect(img.src).not.contain('placeholder')
    expect(screen.getByText(/remove from favorites/i)).toBeInTheDocument()
  })
  it('should render book info from search', async () => {
    const book = fakeBookContext.favoriteBooks[0]
    fakeContextRender(
      <App />,
      {
        state: {favoriteBooks: [], bookSearchResults: [book]},
        location: `/book/${book.id}`
      }
    )
    expect(screen.getByText(book.title)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(book.description, 'i'))).toBeInTheDocument()
    const img = screen.getByAltText(book.title)
    expect(img).toBeInTheDocument()
    expect(img.src).toBe(book.thumbnail)
    expect(img.src).not.contain('placeholder')
    expect(screen.getByText(/add to favorites/i)).toBeInTheDocument()
  })
  it('should render book from favorites if book is in both favorites and search state', async () => {
    const book = fakeBookContext.favoriteBooks[0]
    fakeContextRender(
      <App />,
      {
        state: {favoriteBooks: [book], bookSearchResults: [book]},
        location: `/book/${book.id}`
      }
    )
    expect(screen.getByText(book.title)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(book.description, 'i'))).toBeInTheDocument()
    const img = screen.getByAltText(book.title)
    expect(img).toBeInTheDocument()
    expect(img.src).toBe(book.thumbnail)
    expect(img.src).not.contain('placeholder')
    expect(screen.getByText(/remove from favorites/i)).toBeInTheDocument()
  })
  it('should allow adding book to favorites', async () => {
    const book = fakeBookContext.favoriteBooks[0]
    const mockDispatch = vi.fn()
    fakeContextRender(
      <App />,
      {
        state: {favoriteBooks: [], bookSearchResults: [book]},
        location: `/book/${book.id}`,
        dispatch: mockDispatch
      }
    )
    fireEvent.click(screen.getByText(/add to favorites/i))
    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({action: actions.ADD_BOOK, payload: book})
  })
  it('should allow removing book from favorites', async () => {
    const book = fakeBookContext.favoriteBooks[0]
    const mockDispatch = vi.fn()
    fakeContextRender(
      <App />,
      {
        state: {favoriteBooks: [book], bookSearchResults: []},
        location: `/book/${book.id}`,
        dispatch: mockDispatch
      }
    )
    fireEvent.click(screen.getByText(/remove from favorites/i))
    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({action: actions.REMOVE_BOOK, payload: book.id})
  })
})