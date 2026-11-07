<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('hero.title'),
  description: t('hero.subtitle'),
  ogTitle: t('hero.title'),
  ogDescription: t('hero.subtitle'),
  ogImage: '/og-image.png',
  ogType: 'website',
})

const features = [
  { icon: 'bolt', key: 'features.fast' },
  { icon: 'trending_down', key: 'features.rates' },
  { icon: 'support_agent', key: 'features.support' },
]

function scrollToApply() {
  document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 dark:from-primary-950 dark:via-primary-900 dark:to-black"
      aria-labelledby="hero-heading"
    >
      <!-- Decorative geometric background -->
      <div class="absolute inset-0 opacity-10" aria-hidden="true">
        <div class="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-accent-700 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div class="max-w-3xl animate-slide-up">
          <h1
            id="hero-heading"
            class="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
          >
            {{ t('hero.title') }}
          </h1>
          <p class="mt-6 text-lg md:text-xl text-primary-200 leading-relaxed max-w-2xl">
            {{ t('hero.subtitle') }}
          </p>
          <div class="mt-10 flex flex-col sm:flex-row gap-4">
            <ABaseButton
              variant="filled"
              color="accent"
              size="lg"
              @click="scrollToApply"
            >
              {{ t('hero.cta') }}
            </ABaseButton>
            <ABaseButton
              variant="outlined"
              color="accent"
              size="lg"
              class="!border-white/30 !text-white hover:!bg-white/10"
              @click="scrollToApply"
            >
              {{ t('hero.learnMore') }}
            </ABaseButton>
          </div>
        </div>
      </div>

      <!-- Wave divider -->
      <div class="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" class="fill-white dark:fill-primary-950" />
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section
      id="about"
      class="py-16 md:py-24 bg-white dark:bg-primary-950"
      aria-labelledby="features-heading"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="features-heading"
          class="font-display text-3xl md:text-4xl font-bold text-center text-primary-900 dark:text-white"
        >
          {{ t('features.title') }}
        </h2>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <article
            v-for="(feature, i) in features"
            :key="feature.key"
            class="group rounded-2xl bg-surface-light dark:bg-primary-900 p-8 border border-primary-100 dark:border-primary-800 hover:border-accent-300 dark:hover:border-accent-800 hover:shadow-md transition-all duration-300"
            :class="[`animate-slide-up`]"
            :style="{ animationDelay: `${i * 150}ms` }"
          >
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-100 dark:bg-accent-900/30 mb-4">
              <AIcon :name="feature.icon" size="md" decorative />
            </div>
            <h3 class="text-lg font-bold text-primary-900 dark:text-white mb-2">
              {{ t(`${feature.key}.title`) }}
            </h3>
            <p class="text-sm text-primary-600 dark:text-primary-300 leading-relaxed">
              {{ t(`${feature.key}.description`) }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- Trust bar -->
    <section
      class="py-12 bg-primary-900 dark:bg-black"
      aria-label="Trusted by"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
          <div class="text-primary-300 text-sm font-semibold tracking-widest uppercase">FDIC Insured</div>
          <div class="text-primary-300 text-sm font-semibold tracking-widest uppercase">Licensed & Bonded</div>
          <div class="text-primary-300 text-sm font-semibold tracking-widest uppercase">NMLS Certified</div>
          <div class="text-primary-300 text-sm font-semibold tracking-widest uppercase">BBB Accredited</div>
        </div>
      </div>
    </section>

    <!-- Application Form -->
    <OApplicationForm />

    <!-- Contact Section -->
    <section
      id="contact"
      class="py-16 md:py-24 bg-primary-900 dark:bg-black"
      aria-labelledby="contact-heading"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 id="contact-heading" class="font-display text-3xl md:text-4xl font-bold text-white">
          {{ t('footer.contact') }}
        </h2>
        <p class="mt-4 text-lg text-primary-300">
          info@realtycreditors.com · (555) 123-4567
        </p>
        <p class="mt-2 text-sm text-primary-400">
          123 Financial District, Suite 400 · New York, NY 10005
        </p>
      </div>
    </section>
  </div>
</template>
