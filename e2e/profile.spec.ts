import { test, expect } from '@playwright/test';
import { loginAsDemo } from './helpers';

test.describe('Profile', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDemo(page);
  });

  test('should display profile page with user data', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForTimeout(2_000);

    // Should show user's email
    await expect(page.getByText('demo@magnetic.com').first()).toBeVisible();
  });

  test('should show first name and last name fields', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForTimeout(2_000);

    // Should have name input fields
    const inputs = page.locator('input');
    const count = await inputs.count();
    expect(count).toBeGreaterThanOrEqual(2); // At least firstName, lastName
  });

  test('should have save button', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForTimeout(2_000);

    const saveButton = page.getByRole('button', { name: /guardar|save|salvar/i });
    await expect(saveButton).toBeVisible();
  });
});

test.describe('Change Password Modal', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDemo(page);
    await page.goto('/profile');
    await page.waitForTimeout(2_000);
  });

  test('should open change password modal from profile', async ({ page }) => {
    // Click the "Change password" button in the profile page
    const changeButton = page.getByRole('button', { name: /cambiar contraseña|change password|alterar senha/i }).first();
    await changeButton.click();

    // Modal should appear with password fields
    const passwordInputs = page.locator('input[type="password"]');
    const count = await passwordInputs.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('should show password strength bar when typing new password', async ({ page }) => {
    const changeButton = page.getByRole('button', { name: /cambiar contraseña|change password|alterar senha/i }).first();
    await changeButton.click();

    // Type in the new password field (second password input)
    const passwordInputs = page.locator('input[type="password"]');
    await passwordInputs.nth(1).fill('TestPass1!');

    // Password strength bar should appear
    await expect(page.getByText(/débil|weak|fraca|media|medium|fuerte|strong|forte/i).first()).toBeVisible();
  });

  test('should close modal with cancel button', async ({ page }) => {
    const changeButton = page.getByRole('button', { name: /cambiar contraseña|change password|alterar senha/i }).first();
    await changeButton.click();

    // Click cancel
    const cancelButton = page.getByRole('button', { name: /cancelar|cancel/i });
    await cancelButton.click();

    // Modal should be closed - no more than the profile password inputs visible
    await page.waitForTimeout(500);
    const passwordInputs = page.locator('input[type="password"]');
    const count = await passwordInputs.count();
    expect(count).toBe(0);
  });
});
