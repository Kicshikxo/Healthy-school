<template>
    <p-multi-select
        :disabled="disabled"
        :loading="loading"
        :options="options"
        :placeholder="title"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        display="chip"
        class="w-full"
        appendTo="self"
        panelClass="border-1 surface-border"
    >
        <template #chip="{ value }">
            <health-zone-indicator
                v-if="value"
                :health-zone="indicator ? value.healthZone : undefined"
                :label="optionLabel ? value[optionLabel] : value"
            />
        </template>
        <template #option="{ option }">
            <health-zone-indicator
                v-if="option"
                :health-zone="indicator ? option.healthZone : undefined"
                :label="optionLabel ? option[optionLabel] : option"
            />
        </template>
    </p-multi-select>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        disabled?: boolean
        loading?: boolean
        indicator?: boolean
        options?: any[]
        optionLabel?: string
        modelValue?: any
        title?: string
    }>(),
    {
        indicator: true
    }
)
</script>
