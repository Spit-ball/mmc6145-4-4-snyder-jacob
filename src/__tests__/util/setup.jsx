import { afterEach, afterAll, beforeAll, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { render, cleanup, configure } from '@testing-library/react'
import '@testing-library/jest-dom'
import { server } from './mocks/server'
import { bookContext, BookProvider } from '../../context/book'

vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn()
})

configure({
  getElementError: (message, container) => {
    const error = new Error(message);
    error.name = 'TestingLibraryElementError';
    error.stack = null;
    return error;
  },
});

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => {
  server.close()
  vi.restoreAllMocks()
})

afterEach(() => {
  server.resetHandlers()
  vi.clearAllMocks()
  cleanup()
})

export function fakeContextRender(
  Component,
  {location = "/", state = {favoriteBooks: [], bookSearchResults: []}, dispatch = () => {}} = {}
) {
  return render(
    <MemoryRouter initialEntries={[location]}>
      <bookContext.Provider value={[state, dispatch]}>
        {Component}
      </bookContext.Provider>
    </MemoryRouter>
  )
}

export function customRender(
  Component,
  location = "/",
) {
  return render(
    <MemoryRouter initialEntries={[location]}>
      <BookProvider>
        {Component}
      </BookProvider>
    </MemoryRouter>
  )
}