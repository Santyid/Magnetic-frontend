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

test.describe('Change Password', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsDemo(page);
  });

  test('should display change password page', async ({ page }) => {
    await page.goto('/change-password');
    await page.waitForTimeout(1_000);

    // Should have 3 password fields: current, new, confirm
    const passwordInputs = page.locator('input[type="password"]');
    const count = await passwordInputs.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('should show password validation rules', async ({ page }) => {
    await page.goto('/change-password');

    // Type a weak password to trigger validations
    const newPasswordInput = page.locator('input[type="password"]').nth(1);
    await newPasswordInput.fill('abc');

    // Should show validation indicators (min length, special char, number, uppercase)
    await expect(page.getByText(/8|caracteres|characters|caracteres/i).first()).toBeVisible();
  });

  test('should show error with wrong current password', async ({ page }) => {
    await page.goto('/change-password');
    await page.waitForTimeout(1_000);

    await page.getByPlaceholder(/actual|current/i).fill('WrongPassword1!');
    await page.getByPlaceholder(/nueva contraseña|new password/i).first().fill('NewPassword1!');
    await page.getByPlaceholder(/confirma|confirm/i).fill('NewPassword1!');

    const submitButton = page.getByRole('button', { name: /actualizar|update|cambiar|change/i }).first();
    if (await submitButton.isEnabled()) {
      await submitButton.click();
      await page.waitForTimeout(3_000);
      // Should stay on page (error occurred)
      await expect(page).toHaveURL(/\/change-password/);
    }
  });

  test('should disable submit when passwords do not match', async ({ page }) => {
    await page.goto('/change-password');
    await page.waitForTimeout(1_000);

    await page.getByPlaceholder(/nueva contraseña|new password/i).first().fill('NewPassword1!');
    await page.getByPlaceholder(/confirma|confirm/i).fill('DifferentPassword1!');

    // Submit button should be disabled
    const submitButton = page.getByRole('button', { name: /actualizar|update|cambiar|change/i }).first();
    await expect(submitButton).toBeDisabled();
  });
});
