<template>
    <manage-form-input-wrapper :label="label" :inputId="`form-dropdown-${$.uid}`" :error="error">
        <p-dropdown
            :inputId="`form-dropdown-${$.uid}`"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
            :required="true"
            :placeholder="placeholder"
            :class="{ 'p-invalid': error }"
            :options="options"
            :optionLabel="optionLabel"
            :optionValue="optionValue"
            panelClass="border-1 surface-border"
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

    options?: any[]
    optionLabel?: string
    optionValue?: string
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: string): void
}>()
</script>
