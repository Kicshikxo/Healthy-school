<template>
    <div class="field">
        <label v-if="label" :for="`select-municipality-${$.uid}`" :class="{ 'opacity-60': isDisabled }">
            {{ label }}
        </label>
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
                optionLabel="name"
            />
            <p-button icon="pi pi-refresh" :loading="isLoading" @click="refresh" :class="{ 'p-button-danger': error }" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Municipality } from '@prisma/client'

const props = defineProps<{
    label?: string
    placeholder?: string
    modelValue?: Municipality
    disabled?: boolean
    loading?: boolean
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: Municipality): void
}>()

const isDisabled = computed(() => props.disabled || !!error.value)
const isLoading = computed(() => !isDisabled.value && (props.loading || loadingData.value))

const {
    data: municipalities,
    error: error,
    pending: loadingData,
    refresh: refresh
} = useFetch('/api/municipalities/list', {
    headers: useRequestHeaders() as HeadersInit
})
</script>
