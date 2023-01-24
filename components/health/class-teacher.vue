<template>
    <p-tab-view v-model="activeTabIndex">
        <p-tab-panel header="Мероприятия индивидуального здоровьесберегающего маршрута">
            <health-route :student-data="studentData" :loading-data="loadingData" :refresh-data="refreshData" />
        </p-tab-panel>
        <p-tab-panel header="Педагогический компонент">
            <health-pedagogue :student-data="studentData" :loading-data="loadingData" :refresh-data="refreshData" />
        </p-tab-panel>
    </p-tab-view>
</template>

<script setup lang="ts">
const props = defineProps<{
    studentData: HealthComponentData
    loadingData: boolean
    refreshData: () => Promise<void>
}>()

const activeTabIndex = ref(0)
</script>
