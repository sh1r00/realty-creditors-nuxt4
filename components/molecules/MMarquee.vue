<script setup lang="ts">
// Generic capability ticker — edit these to your real value props.
const items = [
  'Fast Turnaround',
  'Reliable Delivery',
  'Scalable Solutions',
  'Secure & Private',
  '24/7 Support',
  'Transparent Pricing',
]
</script>

<template>
  <div
    class="marquee overflow-hidden py-4 border-t border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 select-none"
    aria-hidden="true"
  >
    <div class="marquee-track flex w-max">
      <div v-for="n in 2" :key="n" class="marquee-group flex items-center shrink-0">
        <span
          v-for="item in items"
          :key="`${n}-${item}`"
          class="marquee-item inline-flex items-center gap-3 px-5 text-gray-600 dark:text-gray-300 font-bold tracking-wide whitespace-nowrap"
        >
          {{ item }}
          <span class="marquee-star text-blue-600 dark:text-blue-400" aria-hidden="true">✦</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-track {
  animation: marquee-scroll 32s linear infinite;
}
.marquee:hover .marquee-track {
  animation-play-state: paused;
}
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}
@media (hover: none) {
  .marquee-track { animation-duration: 48s; }
}
</style>
