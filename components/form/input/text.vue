<template>
    <form-wrapper
        :label="label"
        :inputId="`form-text-${$.uid}`"
        :disabled="disabled"
        :errorMessage="errorMessage"
        :hideErrorMessage="hideErrorMessage"
    >
        <p-input-text
            :id="`form-text-${$.uid}`"
            type="text"
            :loading="loading"
            :disabled="disabled"
            :modelValue.trim="modelValue"
            @update:modelValue="$emit('update:modelValue', $event?.trim())"
            :required="true"
            :placeholder="placeholder"
            :class="{ 'p-invalid': errorMessage }"
        />
    </form-wrapper>
</template>

<script setup lang="ts">
const props = defineProps<{
    label?: string
    placeholder?: string
    errorMessage?: string
    hideErrorMessage?: boolean
    modelValue?: string
    disabled?: boolean
    loading?: boolean
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: string): void
}>()
</script>
