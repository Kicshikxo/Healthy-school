<template>
    <p-tab-view v-model="activeTabIndex">
        <p-tab-panel header="По классу">
            <div class="flex flex-column gap-2 p-5 pt-2">
                <div class="grid">
                    <div class="col flex flex-column justify-content-between">
                        <span class="field">
                            <label for="select-municipaly">Муниципальное образование</label>
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
                            <label for="select-organization" :class="{ 'opacity-60': !classLogs.municipalities.selected }"
                                >Образовательная огранизация</label
                            >
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
                    <div class="flex flex-column justify-content-between w-16rem p-2">
                        <span class="field">
                            <label for="class-start-date">Начало диапазона</label>
                            <p-calendar
                                inputId="class-start-date"
                                view="month"
                                dateFormat="MM yy"
                                :minDate="
                                    new Date(
                                        classLogs.selectedEndDate.getFullYear(),
                                        classLogs.selectedEndDate.getMonth() - 12,
                                        1
                                    )
                                "
                                :maxDate="classLogs.selectedEndDate"
                                v-model="classLogs.selectedStartDate"
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
                                :minDate="classLogs.selectedStartDate"
                                :maxDate="
                                    new Date(
                                        classLogs.selectedStartDate.getFullYear(),
                                        classLogs.selectedStartDate.getMonth() + 12,
                                        1
                                    )
                                "
                                v-model="classLogs.selectedEndDate"
                                :manualInput="false"
                                class="w-full"
                                :showIcon="true"
                            />
                        </span>
                    </div>
                </div>

                <p-card v-if="classLogs.classes.selected" class="shadow-none border-1 surface-border">
                    <template #title> Динамика изменений показателей здоровья </template>
                    <template #content>
                        <p-tab-view v-model="activeConclusionTabIndex" :scrollable="true">
                            <p-tab-panel
                                v-for="conclusionType in (Object.keys(ConclusionType) as ConclusionType[])"
                                :header="conclusions.typeTitles[conclusionType]"
                            >
                                <p-chart
                                    :data="chartsData[conclusionType]"
                                    :options="chartOptions"
                                    class="w-full"
                                    style="height: 40rem"
                                />
                            </p-tab-panel>
                        </p-tab-view>
                    </template>
                </p-card>

                <p-card v-if="classLogs.classes.selected" class="shadow-none border-1 surface-border">
                    <template #title> Показатели здоровья </template>
                    <template #content>
                        <div class="grid gap-2 text-lg text-center">
                            <div class="col-3"></div>
                            <div class="col grid grid-nogutter bg-green-100 border-round-top">
                                <div class="col-6 p-1">Начало периода</div>
                                <div class="col-6 p-1">Конец периода</div>
                            </div>
                            <div class="col grid grid-nogutter bg-yellow-100 border-round-top">
                                <div class="col-6 p-1">Начало периода</div>
                                <div class="col-6 p-1">Конец периода</div>
                            </div>
                            <div class="col grid grid-nogutter bg-red-100 border-round-top">
                                <div class="col-6 p-1">Начало периода</div>
                                <div class="col-6 p-1">Конец периода</div>
                            </div>
                        </div>
                        <div
                            v-for="conclusionType in (Object.keys(ConclusionType) as ConclusionType[])"
                            class="grid gap-2 align-items-center text-center"
                        >
                            <div class="col-3 py-3 text-lg text-left">{{ conclusions.typeTitles[conclusionType] }}</div>
                            <div
                                v-for="healthZone in (Object.keys(HealthZone) as HealthZone[])"
                                class="col grid grid-nogutter py-3"
                                :class="{
                                    'bg-green-100': healthZone === HealthZone.GREEN,
                                    'bg-yellow-100': healthZone === HealthZone.YELLOW,
                                    'bg-red-100': healthZone === HealthZone.RED
                                }"
                            >
                                <div class="col-6">
                                    {{ { ...classLogs.monthlyCount.at(0)?.count[conclusionType] }[healthZone] }}
                                </div>
                                <div class="col-6 flex justify-content-between">
                                    <i class="pi pi-minus opacity-0" />
                                    <span> {{ { ...classLogs.monthlyCount.at(-1)?.count[conclusionType] }[healthZone] }}</span>
                                    <i
                                        class="pi"
                                        :class="{
                                            'pi-minus':
                                                ({ ...classLogs.monthlyCount.at(-1)?.count[conclusionType] }[healthZone] ?? 0) -
                                                    ({ ...classLogs.monthlyCount.at(0)?.count[conclusionType] }[healthZone] ??
                                                        0) ===
                                                0,
                                            'pi-chevron-up':
                                                ({ ...classLogs.monthlyCount.at(-1)?.count[conclusionType] }[healthZone] ?? 0) -
                                                    ({ ...classLogs.monthlyCount.at(0)?.count[conclusionType] }[healthZone] ??
                                                        0) >
                                                0,
                                            'pi-chevron-down':
                                                ({ ...classLogs.monthlyCount.at(-1)?.count[conclusionType] }[healthZone] ?? 0) -
                                                    ({ ...classLogs.monthlyCount.at(0)?.count[conclusionType] }[healthZone] ??
                                                        0) <
                                                0
                                        }"
                                    />
                                </div>
                            </div>
                        </div>
                    </template>
                </p-card>
            </div>
        </p-tab-panel>
    </p-tab-view>
</template>

<script setup lang="ts">
import { ConclusionType, HealthZone } from '@prisma/client'
import { useClassLogsStore } from '~~/store/logs/class'
import { useConclusionsStore } from '~~/store/health/conclusions'

definePageMeta({
    title: 'Статистика'
})

const activeTabIndex = ref(0)
const activeConclusionTabIndex = ref(0)

const classLogs = useClassLogsStore()
const conclusions = useConclusionsStore()

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

const monthNames = [
    'Декабрь',
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь'
]

const chartsData = computed(() =>
    (Object.keys(ConclusionType) as ConclusionType[]).reduce((acc, type) => {
        acc[type] = {
            labels: classLogs.monthlyCount.map((month) => `${monthNames[month.date.getMonth()]} ${month.date.getFullYear()}`),
            datasets: [
                {
                    type: 'bar',
                    label: 'Зелёная группа здоровья',
                    backgroundColor: barColors.value.GREEN,
                    borderRadius: 8,
                    data: classLogs.monthlyCount.map((month) => month.count[type]?.GREEN)
                },
                {
                    type: 'bar',
                    label: 'Жёлтая группа здоровья',
                    backgroundColor: barColors.value.YELLOW,
                    borderRadius: 8,
                    data: classLogs.monthlyCount.map((month) => month.count[type]?.YELLOW)
                },
                {
                    type: 'bar',
                    label: 'Красная группа здоровья',
                    backgroundColor: barColors.value.RED,
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
