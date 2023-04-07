<template>
    <div class="field" :class="{ 'mb-1': !hideErrorMessage }">
        <label v-if="label" :for="inputId" :class="{ 'opacity-60': disabled }"> {{ label }} </label>
        <slot />
        <small v-if="!hideErrorMessage" class="p-error">{{ errorMessage || '&nbsp;' }}</small>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    label?: string
    inputId?: string
    disabled?: boolean
    errorMessage?: string
    hideErrorMessage?: boolean
}>()
</script>
