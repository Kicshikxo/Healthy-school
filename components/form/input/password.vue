<template>
    <form-wrapper
        :label="label"
        :inputId="`form-password-${$.uid}`"
        :errorMessage="errorMessage"
        :hideErrorMessage="hideErrorMessage"
    >
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
