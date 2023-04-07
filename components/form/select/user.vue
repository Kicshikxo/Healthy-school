<template>
    <form-wrapper
        :label="label"
        :inputId="`form-select-user-${$.uid}`"
        :disabled="isDisabled"
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
                dataKey="id"
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
                :disabled="isButtonDisabled"
                :loading="isLoading"
                @click="refreshData"
                :class="{ 'p-button-danger': errorData && !isButtonDisabled }"
            />
        </div>
    </form-wrapper>
</template>

<script setup lang="ts">
import { Class, ClassTeacher, User } from '@prisma/client'

const props = defineProps<{
    label?: string
    placeholder?: string
    errorMessage?: string
    hideErrorMessage?: boolean
    modelValue?: User & {
        classes?: (ClassTeacher & {
            class: Class
        })[]
    }
    disabled?: boolean
    loading?: boolean

    organizationId?: string
}>()

const emits = defineEmits<{
    (
        event: 'update:modelValue',
        value: User & {
            classes?: (ClassTeacher & {
                class: Class
            })[]
        }
    ): void
}>()

const isDisabled = computed(() => props.disabled || !props.organizationId || !!errorData.value)
const isButtonDisabled = computed(() => props.disabled || !props.organizationId)
const isLoading = computed(() => !isDisabled.value && (props.loading || loadingData.value))

const {
    data: users,
    error: errorData,
    pending: loadingData,
    refresh: refreshData
} = useFetch('/api/users/list', {
    query: { organizationId: computed(() => props.organizationId) },
    headers: useRequestHeaders() as HeadersInit,
    immediate: !!props.organizationId
})
</script>
