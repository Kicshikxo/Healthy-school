<template>
    <manage-form-input-wrapper :label="label" :inputId="`form-text-${$.uid}`" :error="error">
        <p-input-text
            :id="`form-text-${$.uid}`"
            type="text"
            :loading="loading"
            :disabled="disabled"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
            :required="true"
            :placeholder="placeholder"
            :class="{ 'p-invalid': error }"
        />
    </manage-form-input-wrapper>
</template>

<script setup lang="ts">
const props = defineProps<{
    label?: string
    placeholder?: string
    error?: string
    modelValue?: string
    disabled?: boolean
    loading?: boolean
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: string): void
}>()
</script>
