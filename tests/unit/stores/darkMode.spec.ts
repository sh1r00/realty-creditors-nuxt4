import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useDarkModeStore } from '~/stores/darkMode'

const STORAGE_KEY = 'dark-mode'

describe('useDarkModeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    document.documentElement.classList.remove('dark')

    // Mock matchMedia
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
  })

  it('returns a store with default state', () => {
    const store = useDarkModeStore()
    expect(store.isDark).toBe(false)
  })

  it('initializes isDark from localStorage when stored value is "true"', () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    const store = useDarkModeStore()
    store.initialize()
    expect(store.isDark).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('initializes isDark from localStorage when stored value is "false"', () => {
    localStorage.setItem(STORAGE_KEY, 'false')
    const store = useDarkModeStore()
    store.initialize()
    expect(store.isDark).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('initializes from system preference when no localStorage value', () => {
    ;(window.matchMedia as ReturnType<typeof vi.fn>).mockImplementation((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    const store = useDarkModeStore()
    store.initialize()
    expect(store.isDark).toBe(true)
  })

  it('toggle() flips isDark', () => {
    const store = useDarkModeStore()
    expect(store.isDark).toBe(false)
    store.toggle()
    expect(store.isDark).toBe(true)
    store.toggle()
    expect(store.isDark).toBe(false)
  })

  it('toggle() updates localStorage', () => {
    const store = useDarkModeStore()
    store.toggle()
    expect(localStorage.getItem(STORAGE_KEY)).toBe('true')
    store.toggle()
    expect(localStorage.getItem(STORAGE_KEY)).toBe('false')
  })

  it('toggle() updates document class', () => {
    const store = useDarkModeStore()
    store.toggle()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    store.toggle()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
