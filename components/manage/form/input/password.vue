<template>
    <manage-form-input-wrapper :label="label" :inputId="`form-password-${$.uid}`" :error="error">
        <p-password
            :id="`form-password-${$.uid}`"
            type="password"
            :loading="loading"
            :disabled="disabled"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
            :required="true"
            :toggle-mask="true"
            :feedback="false"
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
