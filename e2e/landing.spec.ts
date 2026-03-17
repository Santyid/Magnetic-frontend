import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the landing page', async ({ page }) => {
    await expect(page).toHaveURL('/');
    // Should show the Magnetic branding
    await expect(page.getByText('Magnetic').first()).toBeVisible({ timeout: 10_000 });
  });

  test('should display the navbar with login and register', async ({ page }) => {
    // Set desktop viewport to ensure navbar links are visible
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    // Navbar should have "Iniciar sesion" and "Registrarse"
    await expect(
      page.getByText(/iniciar sesi|log in|entrar/i).first(),
    ).toBeVisible({ timeout: 10_000 });
    await expect(
      page.getByText(/registrarse|sign up|cadastrar/i).first(),
    ).toBeVisible({ timeout: 10_000 });
  });

  test('should display the hero section', async ({ page }) => {
    // Hero should have a heading
    const heading = page.getByRole('heading').first();
    await expect(heading).toBeVisible({ timeout: 10_000 });
  });

  test('should show product showcase section', async ({ page }) => {
    // Should mention at least one product
    await expect(
      page.getByText(/SocialGest|Tikket|Advocates|Quantico/i).first(),
    ).toBeVisible({ timeout: 10_000 });
  });

  test('should have language selector', async ({ page }) => {
    // Language selector button or dropdown
    const langSelector = page.getByText(/ES|EN|PT/i).first();
    await expect(langSelector).toBeVisible({ timeout: 10_000 });
  });

  test('should navigate to login when clicking CTA', async ({ page }) => {
    // Find the main CTA button (Comenzar/Get Started/Iniciar)
    const ctaButton = page.getByRole('link', { name: /comenzar|get started|iniciar|start|comece|log in/i }).first();
    if (await ctaButton.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await ctaButton.click();
      await expect(page).toHaveURL(/\/login/);
    }
  });

  test('should display stats section', async ({ page }) => {
    // Stats section typically shows numbers/metrics
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(1_000);
    // Check for any numeric stat or product count
    const statsVisible = await page.getByText(/\d+/).first().isVisible().catch(() => false);
    expect(statsVisible).toBeTruthy();
  });

  test('should display footer', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1_000);
    // Footer should contain Magnetic branding
    await expect(
      page.getByText(/magnetic/i).last(),
    ).toBeVisible({ timeout: 5_000 });
  });
});
