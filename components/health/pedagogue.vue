<template>
    <p-tab-view>
        <p-tab-panel header="Педагогические показатели" :disabled="loadingData">
            <health-component :loading="loadingData" :allow-save="true" :on-cancel="cancelChanges" :on-save="saveChanges">
                <template #title> Педагогические показатели </template>
            </health-component>
        </p-tab-panel>
        <p-tab-panel header="Логопедические показатели" :disabled="loadingData">
            <health-component :loading="loadingData" :allow-save="true" :on-cancel="cancelChanges" :on-save="saveChanges">
                <template #title> Логопедические показатели </template>
            </health-component>
        </p-tab-panel>
    </p-tab-view>
</template>

<script setup lang="ts">
const props = defineProps<{
    studentData: HealthComponentData
    loadingData: boolean
    refreshData: () => Promise<void>
}>()

async function cancelChanges() {
    await props.refreshData()
}

async function saveChanges() {
    await props.refreshData()
}
</script>
