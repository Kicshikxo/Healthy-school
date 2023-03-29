<template>
    <form-wrapper
        :label="label"
        :inputId="`form-select-municipality-${$.uid}`"
        :errorMessage="errorMessage"
        :hideErrorMessage="hideErrorMessage"
    >
        <div class="p-inputgroup">
            <p-dropdown
                :id="`select-municipality-${$.uid}`"
                :options="municipalities"
                :loading="isLoading"
                :disabled="isDisabled"
                :modelValue="modelValue"
                @update:modelValue="$emit('update:modelValue', $event)"
                :required="true"
                :placeholder="placeholder"
                :class="{ 'p-invalid': errorMessage }"
                optionLabel="name"
                dataKey="id"
            />
            <p-button
                icon="pi pi-refresh"
                :disabled="isButtonDisabled"
                :loading="isLoading"
                @click="refresh"
                :class="{ 'p-button-danger': errorData }"
            />
        </div>
    </form-wrapper>
</template>

<script setup lang="ts">
import { Municipality } from '@prisma/client'

const props = defineProps<{
    label?: string
    placeholder?: string
    errorMessage?: string
    hideErrorMessage?: boolean
    modelValue?: Municipality
    disabled?: boolean
    loading?: boolean
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: Municipality): void
}>()

const isDisabled = computed(() => props.disabled || !!errorData.value)
const isButtonDisabled = computed(() => props.disabled)
const isLoading = computed(() => !isDisabled.value && (props.loading || loadingData.value))

const {
    data: municipalities,
    error: errorData,
    pending: loadingData,
    refresh: refresh
} = useFetch('/api/municipalities/list', {
    headers: useRequestHeaders() as HeadersInit
})
</script>
