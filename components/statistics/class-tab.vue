<template>
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
            <div class="flex flex-column w-16rem p-2">
                <span class="field">
                    <label for="class-start-date">Начало диапазона</label>
                    <p-calendar
                        inputId="class-start-date"
                        view="month"
                        dateFormat="MM yy"
                        :minDate="
                            new Date(classLogs.selectedEndDate.getFullYear(), classLogs.selectedEndDate.getMonth() - 12, 1)
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
                            new Date(classLogs.selectedStartDate.getFullYear(), classLogs.selectedStartDate.getMonth() + 12, 1)
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
                            :data="chartData[conclusionType]"
                            :options="chartOptions"
                            class="w-full"
                            style="height: 40rem"
                        />
                    </p-tab-panel>
                </p-tab-view>

                <p-divider />

                <div class="health-dynamics-grid text-center text-lg">
                    <i />
                    <template v-for="healthZone in (Object.keys(HealthZone) as HealthZone[])">
                        <div
                            class="flex align-items-center border-round-top ml-6"
                            :class="{
                                'bg-green-200': healthZone === HealthZone.GREEN,
                                'bg-yellow-200': healthZone === HealthZone.YELLOW,
                                'bg-red-200': healthZone === HealthZone.RED
                            }"
                        >
                            <div class="col-6 p-1">Начало периода</div>
                            <div class="col-6 p-1">Конец периода</div>
                        </div>
                        <i />
                    </template>

                    <template v-for="conclusionType in (Object.keys(ConclusionType) as ConclusionType[])">
                        <div class="text-left font-bold py-3 white-space-nowrap overflow-hidden text-overflow-ellipsis">
                            {{ conclusions.typeTitles[conclusionType] }}
                        </div>
                        <template v-for="healthZone in (Object.keys(HealthZone) as HealthZone[])">
                            <div
                                class="flex justify-content-center align-items-center border-top-2 ml-6"
                                :class="{
                                    'bg-green-100 border-green-200': healthZone === HealthZone.GREEN,
                                    'bg-yellow-100 border-yellow-200': healthZone === HealthZone.YELLOW,
                                    'bg-red-100 border-red-200': healthZone === HealthZone.RED,
                                    'border-round-bottom': conclusionType === (Object.keys(ConclusionType) as ConclusionType[]).at(-1)
                                }"
                            >
                                <div class="col-6 text-xl font-bold">
                                    {{ classLogs.monthlyCount.at(0)?.count[conclusionType]?.[healthZone] }}
                                </div>
                                <div class="col-6 text-xl font-bold">
                                    {{ classLogs.monthlyCount.at(-1)?.count[conclusionType]?.[healthZone] }}
                                </div>
                            </div>
                            <div
                                class="flex justify-content-center align-items-center border-round-right mb-1"
                                :class="{
                                    'bg-green-200': healthZone === HealthZone.GREEN,
                                    'bg-yellow-200': healthZone === HealthZone.YELLOW,
                                    'bg-red-200': healthZone === HealthZone.RED
                                }"
                            >
                                <i
                                    v-for="difference in [
                                        (classLogs.monthlyCount.at(-1)?.count[conclusionType]?.[healthZone] ?? 0) -
                                            (classLogs.monthlyCount.at(0)?.count[conclusionType]?.[healthZone] ?? 0)
                                    ]"
                                    class="pi"
                                    :class="{
                                        'pi-minus': difference === 0,
                                        'pi-chevron-up': difference > 0,
                                        'pi-chevron-down': difference < 0
                                    }"
                                />
                            </div>
                        </template>
                    </template>
                </div>
            </template>
        </p-card>
    </div>
</template>

<script setup lang="ts">
import { HealthZone, ConclusionType } from '@prisma/client'
import { useConclusionsStore } from '~~/store/health/conclusions'
import { useClassLogsStore } from '~~/store/logs/class'

const props = defineProps<{
    colors?: { [key in HealthZone]: string }
}>()

const classLogs = useClassLogsStore()
const conclusions = useConclusionsStore()

const activeConclusionTabIndex = ref(0)

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

const chartData = computed(() =>
    (Object.keys(ConclusionType) as ConclusionType[]).reduce((acc, type) => {
        acc[type] = {
            labels: classLogs.monthlyCount.map((month) => `${monthNames[month.date.getMonth()]} ${month.date.getFullYear()}`),
            datasets: [
                {
                    type: 'bar',
                    label: 'Зелёная группа здоровья',
                    backgroundColor: props.colors?.GREEN ?? '#22C55E',
                    borderRadius: 8,
                    data: classLogs.monthlyCount.map((month) => month.count[type]?.GREEN)
                },
                {
                    type: 'bar',
                    label: 'Жёлтая группа здоровья',
                    backgroundColor: props.colors?.YELLOW ?? '#F59E0B',
                    borderRadius: 8,
                    data: classLogs.monthlyCount.map((month) => month.count[type]?.YELLOW)
                },
                {
                    type: 'bar',
                    label: 'Красная группа здоровья',
                    backgroundColor: props.colors?.RED ?? '#EF4444',
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

<style>
.health-dynamics-grid {
    display: grid;
    grid-template-columns: auto repeat(3, 1fr 24px);
    grid-template-rows: repeat(7, 1fr);
}
</style>
