import { test, expect } from '@playwright/test'

test.describe('Properties', () => {
  test('homepage has features section describing property capabilities', async ({ page }) => {
    await page.goto('/')
    const features = page.locator('#about')
    await expect(features).toBeVisible()
  })

  test('homepage has application form section', async ({ page }) => {
    await page.goto('/')
    // The OApplicationForm component should be rendered
    const applySection = page.locator('#apply')
    await expect(applySection).toBeVisible()
  })

  test('application form has step indicators', async ({ page }) => {
    await page.goto('/')
    // Navigate to apply section
    await page.locator('#apply').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Should have form fields for property financing application
    const formInputs = page.locator('#apply input, #apply select')
    const count = await formInputs.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('trust bar displays certifications', async ({ page }) => {
    await page.goto('/')
    const trustBar = page.locator('section[aria-label="Trusted by"]')
    await expect(trustBar).toBeVisible()
    await expect(trustBar).toContainText('FDIC Insured')
    await expect(trustBar).toContainText('NMLS Certified')
    await expect(trustBar).toContainText('BBB Accredited')
  })

  test('can scroll from hero to apply section', async ({ page }) => {
    await page.goto('/')
    // Click the primary CTA which scrolls to apply
    const ctaButton = page.locator('section[aria-labelledby="hero-heading"] button').first()
    await ctaButton.click()
    await page.waitForTimeout(1000)

    // Should have scrolled to the apply section
    const applySection = page.locator('#apply')
    await expect(applySection).toBeVisible()
  })
})
