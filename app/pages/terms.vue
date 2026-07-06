<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Terms of Service — Realty Creditors',
  description: 'Realty Creditors terms of service and conditions.',
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 class="font-display text-3xl md:text-4xl font-bold text-primary-900 dark:text-white mb-8">
      {{ t('footer.terms') }}
    </h1>
    <div class="prose prose-lg dark:prose-invert max-w-none">
      <p class="text-primary-600 dark:text-primary-300 leading-relaxed">
        By using Realty Creditors' website and services, you agree to these Terms of Service.
      </p>
      <h2 class="text-xl font-bold text-primary-900 dark:text-white mt-8 mb-4">Services</h2>
      <p class="text-primary-600 dark:text-primary-300">Realty Creditors provides real estate financing information and loan application services. All loan decisions are subject to credit approval and underwriting.</p>
      <h2 class="text-xl font-bold text-primary-900 dark:text-white mt-8 mb-4">Disclaimer</h2>
      <p class="text-primary-600 dark:text-primary-300">Information provided on this website is for general informational purposes only. Loan rates, terms, and availability are subject to change without notice.</p>
    </div>
  </div>
</template>
