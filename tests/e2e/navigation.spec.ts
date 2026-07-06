import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('header is visible on all pages', async ({ page }) => {
    const pages = ['/', '/contact', '/privacy', '/terms']
    for (const path of pages) {
      await page.goto(path)
      await expect(page.locator('header')).toBeVisible()
    }
  })

  test('desktop nav links are visible', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('nav[aria-label="Main navigation"]')
    await expect(nav).toBeVisible()
  })

  test('logo links to homepage', async ({ page }) => {
    await page.goto('/contact')
    const logo = page.locator('header a[aria-label="Realty Creditors home"]')
    await expect(logo).toBeVisible()
    await logo.click()
    await expect(page).toHaveURL('/')
  })

  test('logo displays correct branding', async ({ page }) => {
    await page.goto('/')
    const logo = page.locator('header a[aria-label="Realty Creditors home"]')
    await expect(logo).toContainText('Realty')
    await expect(logo).toContainText('Creditors')
  })

  test('footer is visible on all pages', async ({ page }) => {
    const pages = ['/', '/contact', '/privacy', '/terms']
    for (const path of pages) {
      await page.goto(path)
      await expect(page.locator('footer')).toBeVisible()
    }
  })

  test('skip-to-content link is present', async ({ page }) => {
    await page.goto('/')
    const skipLink = page.locator('a[href="#main-content"]')
    await expect(skipLink).toBeVisible()
  })

  test('about and contact sections exist on homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#about')).toBeVisible()
    await expect(page.locator('#contact')).toBeVisible()
  })
})
