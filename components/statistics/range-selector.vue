<template>
    <span class="field">
        <label for="class-start-date">Начало диапазона</label>
        <p-calendar
            inputId="class-start-date"
            view="month"
            dateFormat="MM yy"
            :maxDate="endDate"
            :modelValue="startDate"
            @update:modelValue="$emit('update:startDate', $event)"
            :manualInput="false"
            class="w-full"
            :showIcon="true"
        />
    </span>
    <span class="field">
        <label for="class-end-date">Конец диапазона</label>
        <p-calendar
            inputId="class-end-date"
            view="month"
            dateFormat="MM yy"
            :minDate="startDate"
            :modelValue="endDate"
            @update:modelValue="$emit('update:endDate', $event)"
            :manualInput="false"
            class="w-full"
            :showIcon="true"
        />
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{ startDate: Date; endDate: Date }>()
const emits = defineEmits<{ (e: 'update:startDate', value: Date): void; (e: 'update:endDate', value: Date): void }>()
</script>
