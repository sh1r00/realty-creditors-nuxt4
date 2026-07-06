import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test('contact page loads successfully', async ({ page }) => {
    const response = await page.goto('/contact')
    expect(response?.status()).toBeLessThan(400)
  })

  test('contact page has a heading', async ({ page }) => {
    await page.goto('/contact')
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    await expect(heading).not.toBeEmpty()
  })

  test('contact page shows email info', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('text=info@realtycreditors.com')).toBeVisible()
  })

  test('contact page shows phone info', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('text=(555) 123-4567')).toBeVisible()
  })

  test('contact page shows office address', async ({ page }) => {
    await page.goto('/contact')
    const body = page.locator('body')
    await expect(body).toContainText('New York, NY 10005')
  })

  test('contact page has at least 3 info cards', async ({ page }) => {
    await page.goto('/contact')
    const cards = page.locator('.rounded-2xl')
    const count = await cards.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('contact info is also on homepage contact section', async ({ page }) => {
    await page.goto('/#contact')
    await expect(page.locator('#contact')).toBeVisible()
    await expect(page.locator('#contact')).toContainText('info@realtycreditors.com')
  })

  test('header and footer are visible on contact page', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })
})
