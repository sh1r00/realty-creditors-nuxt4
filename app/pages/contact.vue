<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Contact Us — Realty Creditors',
  description: 'Get in touch with Realty Creditors for real estate financing.',
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 class="font-display text-3xl md:text-4xl font-bold text-primary-900 dark:text-white mb-8">
      {{ t('footer.contact') }}
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="rounded-2xl bg-surface-light dark:bg-primary-900 p-6 border border-primary-100 dark:border-primary-800">
        <h2 class="text-lg font-bold text-primary-900 dark:text-white mb-3">Email</h2>
        <p class="text-primary-600 dark:text-primary-300">info@realtycreditors.com</p>
      </div>
      <div class="rounded-2xl bg-surface-light dark:bg-primary-900 p-6 border border-primary-100 dark:border-primary-800">
        <h2 class="text-lg font-bold text-primary-900 dark:text-white mb-3">Phone</h2>
        <p class="text-primary-600 dark:text-primary-300">(555) 123-4567</p>
      </div>
      <div class="rounded-2xl bg-surface-light dark:bg-primary-900 p-6 border border-primary-100 dark:border-primary-800 md:col-span-2">
        <h2 class="text-lg font-bold text-primary-900 dark:text-white mb-3">Office</h2>
        <p class="text-primary-600 dark:text-primary-300">123 Financial District, Suite 400<br>New York, NY 10005</p>
      </div>
    </div>
  </div>
</template>
