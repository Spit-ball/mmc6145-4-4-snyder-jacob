import { vi } from 'vitest'
vi.mock('react-router-dom', () => ({BrowserRouter: vi.fn(({children}) => <>{children}</>)}))
vi.mock('../context/book', () => ({BookProvider: vi.fn(({children}) => <>{children}</>)}))
import { BrowserRouter } from 'react-router-dom'
import { BookProvider } from '../context/book'
import { act } from 'react-dom/test-utils'
vi.mock('../App', () => ({default: vi.fn(() => <></>)}))
import App from '../App'

describe('main.jsx', () => {
  it('should render <App />', async () => {
    const element = document.createElement('div')
    vi.spyOn(document, 'getElementById').mockReturnValueOnce(element)
    await act(() => import(`../main?q=${Date.now()}`))
    expect(App).toHaveBeenCalled()
  })
  it('should render <BookProvider />', async () => {
    const element = document.createElement('div')
    vi.spyOn(document, 'getElementById').mockReturnValueOnce(element)
    await act(() => import(`../main?q=${Date.now()}`))
    expect(BookProvider).toHaveBeenCalled()
  })
  it('should render <BrowserRouter />', async () => {
    const element = document.createElement('div')
    vi.spyOn(document, 'getElementById').mockReturnValueOnce(element)
    await act(() => import(`../main?q=${Date.now()}`))
    expect(BrowserRouter).toHaveBeenCalled()
  })
  it('should wrap <App /> with BookProvider and BrowserRouter', async () => {
    const element = document.createElement('div')
    vi.spyOn(document, 'getElementById').mockReturnValueOnce(element)
    await act(() => import(`../main?q=${Date.now()}`))
    try {
      expect(BookProvider).toHaveBeenCalledWith({children: <App/>}, {})
      expect(BrowserRouter).toHaveBeenCalledWith({children: <BookProvider><App/></BookProvider>}, {})
    } catch {
      expect(BrowserRouter).toHaveBeenCalledWith({children: <App/>}, {})
      expect(BookProvider).toHaveBeenCalledWith({children: <BrowserRouter><App/></BrowserRouter>}, {})
    }
  })
})