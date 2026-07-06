import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import OFooter from '~/components/organisms/OFooter.vue'

const messages = {
  footer: {
    tagline: 'Professional real estate financing solutions since 2005.',
    copyright: '© {year} Realty Creditors. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    contact: 'Contact Us',
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: { en: messages },
})

// Get the mocked useI18n from global setup
const useI18nMock = (globalThis as any).useI18n as ReturnType<typeof vi.fn>

describe('OFooter', () => {
  beforeEach(() => {
    // Override useI18n to use the real i18n instance
    useI18nMock.mockReturnValue({
      t: i18n.global.t,
      locale: i18n.global.locale,
      setLocale: vi.fn(),
      defaultLocale: i18n.global.locale,
    })
  })

  function mountFooter() {
    return mount(OFooter, {
      global: {
        plugins: [i18n],
        stubs: {
          NuxtLink: {
            template: '<a :href="to"><slot /></a>',
            props: ['to'],
          },
        },
      },
    })
  }

  it('renders a footer element with contentinfo role', () => {
    const wrapper = mountFooter()
    const footer = wrapper.find('footer')
    expect(footer.exists()).toBe(true)
    expect(footer.attributes('role')).toBe('contentinfo')
  })

  it('renders the brand name', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('Realty')
    expect(wrapper.text()).toContain('Creditors')
  })

  it('renders the tagline', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('Professional real estate financing solutions since 2005.')
  })

  it('renders footer navigation links', () => {
    const wrapper = mountFooter()
    const nav = wrapper.find('nav[aria-label="Footer links"]')
    expect(nav.exists()).toBe(true)

    expect(wrapper.text()).toContain('Privacy Policy')
    expect(wrapper.text()).toContain('Terms of Service')
    expect(wrapper.text()).toContain('Contact Us')
  })

  it('renders three navigation links', () => {
    const wrapper = mountFooter()
    const nav = wrapper.find('nav[aria-label="Footer links"]')
    const links = nav.findAll('a')
    expect(links.length).toBe(3)
  })

  it('renders copyright with current year', () => {
    const wrapper = mountFooter()
    const year = new Date().getFullYear()
    expect(wrapper.text()).toContain(`© ${year}`)
  })

  it('renders contact information', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('info@realtycreditors.com')
    expect(wrapper.text()).toContain('(555) 123-4567')
  })

  it('renders the SH1R00 credit', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('Made with ❤️ by SH1R00')
  })
})
