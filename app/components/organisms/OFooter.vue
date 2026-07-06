<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()

const links = [
  { key: 'footer.privacy', to: '/privacy' },
  { key: 'footer.terms', to: '/terms' },
  { key: 'footer.contact', to: '/contact' },
]
</script>

<template>
  <footer class="bg-primary-900 dark:bg-black text-primary-200 border-t border-primary-800" role="contentinfo">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand -->
        <div>
          <span class="font-display text-xl font-bold text-white">
            Realty<span class="text-accent-500">Creditors</span>
          </span>
          <p class="mt-2 text-sm text-primary-400 max-w-xs">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <!-- Links -->
        <nav aria-label="Footer links">
          <ul class="space-y-2">
            <li v-for="link in links" :key="link.key">
              <NuxtLink
                :to="link.to"
                class="text-sm text-primary-300 hover:text-white transition-colors"
              >
                {{ t(link.key) }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Contact -->
        <div>
          <h3 class="text-sm font-semibold text-white mb-2">{{ t('footer.contact') }}</h3>
          <p class="text-sm text-primary-400">info@realtycreditors.com</p>
          <p class="text-sm text-primary-400">(555) 123-4567</p>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-primary-800 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p class="text-xs text-primary-500">
          {{ t('footer.copyright', { year }) }}
        </p>
        <p class="text-xs text-primary-500">
          Made with ❤️ by SH1R00
        </p>
      </div>
    </div>
  </footer>
</template>
