<template>
    <form-wrapper
        :label="label"
        :inputId="`form-select-class-${$.uid}`"
        :errorMessage="errorMessage"
        :hideErrorMessage="hideErrorMessage"
    >
        <div class="p-inputgroup">
            <p-dropdown
                :id="`form-select-class-${$.uid}`"
                :options="classes"
                :loading="isLoading"
                :disabled="isDisabled"
                :modelValue="modelValue"
                @update:modelValue="$emit('update:modelValue', $event)"
                :required="true"
                :placeholder="placeholder"
                :class="{ 'p-invalid': errorMessage }"
            >
                <template v-if="classes?.length" #value="{ value }">
                    <span v-if="value"> {{ value?.number }}{{ value?.liter }} </span>
                    <span v-if="!isNil(value?._count?.students)"> ( {{ value?._count?.students }} человек )</span>
                </template>
                <template v-if="classes?.length" #option="{ option }">
                    <span v-if="option"> {{ option?.number }}{{ option?.liter }}</span>
                    <span v-if="!isNil(option?._count?.students)"> ( {{ option?._count?.students }} человек )</span>
                </template>
            </p-dropdown>
            <p-button
                icon="pi pi-refresh"
                :disabled="isButtonDisabled"
                :loading="isLoading"
                @click="refreshData"
                :class="{ 'p-button-danger': errorData }"
            />
        </div>
    </form-wrapper>
</template>

<script setup lang="ts">
import { Class } from '@prisma/client'

const props = defineProps<{
    label?: string
    placeholder?: string
    errorMessage?: string
    hideErrorMessage?: boolean
    modelValue?: Class
    disabled?: boolean
    loading?: boolean

    organizationId?: string
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: Class): void
}>()

const isDisabled = computed(() => props.disabled || !props.organizationId || !!errorData.value)
const isButtonDisabled = computed(() => props.disabled || !props.organizationId)
const isLoading = computed(() => !isDisabled.value && (props.loading || loadingData.value))

const {
    data: classes,
    error: errorData,
    pending: loadingData,
    refresh: refreshData
} = useFetch('/api/classes/list', {
    query: { organizationId: computed(() => props.organizationId) },
    headers: useRequestHeaders() as HeadersInit,
    immediate: !!props.organizationId
})
</script>
