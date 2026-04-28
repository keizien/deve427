import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('loads products and reveals them after launch', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => [
      { id: 1, name: 'Casque audio', price: 89.99, stock: 6 },
    ],
  } as Response);

  render(<App />);

  expect(screen.getByText(/chargement des produits/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByRole('button', { name: /lancer la collection/i })).toBeInTheDocument();
  });

  await userEvent.click(screen.getByRole('button', { name: /lancer la collection/i }));

  expect(screen.getByRole('heading', { name: /casque audio/i })).toBeInTheDocument();
  expect(screen.getByText(/89.99/i)).toBeInTheDocument();

  (global.fetch as jest.Mock).mockRestore();
});
