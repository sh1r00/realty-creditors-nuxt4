<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: string
  label: string
  inputId: string
  type?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
}>(), {
  type: 'text',
})

defineEmits<{ 'update:modelValue': [value: string] }>()

const errorId = computed(() => `${props.inputId}-error`)
</script>

<template>
  <div>
    <label :for="inputId" class="form-label">
      {{ label }}
      <span v-if="required" class="text-red-500" aria-hidden="true">*</span>
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :aria-invalid="!!error"
      :aria-describedby="error ? errorId : undefined"
      class="form-input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p
      v-if="error"
      :id="errorId"
      class="form-error"
      role="alert"
      aria-live="assertive"
    >
      {{ error }}
    </p>
  </div>
</template>
