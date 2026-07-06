import { test, expect } from '@playwright/test'

test.describe('Hero Section', () => {
  test('hero section is visible on homepage', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('section[aria-labelledby="hero-heading"]')
    await expect(hero).toBeVisible()
  })

  test('hero heading is visible', async ({ page }) => {
    await page.goto('/')
    const heading = page.locator('#hero-heading')
    await expect(heading).toBeVisible()
    await expect(heading).not.toBeEmpty()
  })

  test('hero has CTA buttons', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('section[aria-labelledby="hero-heading"]')
    const buttons = hero.locator('button, a[role="button"]')
    // There should be at least one CTA button
    const count = await buttons.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('hero has aria-labelledby attribute', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('section[aria-labelledby="hero-heading"]')
    await expect(hero).toBeVisible()
    const labelledBy = await hero.getAttribute('aria-labelledby')
    expect(labelledBy).toBe('hero-heading')
  })

  test('hero section does not crash on repeated navigation', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#hero-heading')).toBeVisible()
    await page.goto('/contact')
    await page.goto('/')
    await expect(page.locator('#hero-heading')).toBeVisible()
  })
})
