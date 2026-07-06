<script setup lang="ts">
withDefaults(defineProps<{
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}>(), {
  padding: 'md',
  hover: false,
})

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
}
</script>

<template>
  <div
    class="rounded-xl bg-white dark:bg-primary-900 border border-primary-100 dark:border-primary-800 shadow-sm transition-shadow duration-200"
    :class="[paddingClasses[padding], { 'hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700': hover }]"
  >
    <slot />
  </div>
</template>
