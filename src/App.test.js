import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Good link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Good/i);
  expect(linkElement).toBeInTheDocument();
});
