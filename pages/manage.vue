<template>
    <p-tab-view v-model="activeTabIndex">
        <p-tab-panel header="Обзор"> </p-tab-panel>
        <p-tab-panel header="Добавление данных"> </p-tab-panel>
        <p-tab-panel header="Редактирование данных"> </p-tab-panel>
        <p-tab-panel header="Удаление данных"> </p-tab-panel>
    </p-tab-view>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Управление школой'
})

const activeTabIndex = ref<number>()
</script>
