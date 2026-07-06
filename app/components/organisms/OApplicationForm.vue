<script setup lang="ts">
import { useRealtyStore } from '~/stores/realty'
import type { RealtyForm } from '~/stores/realty'

const { t } = useI18n()
const store = useRealtyStore()

// Local validation state
const errors = ref<Partial<Record<keyof RealtyForm, string>>>({})

const stepLabels = [
  t('form.step1.title'),
  t('form.step2.title'),
  t('form.step3.title'),
  t('form.step4.title'),
  t('form.step5.title'),
]

function validateStep(step: number): boolean {
  errors.value = {}

  if (step === 1) {
    if (!store.form.propertyType.trim()) errors.value.propertyType = t('form.validation.required')
    if (!store.form.propertyValue.trim()) errors.value.propertyValue = t('form.validation.required')
    if (!store.form.loanAmount.trim()) errors.value.loanAmount = t('form.validation.required')
  }

  if (step === 2) {
    if (!store.form.applicantName.trim()) errors.value.applicantName = t('form.validation.required')
    if (!store.form.applicantEmail.trim()) {
      errors.value.applicantEmail = t('form.validation.required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.form.applicantEmail)) {
      errors.value.applicantEmail = t('form.validation.invalidEmail')
    }
    if (!store.form.applicantPhone.trim()) {
      errors.value.applicantPhone = t('form.validation.required')
    } else if (!/^[\d\s()+\-.]{7,}$/.test(store.form.applicantPhone)) {
      errors.value.applicantPhone = t('form.validation.invalidPhone')
    }
  }

  if (step === 3) {
    if (!store.form.employmentStatus.trim()) errors.value.employmentStatus = t('form.validation.required')
    if (!store.form.annualIncome.trim()) errors.value.annualIncome = t('form.validation.required')
  }

  return Object.keys(errors.value).length === 0
}

function handleNext() {
  if (validateStep(store.currentStep)) {
    store.nextStep()
  }
}

function handlePrevious() {
  errors.value = {}
  store.previousStep()
}

function handleSubmit() {
  if (validateStep(4)) {
    store.submitForm()
  }
}

function update(field: keyof RealtyForm, value: string) {
  store.updateField(field, value)
  if (errors.value[field]) {
    errors.value[field] = ''
  }
}

// Reset on unmount
onUnmounted(() => {
  store.resetForm()
})
</script>

<template>
  <section
    id="apply"
    class="py-16 md:py-24 bg-surface-light dark:bg-primary-950"
    aria-labelledby="form-heading"
  >
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-10">
        <h2 id="form-heading" class="font-display text-3xl md:text-4xl font-bold text-primary-900 dark:text-white">
          {{ t('form.title') }}
        </h2>
        <p class="mt-3 text-lg text-primary-600 dark:text-primary-300">
          {{ t('form.subtitle') }}
        </p>
      </div>

      <!-- Progress bar -->
      <div class="mb-10">
        <AStepIndicator
          :current-step="store.currentStep"
          :total-steps="store.totalSteps"
          :labels="stepLabels"
        />
        <div class="mt-2 text-center">
          <span class="text-sm text-primary-500 dark:text-primary-400" aria-live="polite">
            {{ t('form.progress', { current: store.currentStep, total: store.totalSteps }) }}
          </span>
        </div>
      </div>

      <!-- Form card -->
      <div
        class="rounded-2xl bg-white dark:bg-primary-900 shadow-sm border border-outline-variant dark:border-primary-700 p-6 sm:p-8"
        role="region"
        :aria-label="stepLabels[store.currentStep - 1]"
      >
        <!-- Success state -->
        <div v-if="store.isSubmitted" class="text-center py-8 animate-fade-in">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <AIcon name="check_circle" size="lg" decorative />
          </div>
          <h3 class="text-2xl font-bold text-primary-900 dark:text-white mb-2">
            {{ t('form.step5.success') }}
          </h3>
          <p class="text-primary-600 dark:text-primary-300 mb-4 max-w-md mx-auto">
            {{ t('form.step5.successMessage') }}
          </p>
          <p class="text-sm text-primary-500 dark:text-primary-400 mb-6">
            {{ t('form.step5.referenceNumber') }}: <strong class="font-mono">RC-{{ Date.now().toString(36).toUpperCase() }}</strong>
          </p>
          <ABaseButton variant="outlined" color="primary" @click="store.resetForm()">
            {{ t('form.step5.newApplication') }}
          </ABaseButton>
        </div>

        <!-- Step 1: Property Details -->
        <form
          v-else-if="!store.isSubmitted"
          @submit.prevent="handleNext"
          :aria-busy="store.isSubmitting"
          novalidate
        >
          <!-- Step 1 -->
          <div v-if="store.currentStep === 1" class="animate-fade-in space-y-5">
            <div class="mb-6">
              <h3 class="text-xl font-bold text-primary-900 dark:text-white">{{ t('form.step1.title') }}</h3>
              <p class="text-sm text-primary-500 dark:text-primary-400 mt-1">{{ t('form.step1.description') }}</p>
            </div>
            <AInput
              :input-id="'propertyType'"
              :model-value="store.form.propertyType"
              :label="t('form.step1.propertyType')"
              :placeholder="t('form.step1.propertyTypePlaceholder')"
              :error="errors.propertyType"
              required
              @update:model-value="update('propertyType', $event)"
            />
            <AInput
              :input-id="'propertyValue'"
              :model-value="store.form.propertyValue"
              :label="t('form.step1.propertyValue')"
              :placeholder="t('form.step1.propertyValuePlaceholder')"
              :error="errors.propertyValue"
              required
              @update:model-value="update('propertyValue', $event)"
            />
            <AInput
              :input-id="'loanAmount'"
              :model-value="store.form.loanAmount"
              :label="t('form.step1.loanAmount')"
              :placeholder="t('form.step1.loanAmountPlaceholder')"
              :error="errors.loanAmount"
              required
              @update:model-value="update('loanAmount', $event)"
            />
          </div>

          <!-- Step 2: Personal Information -->
          <div v-else-if="store.currentStep === 2" class="animate-fade-in space-y-5">
            <div class="mb-6">
              <h3 class="text-xl font-bold text-primary-900 dark:text-white">{{ t('form.step2.title') }}</h3>
              <p class="text-sm text-primary-500 dark:text-primary-400 mt-1">{{ t('form.step2.description') }}</p>
            </div>
            <AInput
              :input-id="'applicantName'"
              :model-value="store.form.applicantName"
              :label="t('form.step2.name')"
              :placeholder="t('form.step2.namePlaceholder')"
              :error="errors.applicantName"
              required
              @update:model-value="update('applicantName', $event)"
            />
            <AInput
              :input-id="'applicantEmail'"
              type="email"
              :model-value="store.form.applicantEmail"
              :label="t('form.step2.email')"
              :placeholder="t('form.step2.emailPlaceholder')"
              :error="errors.applicantEmail"
              required
              @update:model-value="update('applicantEmail', $event)"
            />
            <AInput
              :input-id="'applicantPhone'"
              type="tel"
              :model-value="store.form.applicantPhone"
              :label="t('form.step2.phone')"
              :placeholder="t('form.step2.phonePlaceholder')"
              :error="errors.applicantPhone"
              required
              @update:model-value="update('applicantPhone', $event)"
            />
          </div>

          <!-- Step 3: Employment & Income -->
          <div v-else-if="store.currentStep === 3" class="animate-fade-in space-y-5">
            <div class="mb-6">
              <h3 class="text-xl font-bold text-primary-900 dark:text-white">{{ t('form.step3.title') }}</h3>
              <p class="text-sm text-primary-500 dark:text-primary-400 mt-1">{{ t('form.step3.description') }}</p>
            </div>
            <AInput
              :input-id="'employmentStatus'"
              :model-value="store.form.employmentStatus"
              :label="t('form.step3.employmentStatus')"
              :placeholder="t('form.step3.employmentPlaceholder')"
              :error="errors.employmentStatus"
              required
              @update:model-value="update('employmentStatus', $event)"
            />
            <AInput
              :input-id="'annualIncome'"
              :model-value="store.form.annualIncome"
              :label="t('form.step3.annualIncome')"
              :placeholder="t('form.step3.annualIncomePlaceholder')"
              :error="errors.annualIncome"
              required
              @update:model-value="update('annualIncome', $event)"
            />
          </div>

          <!-- Step 4: Review -->
          <div v-else-if="store.currentStep === 4" class="animate-fade-in">
            <div class="mb-6">
              <h3 class="text-xl font-bold text-primary-900 dark:text-white">{{ t('form.step4.title') }}</h3>
              <p class="text-sm text-primary-500 dark:text-primary-400 mt-1">{{ t('form.step4.description') }}</p>
            </div>

            <dl class="divide-y divide-primary-100 dark:divide-primary-800">
              <div class="flex justify-between py-3">
                <dt class="text-sm font-medium text-primary-600 dark:text-primary-400">{{ t('form.step4.propertyType') }}</dt>
                <dd class="text-sm text-primary-900 dark:text-white font-medium">{{ store.form.propertyType || '—' }}</dd>
              </div>
              <div class="flex justify-between py-3">
                <dt class="text-sm font-medium text-primary-600 dark:text-primary-400">{{ t('form.step4.propertyValue') }}</dt>
                <dd class="text-sm text-primary-900 dark:text-white font-medium">{{ store.form.propertyValue || '—' }}</dd>
              </div>
              <div class="flex justify-between py-3">
                <dt class="text-sm font-medium text-primary-600 dark:text-primary-400">{{ t('form.step4.loanAmount') }}</dt>
                <dd class="text-sm text-primary-900 dark:text-white font-medium">{{ store.form.loanAmount || '—' }}</dd>
              </div>
              <div class="flex justify-between py-3">
                <dt class="text-sm font-medium text-primary-600 dark:text-primary-400">{{ t('form.step4.name') }}</dt>
                <dd class="text-sm text-primary-900 dark:text-white font-medium">{{ store.form.applicantName || '—' }}</dd>
              </div>
              <div class="flex justify-between py-3">
                <dt class="text-sm font-medium text-primary-600 dark:text-primary-400">{{ t('form.step4.email') }}</dt>
                <dd class="text-sm text-primary-900 dark:text-white font-medium">{{ store.form.applicantEmail || '—' }}</dd>
              </div>
              <div class="flex justify-between py-3">
                <dt class="text-sm font-medium text-primary-600 dark:text-primary-400">{{ t('form.step4.phone') }}</dt>
                <dd class="text-sm text-primary-900 dark:text-white font-medium">{{ store.form.applicantPhone || '—' }}</dd>
              </div>
              <div class="flex justify-between py-3">
                <dt class="text-sm font-medium text-primary-600 dark:text-primary-400">{{ t('form.step4.employment') }}</dt>
                <dd class="text-sm text-primary-900 dark:text-white font-medium">{{ store.form.employmentStatus || '—' }}</dd>
              </div>
              <div class="flex justify-between py-3">
                <dt class="text-sm font-medium text-primary-600 dark:text-primary-400">{{ t('form.step4.income') }}</dt>
                <dd class="text-sm text-primary-900 dark:text-white font-medium">{{ store.form.annualIncome || '—' }}</dd>
              </div>
            </dl>
          </div>

          <!-- Step 5: Confirmation (handled above as success state) -->

          <!-- Navigation buttons -->
          <div v-if="!store.isSubmitted" class="flex items-center justify-between mt-8 pt-6 border-t border-primary-100 dark:border-primary-800">
            <ABaseButton
              v-if="!store.isFirstStep"
              variant="ghost"
              color="primary"
              :disabled="store.isSubmitting"
              @click="handlePrevious"
            >
              ← {{ t('form.previous') }}
            </ABaseButton>
            <div v-else />

            <ABaseButton
              v-if="!store.isLastStep"
              variant="filled"
              color="primary"
              @click="handleNext"
            >
              {{ t('form.next') }} →
            </ABaseButton>

            <ABaseButton
              v-else
              variant="filled"
              color="accent"
              :loading="store.isSubmitting"
              @click="handleSubmit"
            >
              {{ store.isSubmitting ? t('form.submitting') : t('form.submit') }}
            </ABaseButton>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
