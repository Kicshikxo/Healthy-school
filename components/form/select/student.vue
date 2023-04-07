<template>
    <form-wrapper
        :label="label"
        :inputId="`form-select-student-${$.uid}`"
        :disabled="isDisabled"
        :errorMessage="errorMessage"
        :hideErrorMessage="hideErrorMessage"
    >
        <div class="p-inputgroup">
            <p-dropdown
                :id="`form-select-student-${$.uid}`"
                :options="students"
                :loading="isLoading"
                :disabled="isDisabled"
                :modelValue="modelValue"
                @update:modelValue="$emit('update:modelValue', $event)"
                :required="true"
                :placeholder="placeholder"
                :class="{ 'p-invalid': errorMessage }"
                dataKey="id"
            >
                <template v-if="students?.length" #value="{ value }">
                    <span v-if="value"> {{ value.secondName }} {{ value.firstName }} {{ value.middleName }} </span>
                </template>
                <template v-if="students?.length" #option="{ option }">
                    <span v-if="option"> {{ option.secondName }} {{ option.firstName }} {{ option.middleName }} </span>
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
import { Student } from '@prisma/client'

const props = defineProps<{
    label?: string
    placeholder?: string
    errorMessage?: string
    hideErrorMessage?: boolean
    modelValue?: Student
    disabled?: boolean
    loading?: boolean

    classId?: string
}>()
const emits = defineEmits<{
    (event: 'update:modelValue', value: Student): void
}>()

const isDisabled = computed(() => props.disabled || !props.classId || !!errorData.value)
const isButtonDisabled = computed(() => props.disabled || !props.classId)
const isLoading = computed(() => !isDisabled.value && (props.loading || loadingData.value))

const {
    data: students,
    error: errorData,
    pending: loadingData,
    refresh: refreshData
} = useFetch('/api/students/list', {
    query: { classId: computed(() => props.classId) },
    headers: useRequestHeaders() as HeadersInit,
    immediate: !!props.classId
})
</script>
