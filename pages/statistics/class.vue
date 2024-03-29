<template>
    <pdf-wrapper ref="pdf">
        <div class="flex flex-column gap-2 p-5">
            <div class="grid">
                <div class="col flex flex-column">
                    <form-select-municipality
                        label="Муниципалитет"
                        placeholder="Выберите муниципалитет"
                        v-model="classLogs.selectedMunicipality"
                        :hide-error-message="true"
                    />

                    <form-select-organization
                        label="Школа"
                        placeholder="Выберите школу"
                        v-model="classLogs.selectedOrganization"
                        :municipality-id="classLogs.selectedMunicipality?.id"
                        :hide-error-message="true"
                    />

                    <form-select-class
                        label="Класс"
                        placeholder="Выберите класс"
                        v-model="classLogs.selectedClass"
                        :organization-id="classLogs.selectedOrganization?.id"
                        :hide-error-message="true"
                    />
                </div>
                <div class="flex flex-column w-16rem p-2">
                    <statistics-range-selector
                        v-model:startDate="classLogs.selectedStartDate"
                        v-model:endDate="classLogs.selectedEndDate"
                    />
                </div>
            </div>

            <p-card v-if="classLogs.selectedClass" class="shadow-none border-1 surface-border">
                <template #title>
                    <div class="flex justify-content-between">
                        <div>Динамика изменений показателей здоровья</div>
                        <div class="flex gap-2">
                            <p-button
                                :loading="pdf?.loading"
                                icon="pi pi-print"
                                class="p-button-rounded p-button-secondary"
                                @click="() => pdf?.print({ title: pdfFileName })"
                            />
                            <p-button
                                :loading="pdf?.loading"
                                icon="pi pi-file-pdf"
                                class="p-button-rounded p-button-secondary"
                                @click="() => pdf?.download({ fileName: pdfFileName })"
                            />
                        </div>
                    </div>
                </template>
                <template #content>
                    <p-tab-view v-model="activeConclusionTabIndex" :scrollable="true">
                        <p-tab-panel
                            v-for="conclusionType in (Object.keys(ConclusionType) as ConclusionType[])"
                            :header="conclusions.typeTitles[conclusionType]"
                        >
                            <p-chart :data="chartData[conclusionType]" :options="chartOptions" class="w-full h-30rem" />
                        </p-tab-panel>
                    </p-tab-view>

                    <p-divider />

                    <statistics-health-dynamics :monthly-count="classLogs.monthlyCount" />
                </template>
            </p-card>
        </div>
        <template #pages>
            <pdf-template-statistics-class />
        </template>
    </pdf-wrapper>
</template>

<script setup lang="ts">
import { PdfWrapper } from '#components'
import { ConclusionType } from '@prisma/client'
import { useConclusionsStore } from '~~/store/health/conclusions'
import { useClassLogsStore } from '~~/store/logs/class'

definePageMeta({
    title: 'Статистика по классу'
})

const classLogs = useClassLogsStore()
const conclusions = useConclusionsStore()

const pdf = ref<InstanceType<typeof PdfWrapper>>()
const pdfFileName = computed(
    () =>
        `Статистика по классу ${classLogs.selectedClass?.number} ${classLogs.selectedClass?.liter ?? ''} ${monthName(
            (classLogs.monthlyCount.at(0)?.date ?? new Date()).getMonth() - 1
        )} ${classLogs.monthlyCount.at(0)?.date.getFullYear()} - ${monthName(
            (classLogs.monthlyCount.at(-1)?.date ?? new Date()).getMonth() - 1
        )} ${classLogs.monthlyCount.at(-1)?.date.getFullYear()}.pdf`
)

const activeConclusionTabIndex = ref<number>()

const chartData = computed(() =>
    (Object.keys(ConclusionType) as ConclusionType[]).reduce((acc, type) => {
        acc[type] = {
            labels: classLogs.monthlyCount.map(
                (month) => `${monthName(month.date.getMonth() - 1)} ${month.date.getFullYear()}`
            ),
            datasets: [
                {
                    type: 'bar',
                    label: 'Зелёная группа здоровья',
                    backgroundColor: '#4cd07d',
                    borderRadius: 8,
                    data: classLogs.monthlyCount.map((month) => month.count[type]?.GREEN)
                },
                {
                    type: 'bar',
                    label: 'Жёлтая группа здоровья',
                    backgroundColor: '#eec137',
                    borderRadius: 8,
                    data: classLogs.monthlyCount.map((month) => month.count[type]?.YELLOW)
                },
                {
                    type: 'bar',
                    label: 'Красная группа здоровья',
                    backgroundColor: '#ff6259',
                    borderRadius: 8,
                    data: classLogs.monthlyCount.map((month) => month.count[type]?.RED)
                }
            ]
        }
        return acc
    }, {} as { [key in ConclusionType]: any })
)

const chartOptions = computed(() => ({
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            title: {
                display: true,
                text: 'Количество человек'
            },
            min: 0,
            max: classLogs.selectedClass?._count.students ?? 0,
            ticks: {
                stepSize: 1
            }
        },
        x: {
            title: {
                display: true,
                text: 'Месяц'
            }
        }
    }
}))
</script>
