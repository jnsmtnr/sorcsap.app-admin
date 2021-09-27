import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}))

test('renders login form', () => {
  render(<App />);
  const mui = screen.getByText(/Bejelentkezés az admin felületbe/i);
  expect(mui).toBeInTheDocument();
});
