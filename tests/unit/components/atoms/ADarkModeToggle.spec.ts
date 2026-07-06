import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import ADarkModeToggle from '~/components/atoms/ADarkModeToggle.vue'
import AIcon from '~/components/atoms/AIcon.vue'

const messages = {
  a11y: {
    toggleDark: 'Switch to dark mode',
    toggleLight: 'Switch to light mode',
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: { en: messages },
})

// Get the mocked useI18n from global setup
const useI18nMock = (globalThis as any).useI18n as ReturnType<typeof vi.fn>

describe('ADarkModeToggle', () => {
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

  function mountToggle() {
    return mount(ADarkModeToggle, {
      global: {
        plugins: [i18n],
        components: { AIcon },
      },
    })
  }

  it('renders a button', () => {
    const wrapper = mountToggle()
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('has correct aria-label for dark mode off (toggle to dark)', () => {
    const wrapper = mountToggle()
    expect(wrapper.find('button').attributes('aria-label')).toBe('Switch to dark mode')
  })

  it('has aria-pressed matching isDark', () => {
    const wrapper = mountToggle()
    expect(wrapper.find('button').attributes('aria-pressed')).toBe('false')
  })

  it('toggles dark mode on click', async () => {
    const wrapper = mountToggle()
    await wrapper.find('button').trigger('click')

    // After toggling, isDark should be true
    expect(wrapper.find('button').attributes('aria-pressed')).toBe('true')
    expect(wrapper.find('button').attributes('aria-label')).toBe('Switch to light mode')
  })

  it('toggles back on second click', async () => {
    const wrapper = mountToggle()
    await wrapper.find('button').trigger('click')
    await wrapper.find('button').trigger('click')

    expect(wrapper.find('button').attributes('aria-pressed')).toBe('false')
    expect(wrapper.find('button').attributes('aria-label')).toBe('Switch to dark mode')
  })

  it('updates localStorage on toggle', async () => {
    const wrapper = mountToggle()
    await wrapper.find('button').trigger('click')
    expect(localStorage.getItem('dark-mode')).toBe('true')
  })

  it('updates document class on toggle', async () => {
    const wrapper = mountToggle()
    await wrapper.find('button').trigger('click')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
