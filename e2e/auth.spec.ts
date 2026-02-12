import { test, expect } from '@playwright/test';
import { loginAsDemo, loginAsAdmin } from './helpers';

test.describe('Authentication', () => {
  test('should show login method selection page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // Should show email, Google, Facebook buttons
    await expect(page.getByRole('button', { name: /correo|email/i })).toBeVisible();
  });

  test('should navigate to email login step', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /correo|email/i }).click();
    await expect(page).toHaveURL(/\/login\/email/);
    await expect(page.getByPlaceholder(/correo|email|usuario/i)).toBeVisible();
    await expect(page.getByPlaceholder(/contraseña|password|senha/i)).toBeVisible();
  });

  test('should show validation error with wrong credentials', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /correo|email/i }).click();
    await page.waitForURL('**/login/email**', { timeout: 10_000 });
    await page.getByPlaceholder(/correo|email|usuario/i).fill('wrong@email.com');
    await page.getByPlaceholder(/contraseña|password|senha/i).fill('wrongpass');
    await page.getByRole('button', { name: /iniciar|log in|entrar/i }).click();

    // Should show toast error and stay on login
    await expect(page.locator('[data-testid="toast"]').or(page.locator('.go2072408551'))).toBeVisible({ timeout: 5_000 });
    await expect(page).toHaveURL(/\/login/);
  });

  test('should login as demo user and redirect to dashboard', async ({ page }) => {
    await loginAsDemo(page);
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should login as admin and redirect to admin panel', async ({ page }) => {
    await loginAsAdmin(page);
    await expect(page).toHaveURL(/\/admin/);
  });

  test('should redirect unauthenticated user to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('should toggle password visibility', async ({ page }) => {
    await page.goto('/login/email');
    const passwordInput = page.getByPlaceholder(/contraseña|password|senha/i);
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Click the eye icon button
    await page.locator('button').filter({ has: page.locator('svg') }).nth(1).click();
    await expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /regístr|sign up|cadastr/i }).click();
    await expect(page).toHaveURL(/\/register/);
  });

  test('should navigate to forgot password page from email login', async ({ page }) => {
    await page.goto('/login/email');
    await page.getByRole('button', { name: /olvidaste|forgot|esqueceu/i }).click();
    await expect(page).toHaveURL(/\/forgot-password/);
  });
});
