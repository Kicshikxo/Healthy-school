<template>
    <div>
        <p-divider />
        <div class="grid grid-nogutter">
            <div class="col-6 flex justify-content-start align-items-center text-lg">{{ title }}</div>
            <div class="col-6 border-left-1 surface-border pl-4">
                <health-dropdown
                    :disabled="disabled"
                    :loading="loading"
                    :options="options"
                    :placeholder="title"
                    option-label="title"
                    :modelValue="modelValue"
                    @update:modelValue="$emit('update:modelValue', $event)"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(
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
