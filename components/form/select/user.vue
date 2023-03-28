<template>
    <form-wrapper
        :label="label"
        :inputId="`form-select-user-${$.uid}`"
        :errorMessage="errorMessage"
        :hideErrorMessage="hideErrorMessage"
    >
        <div class="p-inputgroup">
            <p-dropdown
                :id="`form-select-user-${$.uid}`"
                :options="users"
                :loading="isLoading"
                :disabled="isDisabled"
                :modelValue="modelValue"
                @update:modelValue="$emit('update:modelValue', $event)"
                :required="true"
                :placeholder="placeholder"
                :class="{ 'p-invalid': errorMessage }"
            >
                <template v-if="users?.length" #value="{ value }">
                    <span v-if="value">
                        {{ value.secondName }} {{ value.firstName }} {{ value.middleName }} — {{ localizeRole(value.role) }}
                    </span>
                </template>
                <template v-if="users?.length" #option="{ option }">
                    <span v-if="option">
                        {{ option.secondName }} {{ option.firstName }} {{ option.middleName }} — {{ localizeRole(option.role) }}
                    </span>
                </template>
            </p-dropdown>
            <p-button
                icon="pi pi-refresh"
                :disabled="!props.organizationId"
                :loading="isLoading"
                @click="refreshData"
                :class="{ 'p-button-danger': error }"
            />
        </div>
    </form-wrapper>
</template>

<script setup lang="ts">
import { User } from '@prisma/client'

const props = defineProps<{
    label?: string
    placeholder?: string
    errorMessage?: string
    hideErrorMessage?: boolean
    modelValue?: User
    disabled?: boolean
    loading?: boolean

    organizationId?: string
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: User): void
}>()

const isDisabled = computed(() => props.disabled || !props.organizationId || !!error.value)
const isLoading = computed(() => !isDisabled.value && (props.loading || loadingData.value))

const {
    data: users,
    error: error,
    pending: loadingData,
    refresh: refreshData
} = useFetch('/api/users/list', {
    query: { organizationId: computed(() => props.organizationId) },
    headers: useRequestHeaders() as HeadersInit,
    immediate: !!props.organizationId
})
</script>
