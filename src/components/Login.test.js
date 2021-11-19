import { render, screen } from '@testing-library/react'
import Login from './Login'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}))

test('renders login form', () => {
  render(<Login />)
  const mui = screen.getByText(/Bejelentkezés az admin felületbe/i)
  expect(mui).toBeInTheDocument()
})
