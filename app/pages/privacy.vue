<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Privacy Policy — Realty Creditors',
  description: 'Realty Creditors privacy policy and data handling practices.',
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 class="font-display text-3xl md:text-4xl font-bold text-primary-900 dark:text-white mb-8">
      {{ t('footer.privacy') }}
    </h1>
    <div class="prose prose-lg dark:prose-invert max-w-none">
      <p class="text-primary-600 dark:text-primary-300 leading-relaxed">
        Realty Creditors is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
      </p>
      <h2 class="text-xl font-bold text-primary-900 dark:text-white mt-8 mb-4">Information We Collect</h2>
      <p class="text-primary-600 dark:text-primary-300">We collect information you provide directly, including name, email, phone number, property details, employment status, and income information when you submit a loan application through our website.</p>
      <h2 class="text-xl font-bold text-primary-900 dark:text-white mt-8 mb-4">How We Use Your Information</h2>
      <p class="text-primary-600 dark:text-primary-300">We use your information to process loan applications, communicate with you, and provide our real estate financing services. We do not sell your personal information to third parties.</p>
      <h2 class="text-xl font-bold text-primary-900 dark:text-white mt-8 mb-4">Data Security</h2>
      <p class="text-primary-600 dark:text-primary-300">We implement industry-standard security measures to protect your data. All information is encrypted in transit and at rest.</p>
    </div>
  </div>
</template>
