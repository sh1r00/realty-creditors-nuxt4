import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import OHeader from '~/components/organisms/OHeader.vue'
import AIcon from '~/components/atoms/AIcon.vue'
import ADarkModeToggle from '~/components/atoms/ADarkModeToggle.vue'

const messages = {
  a11y: {
    skipToContent: 'Skip to main content',
    toggleMenu: 'Toggle navigation menu',
    closeDialog: 'Close dialog',
    loading: 'Loading',
    toggleDark: 'Switch to dark mode',
    toggleLight: 'Switch to light mode',
  },
  nav: {
    home: 'Home',
    apply: 'Apply Now',
    about: 'About',
    contact: 'Contact',
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: { en: messages },
})

// Get the mocked useI18n from global setup
const useI18nMock = (globalThis as any).useI18n as ReturnType<typeof vi.fn>

describe('OHeader', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    document.documentElement.classList.remove('dark')

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    // Override useI18n to use the real i18n instance
    useI18nMock.mockReturnValue({
      t: i18n.global.t,
      locale: i18n.global.locale,
      setLocale: vi.fn(),
      defaultLocale: i18n.global.locale,
    })
  })

  function mountHeader() {
    return mount(OHeader, {
      global: {
        plugins: [i18n],
        components: { AIcon, ADarkModeToggle },
      },
    })
  }

  it('renders a header element', () => {
    const wrapper = mountHeader()
    expect(wrapper.find('header').exists()).toBe(true)
  })

  it('renders the brand logo link', () => {
    const wrapper = mountHeader()
    const logoLink = wrapper.find('a[aria-label="Realty Creditors home"]')
    expect(logoLink.exists()).toBe(true)
    expect(logoLink.text()).toContain('Realty')
    expect(logoLink.text()).toContain('Creditors')
  })

  it('renders desktop navigation links', () => {
    const wrapper = mountHeader()
    const desktopNav = wrapper.find('nav[aria-label="Main navigation"]')
    expect(desktopNav.exists()).toBe(true)

    // Should contain nav links
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Apply Now')
    expect(wrapper.text()).toContain('About')
    expect(wrapper.text()).toContain('Contact')
  })

  it('renders the dark mode toggle', () => {
    const wrapper = mountHeader()
    expect(wrapper.findComponent(ADarkModeToggle).exists()).toBe(true)
  })

  it('renders the locale selector', () => {
    const wrapper = mountHeader()
    const select = wrapper.find('select[aria-label="Select language"]')
    expect(select.exists()).toBe(true)
  })

  it('toggles mobile menu when hamburger is clicked', async () => {
    const wrapper = mountHeader()
    const hamburgerBtn = wrapper.find('button.md\\:hidden')
    expect(hamburgerBtn.exists()).toBe(true)
    expect(hamburgerBtn.attributes('aria-expanded')).toBe('false')

    await hamburgerBtn.trigger('click')
    expect(hamburgerBtn.attributes('aria-expanded')).toBe('true')

    const mobileNav = wrapper.find('nav[aria-label="Mobile navigation"]')
    expect(mobileNav.exists()).toBe(true)
  })

  it('mobile menu has proper aria-label', () => {
    const wrapper = mountHeader()
    const hamburgerBtn = wrapper.find('button.md\\:hidden')
    expect(hamburgerBtn.attributes('aria-label')).toBe('Toggle navigation menu')
  })
})
