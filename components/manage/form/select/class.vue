<template>
    <div class="field mb-1">
        <label v-if="label" :for="`form-text-${$.uid}`"> {{ label }} </label>
        <div class="p-inputgroup">
            <p-dropdown
                :id="`form-text-${$.uid}`"
                :options="classes"
                :loading="loading || loadingClasses"
                :disabled="disabled || !!errorClasses"
                :modelValue="modelValue"
                @update:modelValue="$emit('update:modelValue', $event)"
                :required="true"
                :placeholder="placeholder"
                :class="{ 'p-invalid': error }"
            >
                <template v-if="classes?.length" #value="{ value }">
                    <span v-if="value"> {{ value.number }}{{ value.liter }} ( {{ value._count.students }} человек ) </span>
                </template>
                <template v-if="classes?.length" #option="{ option }">
                    <span v-if="option"> {{ option.number }}{{ option.liter }} ( {{ option._count.students }} человек ) </span>
                </template>
            </p-dropdown>
            <p-button icon="pi pi-refresh" @click="refreshClasses" :loading="loadingClasses" />
        </div>
        <small class="p-error">{{ error || '&nbsp;' }}</small>
    </div>
</template>

<script setup lang="ts">
import { Class } from '@prisma/client'

const props = defineProps<{
    label?: string
    placeholder?: string
    error?: string
    modelValue?: Class
    disabled?: boolean
    loading?: boolean

    organizationId?: string
}>()

const emits = defineEmits<{
    (event: 'update:modelValue', value: Class): void
}>()

const {
    data: classes,
    error: errorClasses,
    pending: loadingClasses,
    refresh: refreshClasses
} = useFetch('/api/classes/list', {
    query: { organizationId: props.organizationId },
    headers: useRequestHeaders() as HeadersInit
})
</script>
