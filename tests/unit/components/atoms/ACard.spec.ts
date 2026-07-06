import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ACard from '~/components/atoms/ACard.vue'

describe('ACard', () => {
  it('renders a div element', () => {
    const wrapper = mount(ACard, { slots: { default: 'Card content' } })
    const div = wrapper.find('div')
    expect(div.exists()).toBe(true)
    expect(div.text()).toBe('Card content')
  })

  it('renders slot content', () => {
    const wrapper = mount(ACard, {
      slots: { default: '<h2>Title</h2><p>Description</p>' }
    })
    expect(wrapper.html()).toContain('<h2>Title</h2>')
    expect(wrapper.html()).toContain('<p>Description</p>')
  })

  it('has base styling classes', () => {
    const wrapper = mount(ACard)
    const div = wrapper.find('div')
    expect(div.classes()).toContain('rounded-xl')
    expect(div.classes()).toContain('bg-white')
    expect(div.classes()).toContain('shadow-sm')
  })

  it('applies default md padding', () => {
    const wrapper = mount(ACard)
    expect(wrapper.find('div').classes()).toContain('p-5')
  })

  it('applies sm padding', () => {
    const wrapper = mount(ACard, { props: { padding: 'sm' } })
    expect(wrapper.find('div').classes()).toContain('p-3')
  })

  it('applies lg padding', () => {
    const wrapper = mount(ACard, { props: { padding: 'lg' } })
    expect(wrapper.find('div').classes()).toContain('p-7')
  })

  it('applies none padding', () => {
    const wrapper = mount(ACard, { props: { padding: 'none' } })
    // Should NOT have any p- classes
    const classes = wrapper.find('div').classes()
    expect(classes.filter(c => c.startsWith('p-')).length).toBe(0)
  })

  it('does not have hover classes by default', () => {
    const wrapper = mount(ACard)
    const classes = wrapper.find('div').classes()
    expect(classes).not.toContain('hover:shadow-md')
  })

  it('adds hover classes when hover prop is true', () => {
    const wrapper = mount(ACard, { props: { hover: true } })
    const classes = wrapper.find('div').classes()
    expect(classes).toContain('hover:shadow-md')
  })
})
