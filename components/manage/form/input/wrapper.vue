<template>
    <div class="field mb-1">
        <label v-if="label" :for="inputId"> {{ label }} </label>
        <slot />
        <small class="p-error">{{ error || '&nbsp;' }}</small>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    label?: string
    inputId?: string
    error?: string
}>()
</script>
