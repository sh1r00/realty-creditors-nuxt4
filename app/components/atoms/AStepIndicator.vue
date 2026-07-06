<script setup lang="ts">
defineProps<{
  currentStep: number
  totalSteps: number
  labels: string[]
}>()
</script>

<template>
  <nav aria-label="Application progress" class="w-full">
    <ol class="flex items-center gap-2">
      <li
        v-for="(label, i) in labels"
        :key="i"
        class="flex items-center gap-2"
        :class="{ 'flex-1': i < labels.length - 1 }"
      >
        <!-- Step circle -->
        <div class="flex items-center gap-2 shrink-0">
          <span
            class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all duration-300"
            :class="{
              'bg-accent-600 text-primary-950': i + 1 <= currentStep,
              'bg-primary-200 dark:bg-primary-700 text-primary-500 dark:text-primary-300': i + 1 > currentStep,
            }"
            :aria-current="i + 1 === currentStep ? 'step' : undefined"
          >
            <span v-if="i + 1 < currentStep" aria-hidden="true">✓</span>
            <span v-else>{{ i + 1 }}</span>
          </span>
          <span
            class="hidden sm:inline text-sm font-medium"
            :class="{
              'text-primary-900 dark:text-white': i + 1 <= currentStep,
              'text-primary-400 dark:text-primary-500': i + 1 > currentStep,
            }"
          >
            {{ label }}
          </span>
        </div>
        <!-- Connector line -->
        <div
          v-if="i < labels.length - 1"
          class="flex-1 h-0.5 rounded transition-all duration-300"
          :class="{
            'bg-accent-600': i + 1 < currentStep,
            'bg-primary-200 dark:bg-primary-700': i + 1 >= currentStep,
          }"
          aria-hidden="true"
        />
      </li>
    </ol>
  </nav>
</template>
