<template>
    <div class="field">
        <label v-if="label" :for="`select-class-${$.uid}`" :class="{ 'opacity-60': isDisabled }">
            {{ label }}
        </label>
        <div class="p-inputgroup">
            <p-dropdown
                :id="`select-class-${$.uid}`"
                :options="classes"
                :loading="isLoading"
                :disabled="isDisabled"
                :modelValue="modelValue"
                @update:modelValue="$emit('update:modelValue', $event)"
                :required="true"
                :placeholder="placeholder"
            >
                <template v-if="classes?.length" #value="{ value }">
                    <span v-if="value"> {{ value.number }}{{ value.liter }} ( {{ value._count.students }} человек ) </span>
                </template>
                <template v-if="classes?.length" #option="{ option }">
                    <span v-if="option"> {{ option.number }}{{ option.liter }} ( {{ option._count.students }} человек ) </span>
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
    </div>
</template>

<script setup lang="ts">
import { Class } from '@prisma/client'

const props = defineProps<{
    label?: string
    placeholder?: string
    modelValue?: Class
    disabled?: boolean
    loading?: boolean

    organizationId?: string
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: Class): void
}>()

const isDisabled = computed(() => props.disabled || !props.organizationId || !!error.value)
const isLoading = computed(() => !isDisabled.value && (props.loading || loadingData.value))

const {
    data: classes,
    error: error,
    pending: loadingData,
    refresh: refreshData
} = useFetch('/api/classes/list', {
    query: { organizationId: computed(() => props.organizationId) },
    headers: useRequestHeaders() as HeadersInit,
    immediate: !!props.organizationId
})
</script>
