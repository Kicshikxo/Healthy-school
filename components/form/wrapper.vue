<template>
    <div class="field" :class="{ 'mb-1': !hideErrorMessage }">
        <label v-if="label" :for="inputId"> {{ label }} </label>
        <slot />
        <small v-if="!hideErrorMessage" class="p-error">{{ errorMessage || '&nbsp;' }}</small>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    label?: string
    inputId?: string
    errorMessage?: string
    hideErrorMessage?: boolean
}>()
</script>
