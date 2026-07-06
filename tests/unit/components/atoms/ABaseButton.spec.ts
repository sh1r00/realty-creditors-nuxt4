import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ABaseButton from '~/components/atoms/ABaseButton.vue'

describe('ABaseButton', () => {
  it('renders a button element', () => {
    const wrapper = mount(ABaseButton, { slots: { default: 'Click me' } })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toBe('Click me')
  })

  it('has type="button" by default', () => {
    const wrapper = mount(ABaseButton, { slots: { default: 'OK' } })
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('applies type prop', () => {
    const wrapper = mount(ABaseButton, { props: { type: 'submit' }, slots: { default: 'Submit' } })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('renders disabled state', () => {
    const wrapper = mount(ABaseButton, { props: { disabled: true }, slots: { default: 'Disabled' } })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('renders loading state', () => {
    const wrapper = mount(ABaseButton, { props: { loading: true }, slots: { default: 'Loading...' } })
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('span[role="status"]').exists()).toBe(true)
  })

  it('disables button when loading is true', () => {
    const wrapper = mount(ABaseButton, { props: { loading: true }, slots: { default: 'Submit' } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('emits click event', async () => {
    const wrapper = mount(ABaseButton, { slots: { default: 'Click me' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  it('applies default variant classes (filled primary)', () => {
    const wrapper = mount(ABaseButton, { slots: { default: 'Default' } })
    const classes = wrapper.find('button').classes()
    expect(classes).toContain('bg-primary-700')
  })

  it('applies outlined variant classes', () => {
    const wrapper = mount(ABaseButton, { props: { variant: 'outlined' }, slots: { default: 'Outline' } })
    const classes = wrapper.find('button').classes()
    expect(classes).toContain('border-2')
    expect(classes).toContain('text-primary-700')
  })

  it('applies ghost variant classes', () => {
    const wrapper = mount(ABaseButton, { props: { variant: 'ghost' }, slots: { default: 'Ghost' } })
    const classes = wrapper.find('button').classes()
    expect(classes.some(c => c.startsWith('text-') && !c.includes('white'))).toBe(true)
  })

  it('applies accent color classes', () => {
    const wrapper = mount(ABaseButton, { props: { color: 'accent' }, slots: { default: 'Accent' } })
    const classes = wrapper.find('button').classes()
    expect(classes).toContain('bg-accent-600')
  })

  it('applies danger color classes', () => {
    const wrapper = mount(ABaseButton, { props: { color: 'danger' }, slots: { default: 'Danger' } })
    const classes = wrapper.find('button').classes()
    expect(classes).toContain('bg-red-600')
  })

  it('applies size classes', () => {
    const wrapper = mount(ABaseButton, { props: { size: 'lg' }, slots: { default: 'Large' } })
    const classes = wrapper.find('button').classes()
    expect(classes).toContain('text-lg')
  })

  it('renders slot content', () => {
    const wrapper = mount(ABaseButton, {
      slots: { default: '<strong>Bold text</strong>' }
    })
    expect(wrapper.html()).toContain('<strong>Bold text</strong>')
  })
})
