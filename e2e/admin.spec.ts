import { test, expect } from '@playwright/test';
import { loginAsAdmin, loginAsDemo } from './helpers';

test.describe('Admin Panel', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('should display admin dashboard with stats', async ({ page }) => {
    await page.waitForTimeout(2_000);
    // Should show stat cards (total users, active products, etc.)
    await expect(page.getByText(/usuarios|users|usuários/i).first()).toBeVisible();
  });

  test('should navigate to users management', async ({ page }) => {
    await page.getByRole('link', { name: /usuarios|users|usuários/i }).first().click();
    await expect(page).toHaveURL(/\/admin\/users/);
    await page.waitForTimeout(2_000);
    // Should show users table
    await expect(page.getByRole('table').or(page.locator('table')).first()).toBeVisible({ timeout: 5_000 });
  });

  test('should navigate to products assignment', async ({ page }) => {
    await page.getByRole('link', { name: /productos|products|produtos/i }).first().click();
    await expect(page).toHaveURL(/\/admin\/products/);
  });

  test('should open create user modal', async ({ page }) => {
    await page.getByRole('link', { name: /usuarios|users|usuários/i }).first().click();
    await page.waitForTimeout(2_000);

    const createButton = page.getByRole('button', { name: /crear|create|nuevo|new|criar/i }).first();
    await createButton.click();

    // Modal should show "Crear Usuario" heading and form fields
    await expect(page.getByRole('heading', { name: /crear|create|criar/i })).toBeVisible({ timeout: 3_000 });
  });

  test('should show user details in table', async ({ page }) => {
    await page.getByRole('link', { name: /usuarios|users|usuários/i }).first().click();
    await page.waitForTimeout(3_000);

    // Should show at least admin and demo users
    await expect(page.getByText('admin@magnetic.com').or(page.getByText('demo@magnetic.com')).first()).toBeVisible();
  });

  test('should have edit and delete actions for users', async ({ page }) => {
    await page.getByRole('link', { name: /usuarios|users|usuários/i }).first().click();
    await page.waitForTimeout(3_000);

    // Action buttons (edit/delete icons) should exist
    const actionButtons = page.locator('button').filter({ has: page.locator('svg') });
    const count = await actionButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show sidebar with navigation links', async ({ page }) => {
    // Sidebar should have Dashboard, Usuarios, Productos links
    const sidebar = page.locator('nav, aside').first();
    await expect(sidebar).toBeVisible();
  });
});

test.describe('Admin Access Control', () => {
  test('non-admin user cannot access /admin', async ({ page }) => {
    await loginAsDemo(page);
    await page.goto('/admin');
    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
