<template>
    <form-wrapper
        :label="label"
        :inputId="`form-number-${$.uid}`"
        :errorMessage="errorMessage"
        :hideErrorMessage="hideErrorMessage"
    >
        <p-input-number
            :inputId="`form-number-${$.uid}`"
            type="number"
            :loading="loading"
            :disabled="disabled"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
            :required="true"
            :placeholder="placeholder"
            :class="{ 'p-invalid': errorMessage }"
            :min="min"
            :max="max"
            :show-buttons="true"
        />
    </form-wrapper>
</template>

<script setup lang="ts">
const props = defineProps<{
    label?: string
    placeholder?: string
    errorMessage?: string
    hideErrorMessage?: boolean
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
