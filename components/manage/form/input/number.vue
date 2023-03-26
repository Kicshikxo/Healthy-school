<template>
    <manage-form-input-wrapper :label="label" :inputId="`form-number-${$.uid}`" :error="error">
        <p-input-number
            :inputId="`form-number-${$.uid}`"
            type="number"
            :loading="loading"
            :disabled="disabled"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
            :required="true"
            :placeholder="placeholder"
            :class="{ 'p-invalid': error }"
            :min="min"
            :max="max"
            :show-buttons="true"
        />
    </manage-form-input-wrapper>
</template>

<script setup lang="ts">
const props = defineProps<{
    label?: string
    placeholder?: string
    error?: string
    modelValue?: number
    disabled?: boolean
    loading?: boolean
    min?: number
    max?: number
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: number): void
}>()
</script>
