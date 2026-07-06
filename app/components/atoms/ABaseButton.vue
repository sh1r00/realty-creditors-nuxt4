<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'filled' | 'outlined' | 'ghost'
  color?: 'primary' | 'accent' | 'danger'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
}>(), {
  variant: 'filled',
  color: 'primary',
  type: 'button',
  size: 'md',
})

defineEmits<{ click: [event: MouseEvent] }>()

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
}

const variantClasses = computed(() => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  const colorMap = {
    primary: props.color === 'primary',
    accent: props.color === 'accent',
    danger: props.color === 'danger',
  }

  if (props.variant === 'filled') {
    const bg = colorMap.primary ? 'bg-primary-700 hover:bg-primary-800 text-white focus-visible:outline-accent-500'
      : colorMap.accent ? 'bg-accent-600 hover:bg-accent-700 text-primary-950 focus-visible:outline-primary-500'
      : 'bg-red-600 hover:bg-red-700 text-white focus-visible:outline-red-500'
    return `${base} ${bg}`
  }

  if (props.variant === 'outlined') {
    const border = colorMap.primary ? 'border-2 border-primary-700 text-primary-700 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/30'
      : colorMap.accent ? 'border-2 border-accent-600 text-accent-800 dark:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/30'
      : 'border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30'
    return `${base} ${border}`
  }

  // ghost
  const ghost = colorMap.primary ? 'text-primary-700 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/30'
    : colorMap.accent ? 'text-accent-800 dark:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/30'
    : 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30'
  return `${base} ${ghost}`
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading"
    :aria-disabled="disabled || loading"
    :class="[variantClasses, sizeClasses[size]]"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="animate-spin" role="status" aria-label="Loading">⟳</span>
    <slot />
  </button>
</template>
