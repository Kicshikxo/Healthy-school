<template>
    <div class="field">
        <label v-if="label" :for="`select-organization-${$.uid}`" :class="{ 'opacity-60': isDisabled }">
            {{ label }}
        </label>
        <div class="p-inputgroup">
            <p-dropdown
                :id="`select-organization-${$.uid}`"
                :options="organizations"
                :loading="isLoading"
                :disabled="isDisabled"
                :modelValue="modelValue"
                @update:modelValue="$emit('update:modelValue', $event)"
                :required="true"
                :placeholder="placeholder"
                optionLabel="name"
            />
            <p-button
                icon="pi pi-refresh"
                :disabled="!props.municipalityId"
                :loading="isLoading"
                @click="refresh"
                :class="{ 'p-button-danger': error }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { EducationalOrganization } from '@prisma/client'

const props = defineProps<{
    label?: string
    placeholder?: string
    modelValue?: EducationalOrganization
    disabled?: boolean
    loading?: boolean

    municipalityId?: string
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: EducationalOrganization): void
}>()

const isDisabled = computed(() => props.disabled || !props.municipalityId || !!error.value)
const isLoading = computed(() => !isDisabled.value && (props.loading || loadingData.value))

const {
    data: organizations,
    error: error,
    pending: loadingData,
    refresh: refresh
} = useFetch('/api/organizations/list', {
    query: { municipalityId: computed(() => props.municipalityId) },
    headers: useRequestHeaders() as HeadersInit,
    immediate: !!props.municipalityId
})
</script>
