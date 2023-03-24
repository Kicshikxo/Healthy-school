<template>
    <pdf-wrapper ref="pdf">
        <div class="flex flex-column gap-2 p-5 pt-2">
            <div class="grid">
                <div class="col flex flex-column">
                    <span class="field">
                        <label for="select-municipaly"> Муниципальное образование </label>
                        <p-dropdown
                            :loading="classLogs.municipalities.loading"
                            :options="classLogs.municipalities.list"
                            v-model="classLogs.municipalities.selected"
                            optionLabel="name"
                            placeholder="Выберите муниципальное образование"
                            id="select-municipaly"
                            class="w-full"
                        />
                    </span>

                    <span class="field">
                        <label for="select-organization" :class="{ 'opacity-60': !classLogs.municipalities.selected }">
                            Образовательная огранизация
                        </label>
                        <p-dropdown
                            :loading="classLogs.organizations.loading"
                            :disabled="!classLogs.municipalities.selected"
                            :options="classLogs.organizations.list"
                            v-model="classLogs.organizations.selected"
                            optionLabel="name"
                            placeholder="Выберите образовательную организацию"
                            id="select-organization"
                            class="w-full"
                        />
                    </span>

                    <span class="field">
                        <label for="select-class" :class="{ 'opacity-60': !classLogs.organizations.selected }">Класс</label>
                        <p-dropdown
                            :loading="classLogs.classes.loading"
                            :disabled="!classLogs.organizations.selected"
                            :options="classLogs.classes.list"
                            v-model="classLogs.classes.selected"
                            optionLabel="number"
                            placeholder="Выберите класс"
                            id="select-class"
                            class="w-full"
                        >
                            <template v-if="classLogs.organizations.selected" #value="{ value }">
                                <span v-if="value">
                                    {{ value.number }}{{ value.liter }} ( {{ value._count.students }} человек )
                                </span>
                            </template>
                            <template v-if="classLogs.organizations.selected" #option="{ option }">
                                <span v-if="option">
                                    {{ option.number }}{{ option.liter }} ( {{ option._count.students }} человек )
                                </span>
                            </template>
                        </p-dropdown>
                    </span>
                </div>
                <div class="flex flex-column w-16rem p-2">
                    <statistics-range-selector
                        v-model:startDate="classLogs.selectedStartDate"
                        v-model:endDate="classLogs.selectedEndDate"
                    />
                </div>
            </div>

            <p-card v-if="classLogs.classes.selected" class="shadow-none border-1 surface-border">
                <template #title>
                    <div class="flex justify-content-between">
                        <div>Динамика изменений показателей здоровья</div>
                        <div class="flex gap-2">
                            <p-button
                                :loading="pdf?.loading"
                                icon="pi pi-print"
                                class="p-button-rounded p-button-secondary"
                                @click="pdf?.print"
                            />
                            <p-button
                                :loading="pdf?.loading"
                                icon="pi pi-file-pdf"
                                class="p-button-rounded p-button-secondary"
                                @click="pdf?.download({ fileName: pdfFileName })"
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
            <pdf-page>
                <pdf-template-statistics-class />
            </pdf-page>
        </template>
    </pdf-wrapper>
</template>

<script setup lang="ts">
import { HealthZone, ConclusionType } from '@prisma/client'
import { useConclusionsStore } from '~~/store/health/conclusions'
import { useClassLogsStore } from '~~/store/logs/class'
import { PdfWrapper } from '#components'

const props = defineProps<{
    barColors?: { [key in HealthZone]: string }
}>()

const classLogs = useClassLogsStore()
const conclusions = useConclusionsStore()

const pdf = ref<InstanceType<typeof PdfWrapper>>()
const pdfFileName = computed(
    () =>
        `Статистика по классу ${monthName(
            (classLogs.monthlyCount.at(0)?.date ?? new Date()).getMonth() - 1
        )} ${classLogs.monthlyCount.at(0)?.date.getFullYear()} - ${monthName(
            (classLogs.monthlyCount.at(-1)?.date ?? new Date()).getMonth() - 1
        )} ${classLogs.monthlyCount.at(-1)?.date.getFullYear()}`
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
                    backgroundColor: props.barColors?.GREEN ?? '#22C55E',
                    borderRadius: 8,
                    data: classLogs.monthlyCount.map((month) => month.count[type]?.GREEN)
                },
                {
                    type: 'bar',
                    label: 'Жёлтая группа здоровья',
                    backgroundColor: props.barColors?.YELLOW ?? '#F59E0B',
                    borderRadius: 8,
                    data: classLogs.monthlyCount.map((month) => month.count[type]?.YELLOW)
                },
                {
                    type: 'bar',
                    label: 'Красная группа здоровья',
                    backgroundColor: props.barColors?.RED ?? '#EF4444',
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
            max: classLogs.classes.selected?._count.students ?? 0,
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
