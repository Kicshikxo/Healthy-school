<template>
    <form-wrapper
        :label="label"
        :inputId="`form-select-organization-${$.uid}`"
        :disabled="isDisabled"
        :errorMessage="errorMessage"
        :hideErrorMessage="hideErrorMessage"
    >
        <div class="p-inputgroup">
            <p-dropdown
                :id="`form-select-organization-${$.uid}`"
                :options="organizations"
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
                @click="refreshData"
                :class="{ 'p-button-danger': errorData && !isButtonDisabled }"
            />
        </div>
    </form-wrapper>
</template>

<script setup lang="ts">
import { EducationalOrganization } from '@prisma/client'

const props = defineProps<{
    label?: string
    placeholder?: string
    errorMessage?: string
    hideErrorMessage?: boolean
    modelValue?: EducationalOrganization
    disabled?: boolean
    loading?: boolean

    municipalityId?: string
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: EducationalOrganization): void
}>()

const isDisabled = computed(() => props.disabled || !props.municipalityId || !!errorData.value)
const isButtonDisabled = computed(() => props.disabled || !props.municipalityId)
const isLoading = computed(() => !isDisabled.value && (props.loading || loadingData.value))

const {
    data: organizations,
    error: errorData,
    pending: loadingData,
    refresh: refreshData
} = useFetch('/api/organizations/list', {
    query: { municipalityId: computed(() => props.municipalityId) },
    immediate: !!props.municipalityId
})
</script>
