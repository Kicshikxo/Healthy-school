<template>
    <div class="flex flex-column gap-2 p-5">
        <div class="grid">
            <div class="col flex flex-column justify-content-between gap-5 p-2 pt-5">
                <span class="p-float-label">
                    <p-dropdown
                        :loading="logs.municipalities.loading"
                        :options="logs.municipalities.list"
                        v-model="logs.municipalities.selected"
                        optionLabel="name"
                        placeholder="Выберите муниципальное образование"
                        id="select-organization"
                        class="w-full"
                    />
                    <label for="select-organization">Муниципальное образование</label>
                </span>

                <span class="p-float-label">
                    <p-dropdown
                        :loading="logs.organizations.loading"
                        :disabled="!logs.municipalities.selected"
                        :options="logs.organizations.list"
                        v-model="logs.organizations.selected"
                        optionLabel="name"
                        placeholder="Выберите образовательную организацию"
                        id="select-organization"
                        class="w-full"
                    />
                    <label for="select-organization">Образовательная огранизация</label>
                </span>

                <span class="p-float-label">
                    <p-dropdown
                        :loading="logs.classes.loading"
                        :disabled="!logs.organizations.selected"
                        :options="logs.classes.list"
                        v-model="logs.classes.selected"
                        optionLabel="number"
                        placeholder="Выберите класс"
                        id="select-class"
                        class="w-full"
                    >
                        <template #value="{ value }">
                            <span v-if="value">
                                {{ value.number }}{{ value.liter }} ( {{ value._count.students }} человек )
                            </span>
                        </template>
                        <template #option="{ option }">
                            <span v-if="option">
                                {{ option.number }}{{ option.liter }} ( {{ option._count.students }} человек )
                            </span>
                        </template>
                    </p-dropdown>
                    <label for="select-class">Класс</label>
                </span>
            </div>
            <div class="w-16rem p-2">
                <p-calendar :inline="true" view="month" v-model="logs.selectedEndDate" class="w-full h-full" />
            </div>
        </div>

        <p-card class="shadow-none border-1 surface-border" :class="{ 'opacity-60': logs.loading }">
            <template #title
                ><div class="flex justify-content-between">
                    <span>График здоровья</span>
                    <p-button
                        :loading="logs.loading"
                        icon="pi pi-refresh"
                        label="Обновить"
                        class="p-button-primary"
                        @click="logs.refresh"
                    /></div
            ></template>
            <template #content>
                <p-chart type="bar" :data="chartData" :options="chartOptions" class="w-full" style="height: 40rem" />
            </template>
        </p-card>
        <p-card
            class="shadow-none border-1 surface-border p-card-content-pb-0 p-card-content-pt-0"
            :class="{ 'opacity-60': logs.loading }"
        >
            <template #title> Список учащихся </template>
            <template #content>
                <p-card v-for="student in logs.students" class="shadow-none">
                    <template #title>{{ student.secondName }} {{ student.firstName }} {{ student.middleName }}</template>
                    <template #content>
                        <div class="flex flex-wrap gap-2">
                            <p-chip v-for="conclusionType in (Object.keys(ConclusionType) as ConclusionType[])" class="p-2">
                                <health-zone-indicator
                                    :healthZone="student.healthZones[conclusionType]"
                                    :label="conclusion.typeTitles[conclusionType]"
                                />
                            </p-chip>
                        </div>
                    </template>
                </p-card>
            </template>
        </p-card>
    </div>
</template>

<script setup lang="ts">
import { ConclusionType, HealthZone } from '@prisma/client'
import { useLogsStore } from '~~/store/logs'
import { useConclusionsStore } from '~~/store/health/conclusions'

definePageMeta({
    title: 'Статистика'
})

const logs = useLogsStore()
const conclusion = useConclusionsStore()

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

const chartData = computed(() => ({
    labels: (Object.keys(ConclusionType) as ConclusionType[]).map((type) => conclusion.typeTitles[type]),
    datasets: [
        {
            label: 'Зелёная группа здоровья',
            backgroundColor: barColors.value.GREEN,
            data: (Object.keys(ConclusionType) as ConclusionType[]).map((type) => logs.studentsCount[type]?.GREEN ?? 0)
        },
        {
            label: 'Жёлтая группа здоровья',
            backgroundColor: barColors.value.YELLOW,
            data: (Object.keys(ConclusionType) as ConclusionType[]).map((type) => logs.studentsCount[type]?.YELLOW ?? 0)
        },
        {
            label: 'Красная группа здоровья',
            backgroundColor: barColors.value.RED,
            data: (Object.keys(ConclusionType) as ConclusionType[]).map((type) => logs.studentsCount[type]?.RED ?? 0)
        }
    ]
}))

const chartOptions = computed(() => ({
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            title: {
                display: true,
                text: 'Количество человек'
            },
            min: 0,
            max: logs.loading ? 0 : logs.classes.selected?._count.students ?? 0,
            ticks: {
                stepSize: 1
            }
        }
    }
}))
</script>
