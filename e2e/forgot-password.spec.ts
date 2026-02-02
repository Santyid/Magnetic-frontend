import { test, expect } from '@playwright/test';

test.describe('Forgot Password', () => {
  test('should display forgot password page', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('textbox')).toBeVisible();
  });

  test('should show success message after submitting email', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.getByRole('textbox').fill('demo@magnetic.com');

    const submitButton = page.getByRole('button', { name: /enviar|send|recuperar|recover/i }).first();
    await submitButton.click();

    await page.waitForTimeout(3_000);
    const successMessage = page.locator('.bg-success\\/10').or(
      page.getByText(/instrucciones|instructions|instruções|enviado|sent/i)
    );
    await expect(successMessage.first()).toBeVisible({ timeout: 5_000 });
  });

  test('should show success even with non-existent email (security)', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.getByRole('textbox').fill('nonexistent@test.com');

    const submitButton = page.getByRole('button', { name: /enviar|send|recuperar|recover/i }).first();
    await submitButton.click();

    await page.waitForTimeout(3_000);
    const successMessage = page.locator('.bg-success\\/10').or(
      page.getByText(/instrucciones|instructions|instruções|enviado|sent/i)
    );
    await expect(successMessage.first()).toBeVisible({ timeout: 5_000 });
  });

  test('should navigate back to login', async ({ page }) => {
    await page.goto('/forgot-password');
    const backButton = page.getByRole('button', { name: /volver|back|voltar|iniciar|log in/i }).first();
    await backButton.click();
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe('Register Page', () => {
  test('should display register page with all fields', async ({ page }) => {
    await page.goto('/register');
    const inputs = page.locator('input');
    const count = await inputs.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('should show password validation indicators', async ({ page }) => {
    await page.goto('/register');
    const passwordInputs = page.locator('input[type="password"]');
    await passwordInputs.first().fill('abc');
    await expect(page.getByText(/8/i).first()).toBeVisible();
  });

  test('should disable submit when validations fail', async ({ page }) => {
    await page.goto('/register');
    const submitButton = page.getByRole('button', { name: /registr|sign up|cadastr|crear|create/i }).first();
    await expect(submitButton).toBeDisabled();
  });

  test('should enable submit when all validations pass', async ({ page }) => {
    await page.goto('/register');

    // Use placeholders that exist on register page
    await page.getByPlaceholder(/correo|email|usuario/i).fill('newuser@test.com');
    await page.getByPlaceholder(/nombre|name/i).first().fill('Test');
    await page.getByPlaceholder(/apellido|last name|sobrenome/i).fill('User');

    const passwordInputs = page.locator('input[type="password"]');
    await passwordInputs.nth(0).fill('TestPassword1!');
    await passwordInputs.nth(1).fill('TestPassword1!');

    const checkbox = page.locator('input[type="checkbox"]');
    if (await checkbox.isVisible().catch(() => false)) {
      await checkbox.check();
    }

    const submitButton = page.getByRole('button', { name: /registr|sign up|cadastr|crear|create/i }).first();
    await expect(submitButton).toBeEnabled();
  });

  test('should navigate back to login', async ({ page }) => {
    await page.goto('/register');
    const loginLink = page.getByRole('button', { name: /iniciar|log in|entrar|inicia/i }).first();
    await loginLink.click();
    await expect(page).toHaveURL(/\/login/);
  });
});
