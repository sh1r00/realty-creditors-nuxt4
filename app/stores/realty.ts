import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface StepField {
  label: string
  value: string
  error: string
  touched: boolean
}

export interface RealtyForm {
  propertyType: string
  propertyValue: string
  loanAmount: string
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  employmentStatus: string
  annualIncome: string
}

export const useRealtyStore = defineStore('realty', () => {
  const currentStep = ref(1)
  const totalSteps = 5
  const isSubmitting = ref(false)
  const isSubmitted = ref(false)

  const form: Ref<RealtyForm> = ref({
    propertyType: '',
    propertyValue: '',
    loanAmount: '',
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    employmentStatus: '',
    annualIncome: '',
  })

  const progressPercent = computed(() =>
    Math.round((currentStep.value / totalSteps) * 100)
  )

  const isFirstStep = computed(() => currentStep.value === 1)
  const isLastStep = computed(() => currentStep.value === totalSteps)

  function nextStep() {
    if (currentStep.value < totalSteps) {
      currentStep.value++
    }
  }

  function previousStep() {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  function goToStep(step: number) {
    if (step >= 1 && step <= totalSteps) {
      currentStep.value = step
    }
  }

  function updateField(field: keyof RealtyForm, value: string) {
    form.value[field] = value
  }

  async function submitForm() {
    isSubmitting.value = true
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    isSubmitting.value = false
    isSubmitted.value = true
  }

  function resetForm() {
    currentStep.value = 1
    isSubmitting.value = false
    isSubmitted.value = false
    form.value = {
      propertyType: '',
      propertyValue: '',
      loanAmount: '',
      applicantName: '',
      applicantEmail: '',
      applicantPhone: '',
      employmentStatus: '',
      annualIncome: '',
    }
  }

  return {
    currentStep,
    totalSteps,
    form,
    isSubmitting,
    isSubmitted,
    progressPercent,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    goToStep,
    updateField,
    submitForm,
    resetForm,
  }
})
