<template>
    <p-tab-view v-model="activeTabIndex">
        <p-tab-panel header="Индивидуальный здоровьесберегающий маршрут">
            <health-route />
        </p-tab-panel>
        <p-tab-panel header="Педагогический компонент">
            <health-pedagogue />
        </p-tab-panel>
    </p-tab-view>
</template>

<script setup lang="ts">
const activeTabIndex = ref<number>()
</script>
