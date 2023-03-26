<template>
    <manage-form-input-wrapper :label="label" :inputId="`form-mask-${$.uid}`" :error="error">
        <p-input-mask
            :id="`form-mask-${$.uid}`"
            type="text"
            :loading="loading"
            :disabled="disabled"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
            :required="true"
            :placeholder="placeholder"
            :class="{ 'p-invalid': error }"
            :mask="mask"
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
    mask?: string
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: string): void
}>()
</script>
