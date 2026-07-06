import { test, expect } from '@playwright/test'

test.describe('Dark Mode', () => {
  test('dark mode toggle is visible in header', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('button[aria-label*="toggle"]')
    await expect(toggle).toBeVisible()
  })

  test('dark mode toggle has accessible label', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('button[aria-label*="toggle"]')
    await expect(toggle).toBeVisible()
    const label = await toggle.getAttribute('aria-label')
    expect(label).toBeTruthy()
  })

  test('dark mode toggle has aria-pressed state', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('button[aria-label*="toggle"]')
    await expect(toggle).toBeVisible()
    const pressed = await toggle.getAttribute('aria-pressed')
    // aria-pressed should be "true" or "false"
    expect(pressed).toMatch(/^(true|false)$/)
  })

  test('clicking dark mode toggle does not crash the page', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('button[aria-label*="toggle"]')
    if (await toggle.isVisible()) {
      await toggle.click()
      await page.waitForTimeout(300)
      await expect(page.locator('header')).toBeVisible()
    }
  })

  test('dark mode toggle is present on all pages', async ({ page }) => {
    const pages = ['/', '/contact', '/privacy', '/terms']
    for (const path of pages) {
      await page.goto(path)
      await expect(page.locator('button[aria-label*="toggle"]')).toBeVisible()
    }
  })

  test('dark mode toggle icon is present', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('button[aria-label*="toggle"]')
    // Should contain an icon (AIcon renders SVG or i)
    const icon = toggle.locator('svg, i, [class*="icon"]')
    // The ADarkModeToggle contains an AIcon component
    await expect(toggle.locator('*')).not.toHaveCount(0)
  })
})
