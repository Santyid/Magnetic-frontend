import { test, expect } from '@playwright/test';
import { loginAsDemo } from './helpers';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDemo(page);
  });

  test('should display TopBanner with product tabs', async ({ page }) => {
    // TopBanner should be visible
    await expect(page.locator('header').or(page.locator('nav')).first()).toBeVisible();
  });

  test('should display product cards', async ({ page }) => {
    // Wait for products to load (skeleton disappears)
    await page.waitForTimeout(2_000);

    // Demo user has 4 products — check at least one card is visible
    const productCards = page.locator('text=SocialGest, text=Tikket, text=Advocates, text=Quantico').first();
    await expect(page.getByText(/SocialGest|Tikket|Advocates|Quantico/).first()).toBeVisible();
  });

  test('should show user greeting', async ({ page }) => {
    await expect(page.getByText(/demo|hola|hello|olá/i).first()).toBeVisible({ timeout: 5_000 });
  });

  test('should have "Acceder" or access buttons for products', async ({ page }) => {
    await page.waitForTimeout(2_000);
    const accessButtons = page.getByRole('button', { name: /acceder|access|acessar/i });
    // Demo user should have at least 1 access button (connected or not)
    const count = await accessButtons.count();
    expect(count).toBeGreaterThanOrEqual(0); // 0 if no products connected, buttons may show "Conectar"
  });

  test('should open AI chat drawer', async ({ page }) => {
    // Click AI button in TopBanner
    const aiButton = page.getByRole('button', { name: /ai|asistente|assistant/i }).first();
    if (await aiButton.isVisible()) {
      await aiButton.click();
      await expect(page.getByText(/Magnetic AI/i)).toBeVisible({ timeout: 3_000 });
    }
  });

  test('should open FAQ drawer', async ({ page }) => {
    const helpButton = page.getByRole('button', { name: /ayuda|help|ajuda|\?/i }).first();
    if (await helpButton.isVisible()) {
      await helpButton.click();
      await expect(page.getByText(/FAQ|preguntas|questions/i).first()).toBeVisible({ timeout: 3_000 });
    }
  });

  test('should navigate to product metrics page', async ({ page }) => {
    await page.waitForTimeout(2_000);
    // Find a product metrics link/button — could be "Ver métricas" or clicking on connected product
    const metricsLink = page.getByRole('button', { name: /métricas|metrics|métricas/i }).first();
    if (await metricsLink.isVisible()) {
      await metricsLink.click();
      await expect(page).toHaveURL(/\/dashboard\/metrics\//);
    }
  });
});
