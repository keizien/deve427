import { test, expect } from '@playwright/test';

test('ajouter un produit au panier et naviguer vers checkout', async ({ page }) => {
  // Mock products API
  await page.route('**/api/products', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([{ id: 1, name: 'Produit Test', price: 9.99, stock: 5 }]),
    });
  });

  // Mock order submission
  await page.route('**/api/orders', async route => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
  });

  await page.goto('/');

  // Lancer la collection puis ajouter le produit
  await page.click('text=Lancer la collection');
  await page.waitForSelector('.btn-add-cart');
  await page.click('.btn-add-cart');

  // Vérifier que le total apparaît dans le panier
  await expect(page.locator('.cart-total')).toContainText('Total');

  // Aller au checkout
  await page.click('.btn-checkout');
  await expect(page).toHaveURL(/\/checkout/);
  await expect(page.locator('.checkout-title')).toHaveText('Paiement');
});
