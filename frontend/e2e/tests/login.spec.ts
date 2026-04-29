import { test, expect } from '@playwright/test';

test('connexion affiche bouton se déconnecter', async ({ page }) => {
  // Mock login API to return a simple JWT-like token with role 'user'
  await page.route('**/api/login', async route => {
    const payload = Buffer.from(JSON.stringify({ role: 'user' })).toString('base64');
    const token = `x.${payload}.x`;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ token }),
    });
  });

  await page.goto('/login');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password');
  await page.click('button:has-text("Se connecter")');

  // After login, navbar should show 'Se déconnecter'
  await expect(page.locator('text=Se déconnecter')).toBeVisible();
});
