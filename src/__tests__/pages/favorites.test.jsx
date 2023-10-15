import Favorites from '../../pages/favorites'
import { fakeContextRender } from '../util/setup'
import { screen } from '@testing-library/react'
import fakeBookContext from '../util/fakeBookContextState.json'

describe('Favorites Page Component', () => {
  it('should render title', () => {
    fakeContextRender(<Favorites />, {state: {bookSearchResults: [], favoriteBooks: []}})
    expect(screen.getByText(/Favorite Books/i)).toBeInTheDocument()
  })
  it('should render message about no favorite books when no books are saved to favorites', () => {
    fakeContextRender(<Favorites />, {state: {bookSearchResults: [], favoriteBooks: []}})
    expect(screen.getByText(/Favorite Books/i)).toBeInTheDocument()
    expect(screen.getByText(/You don't have any books saved to your favorites./i)).toBeInTheDocument()
    expect(screen.getByRole('link', {name: /go to search/i}))
  })
  it('should render favorite book titles from context', () => {
    fakeContextRender(<Favorites />, {state: {bookSearchResults: [], favoriteBooks: fakeBookContext.favoriteBooks}})
    expect(screen.getByText(/Favorite Books/i)).toBeInTheDocument()
    expect(screen.queryByText(/You don't have any books saved to your favorites./i)).not.toBeInTheDocument()
    for (const {title} of fakeBookContext.favoriteBooks) {
      expect(screen.getByText(title)).toBeInTheDocument()
    }
  })
  it('should show image of favorite books with title as alt text', async () => {
    fakeContextRender(<Favorites />, {state: {bookSearchResults: [], favoriteBooks: fakeBookContext.favoriteBooks}})
    for(const {title} of fakeBookContext.favoriteBooks) {
      expect(await screen.findByAltText(title)).toBeTruthy()
    }
  })
  it('should render book link of favorite books', async () => {
    fakeContextRender(<Favorites />, {state: {bookSearchResults: [], favoriteBooks: fakeBookContext.favoriteBooks}})
    for(const {title, id} of fakeBookContext.favoriteBooks) {
      const preview = await screen.findByText(title)
      const containingLink = preview.closest('a')
      expect(containingLink.href).toContain(`/book/${id}`)
    }
  })
  it('should show authors of favorite books', async () => {
    fakeContextRender(<Favorites />, {state: {bookSearchResults: [], favoriteBooks: fakeBookContext.favoriteBooks}})
    for(const {title, authors} of fakeBookContext.favoriteBooks) {
      const preview = await screen.findByText(title)
      const containingLink = preview.closest('a')
      for(const author of authors) {
        expect(containingLink.innerHTML.includes(author)).toBeTruthy()
      }
    }
  })
})