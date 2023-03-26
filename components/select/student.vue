<template>
    <div class="field">
        <label v-if="label" :for="`select-student-${$.uid}`" :class="{ 'opacity-60': isDisabled }">
            {{ label }}
        </label>
        <div class="p-inputgroup">
            <p-dropdown
                :id="`select-student-${$.uid}`"
                :options="students"
                :loading="isLoading"
                :disabled="isDisabled"
                :modelValue="modelValue"
                @update:modelValue="$emit('update:modelValue', $event)"
                :required="true"
                :placeholder="placeholder"
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
                :disabled="!props.classId"
                :loading="isLoading"
                @click="refresh"
                :class="{ 'p-button-danger': error }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Student } from '@prisma/client'

const props = defineProps<{
    label?: string
    placeholder?: string
    modelValue?: Student
    disabled?: boolean
    loading?: boolean

    classId?: string
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: Student): void
}>()

const isDisabled = computed(() => props.disabled || !props.classId || !!error.value)
const isLoading = computed(() => !isDisabled.value && (props.loading || loadingData.value))

const {
    data: students,
    error: error,
    pending: loadingData,
    refresh: refresh
} = useFetch('/api/students/list', {
    query: { classId: computed(() => props.classId) },
    headers: useRequestHeaders() as HeadersInit,
    immediate: !!props.classId
})
</script>
