import { vi } from 'vitest'
const mockHeader = vi.fn()
const mockHome = vi.fn()
const mockSearch = vi.fn()
const mockFavorites = vi.fn()
const mockBook = vi.fn()
vi.mock('../components/header', () => ({default: mockHeader}))
vi.mock('../pages/home', () => ({default: mockHome}))
vi.mock('../pages/search', () => ({default: mockSearch}))
vi.mock('../pages/favorites', () => ({default: mockFavorites}))
vi.mock('../pages/book', () => ({default: mockBook}))
import App from '../App'
import { customRender } from './util/setup'

describe('App', () => {
  it('should render Home page and Header components on "/"', () => {
    customRender(<App/>, "/")
    expect(mockHeader).toHaveBeenCalledTimes(1)
    expect(mockHome).toHaveBeenCalledTimes(1)
    expect(mockSearch).toHaveBeenCalledTimes(0)
    expect(mockFavorites).toHaveBeenCalledTimes(0)
    expect(mockBook).toHaveBeenCalledTimes(0)
  })
  it('should render Search page and Header components on "/search"', () => {
    customRender(<App/>, "/search")
    expect(mockHeader).toHaveBeenCalledTimes(1)
    expect(mockHome).toHaveBeenCalledTimes(0)
    expect(mockSearch).toHaveBeenCalledTimes(1)
    expect(mockFavorites).toHaveBeenCalledTimes(0)
    expect(mockBook).toHaveBeenCalledTimes(0)
  })
  it('should render Favorites page and Header components on "/favorites"', () => {
    customRender(<App/>, "/favorites")
    expect(mockHeader).toHaveBeenCalledTimes(1)
    expect(mockHome).toHaveBeenCalledTimes(0)
    expect(mockSearch).toHaveBeenCalledTimes(0)
    expect(mockFavorites).toHaveBeenCalledTimes(1)
    expect(mockBook).toHaveBeenCalledTimes(0)
  })
  it('should render Book page and Header components on "/book/:id"', () => {
    customRender(<App/>, "/book/banana")
    expect(mockHeader).toHaveBeenCalledTimes(1)
    expect(mockHome).toHaveBeenCalledTimes(0)
    expect(mockSearch).toHaveBeenCalledTimes(0)
    expect(mockFavorites).toHaveBeenCalledTimes(0)
    expect(mockBook).toHaveBeenCalledTimes(1)
  })
})