import { test, expect } from '@playwright/test';
import { loginAsAdmin, loginAsDemo } from './helpers';

test.describe('Proposals', () => {
  test('should display proposals page with title and create button', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/proposals');
    await page.waitForTimeout(2_000);

    // Title
    await expect(
      page.getByRole('heading', { name: /propuestas|proposals|propostas/i }),
    ).toBeVisible({ timeout: 10_000 });

    // Create button
    await expect(
      page.getByRole('button', { name: /nueva|new|nova/i }),
    ).toBeVisible({ timeout: 10_000 });

    // Cards or empty state
    const hasCards = await page.locator('.grid .rounded-lg').first().isVisible().catch(() => false);
    const hasEmpty = await page.getByText(/no hay|no proposals|sem propostas/i).isVisible().catch(() => false);
    expect(hasCards || hasEmpty).toBeTruthy();
  });

  test('should open create proposal modal with LinkedIn input', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/proposals');
    await page.waitForTimeout(2_000);

    await page.getByRole('button', { name: /nueva|new|nova/i }).click();

    await expect(
      page.getByPlaceholder(/linkedin/i).or(
        page.locator('input[placeholder*="linkedin" i]')
      ),
    ).toBeVisible({ timeout: 5_000 });
  });

  test('should navigate to proposals from admin sidebar', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin');
    await page.waitForTimeout(1_000);
    await page.getByRole('link', { name: /propuestas|proposals|propostas/i }).first().click();
    await expect(page).toHaveURL(/\/admin\/proposals/);
  });

  test('should navigate to proposal detail and show content', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/proposals');
    await page.waitForTimeout(3_000);

    const firstCard = page.locator('.grid .rounded-lg').first();
    if (!(await firstCard.isVisible().catch(() => false))) {
      test.skip();
      return;
    }

    // Click into detail
    await firstCard.click();
    await page.waitForURL(/\/admin\/proposals\/.+/, { timeout: 10_000 });
    await page.waitForTimeout(3_000);

    // Company heading
    await expect(page.getByRole('heading').first()).toBeVisible({ timeout: 10_000 });

    // Tab navigation (Proyecciones/Competidores/Análisis IA/Contenido Social)
    const tabButtons = page.getByRole('button').filter({
      hasText: /proyecc|competi|análisis|social|project|competitor|analysis|content/i,
    });
    const count = await tabButtons.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('non-admin cannot access proposals', async ({ page }) => {
    await loginAsDemo(page);
    await page.goto('/admin/proposals');
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
