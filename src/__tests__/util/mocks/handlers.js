import { vi } from 'vitest'
import { rest } from 'msw'
import bookSearchData from './bookSearchResults.json'

export const searchBooksHandler = vi.fn((req, res, ctx) => {
  return res(ctx.status(200), ctx.json(bookSearchData))
})

export const handlers = [
  rest.get('https://www.googleapis.com/books/v1/volumes', searchBooksHandler)
]