<template>
    <manage-form-input-wrapper :label="label" :inputId="`form-calendar-${$.uid}`" :error="error">
        <p-calendar
            :inputId="`form-calendar-${$.uid}`"
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
    modelValue?: Date
    disabled?: boolean
    loading?: boolean
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: Date): void
}>()
</script>
