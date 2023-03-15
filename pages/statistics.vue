<template>
    <p-tab-view v-model="activeTabIndex">
        <p-tab-panel header="По региону">
            <statistics-municipality-tab :bar-colors="barColors" />
        </p-tab-panel>
        <p-tab-panel header="По школе">
            <statistics-organization-tab :bar-colors="barColors" />
        </p-tab-panel>
        <p-tab-panel header="По классу">
            <statistics-class-tab :bar-colors="barColors" />
        </p-tab-panel>
    </p-tab-view>
</template>

<script setup lang="ts">
import { HealthZone } from '@prisma/client'

definePageMeta({
    title: 'Статистика'
})

const activeTabIndex = ref(0)

const barColors = ref<{ [key in HealthZone]: string }>({
    GREEN: '#22C55E',
    YELLOW: '#F59E0B',
    RED: '#EF4444'
})

onBeforeMount(() => {
    const styles = getComputedStyle(document.documentElement)

    barColors.value.GREEN = styles.getPropertyValue('--green-400') || barColors.value.GREEN
    barColors.value.YELLOW = styles.getPropertyValue('--yellow-400') || barColors.value.YELLOW
    barColors.value.RED = styles.getPropertyValue('--red-400') || barColors.value.RED
})
</script>
