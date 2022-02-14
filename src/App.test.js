import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search bar', () => {
  render(<App />);
  const searchBar = screen.getByPlaceholderText("Search Alliances");
  expect(searchBar).toBeInTheDocument();
});
