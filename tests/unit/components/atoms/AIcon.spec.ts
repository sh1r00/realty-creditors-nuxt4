import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AIcon from '~/components/atoms/AIcon.vue'

describe('AIcon', () => {
  it('renders a span with material-icons class', () => {
    const wrapper = mount(AIcon, { props: { name: 'home' } })
    const span = wrapper.find('span')
    expect(span.exists()).toBe(true)
    expect(span.classes()).toContain('material-icons')
  })

  it('displays the icon name text', () => {
    const wrapper = mount(AIcon, { props: { name: 'search' } })
    expect(wrapper.text()).toBe('search')
  })

  it('has default size md (text-2xl)', () => {
    const wrapper = mount(AIcon, { props: { name: 'home' } })
    expect(wrapper.find('span').classes()).toContain('text-2xl')
  })

  it('applies sm size class', () => {
    const wrapper = mount(AIcon, { props: { name: 'home', size: 'sm' } })
    expect(wrapper.find('span').classes()).toContain('text-lg')
  })

  it('applies lg size class', () => {
    const wrapper = mount(AIcon, { props: { name: 'home', size: 'lg' } })
    expect(wrapper.find('span').classes()).toContain('text-4xl')
  })

  it('sets aria-hidden when decorative', () => {
    const wrapper = mount(AIcon, { props: { name: 'check', decorative: true } })
    const span = wrapper.find('span')
    expect(span.attributes('aria-hidden')).toBe('true')
    expect(span.attributes('role')).toBe('presentation')
  })

  it('does not set aria-label when decorative', () => {
    const wrapper = mount(AIcon, { props: { name: 'check', decorative: true } })
    const span = wrapper.find('span')
    expect(span.attributes('aria-label')).toBeUndefined()
  })

  it('sets role="img" and aria-label when not decorative', () => {
    const wrapper = mount(AIcon, { props: { name: 'star' } })
    const span = wrapper.find('span')
    expect(span.attributes('role')).toBe('img')
    expect(span.attributes('aria-label')).toBe('star')
  })

  it('has select-none class', () => {
    const wrapper = mount(AIcon, { props: { name: 'info' } })
    expect(wrapper.find('span').classes()).toContain('select-none')
  })
})
