<template>
    <form-wrapper
        :label="label"
        :inputId="`form-dropdown-${$.uid}`"
        :disabled="disabled"
        :errorMessage="errorMessage"
        :hideErrorMessage="hideErrorMessage"
    >
        <p-dropdown
            :inputId="`form-dropdown-${$.uid}`"
            :loading="loading"
            :disabled="disabled"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
            :required="true"
            :placeholder="placeholder"
            :class="{ 'p-invalid': errorMessage }"
            :options="options"
            :optionLabel="optionLabel"
            :optionValue="optionValue"
            panelClass="border-1 surface-border"
            dataKey="id"
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

    options?: any[]
    optionLabel?: string
    optionValue?: string
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: string): void
}>()
</script>
