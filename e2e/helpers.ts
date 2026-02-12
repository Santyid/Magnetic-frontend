import { Page, expect } from '@playwright/test';

/** Login as a specific user and wait for redirect */
export async function loginAs(
  page: Page,
  email: string,
  password: string,
  expectedPath: string,
) {
  await page.goto('/login');
  // Step 1: Click "Continue with email" button
  await page.getByRole('button', { name: /correo|email/i }).click();
  await page.waitForURL('**/login/email**', { timeout: 10_000 });
  // Step 2: Fill credentials and submit
  await page.getByPlaceholder(/correo|email|usuario/i).fill(email);
  await page.getByPlaceholder(/contraseña|password|senha/i).fill(password);
  await page.getByRole('button', { name: /iniciar|log in|entrar/i }).click();
  await page.waitForURL(`**${expectedPath}**`, { timeout: 10_000 });
}

/** Login as demo user (normal user with 4 products) */
export async function loginAsDemo(page: Page) {
  await loginAs(page, 'demo@magnetic.com', 'Demo123!', '/dashboard');
}

/** Login as admin user */
export async function loginAsAdmin(page: Page) {
  await loginAs(page, 'admin@magnetic.com', 'Admin123!', '/admin');
}

/** Assert current URL path */
export async function expectPath(page: Page, path: string) {
  await expect(page).toHaveURL(new RegExp(path.replace('/', '\\/')));
}
