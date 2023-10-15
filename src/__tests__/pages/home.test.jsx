import Home from '../../pages/home'
import { render, screen } from '@testing-library/react'

describe('Home Page Component', () => {
  it('should render title', () => {
    render(<Home />)
    expect(screen.getByText(/Welcome to Booker 📚/i)).toBeInTheDocument()
  })
})