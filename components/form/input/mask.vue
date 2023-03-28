<template>
    <form-wrapper
        :label="label"
        :inputId="`form-mask-${$.uid}`"
        :errorMessage="errorMessage"
        :hideErrorMessage="hideErrorMessage"
    >
        <p-input-mask
            :id="`form-mask-${$.uid}`"
            type="text"
            :loading="loading"
            :disabled="disabled"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)"
            :required="true"
            :placeholder="placeholder"
            :class="{ 'p-invalid': errorMessage }"
            :mask="mask"
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
    mask?: string
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: string): void
}>()
</script>
