import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the products heading after loading', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => [],
  } as Response);

  render(<App />);

  expect(screen.getByText(/chargement des produits/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /nos produits/i })).toBeInTheDocument();
  });

  (global.fetch as jest.Mock).mockRestore();
});
