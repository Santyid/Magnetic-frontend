import { test, expect } from '@playwright/test';

test.describe('Forgot Password', () => {
  test('should display forgot password page', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('textbox')).toBeVisible();
  });

  test('should navigate to sent page after submitting email', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.getByRole('textbox').fill('demo@magnetic.com');

    const submitButton = page.getByRole('button', { name: /enviar|send|recuperar|recover/i }).first();
    await submitButton.click();

    await page.waitForURL('**/forgot-password/sent**', { timeout: 10_000 });
    await expect(page.getByText(/instrucciones|instructions|instruções|enviado|sent|revisa|check/i).first()).toBeVisible({ timeout: 5_000 });
  });

  test('should navigate to sent page even with non-existent email (security)', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.getByRole('textbox').fill('nonexistent@test.com');

    const submitButton = page.getByRole('button', { name: /enviar|send|recuperar|recover/i }).first();
    await submitButton.click();

    await page.waitForURL('**/forgot-password/sent**', { timeout: 10_000 });
  });

  test('should navigate back to login', async ({ page }) => {
    await page.goto('/forgot-password');
    // Back button in AuthLayout
    const backButton = page.getByRole('button', { name: /atrás|back|voltar/i }).first();
    await backButton.click();
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe('Register Page - Multi Step', () => {
  test('should display register step 1 with name and email fields', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByPlaceholder(/nombre|name/i).first()).toBeVisible();
    await expect(page.getByPlaceholder(/correo|email/i)).toBeVisible();
  });

  test('should navigate to step 2 (password) after filling step 1', async ({ page }) => {
    await page.goto('/register');
    await page.getByPlaceholder(/nombre|name/i).first().fill('Test');
    await page.getByPlaceholder(/correo|email/i).fill('newuser@test.com');

    const submitButton = page.getByRole('button', { name: /registr|sign up|cadastr|crear|create|continuar|continue/i }).first();
    await submitButton.click();

    await expect(page).toHaveURL(/\/register\/password/);
  });

  test('should show password strength bar on step 2', async ({ page }) => {
    await page.goto('/register');
    await page.getByPlaceholder(/nombre|name/i).first().fill('Test');
    await page.getByPlaceholder(/correo|email/i).fill('newuser@test.com');
    await page.getByRole('button', { name: /registr|sign up|cadastr|crear|create|continuar|continue/i }).first().click();
    await expect(page).toHaveURL(/\/register\/password/);

    const passwordInputs = page.locator('input[type="password"]');
    await passwordInputs.first().fill('TestPassword1!');
    // Password strength bar should appear
    await expect(page.getByText(/débil|weak|fraca|media|medium|fuerte|strong|forte/i).first()).toBeVisible();
  });

  test('should navigate back to login from step 1', async ({ page }) => {
    await page.goto('/register');
    const backButton = page.getByRole('button', { name: /atrás|back|voltar/i }).first();
    await backButton.click();
    await expect(page).toHaveURL(/\/login/);
  });
});
