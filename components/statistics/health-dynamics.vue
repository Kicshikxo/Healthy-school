<template>
    <div class="health-dynamics-grid text-center text-lg">
        <i />
        <template v-for="healthZone in (Object.keys(HealthZone) as HealthZone[])">
            <div
                class="flex justify-content-center border-round-top align-items-center text-xl font-bold ml-2"
                :class="{
                    'bg-green-200': healthZone === HealthZone.GREEN,
                    'bg-yellow-200': healthZone === HealthZone.YELLOW,
                    'bg-red-200': healthZone === HealthZone.RED
                }"
            >
                <span v-if="healthZone === HealthZone.GREEN">Зелёная группа здоровья</span>
                <span v-if="healthZone === HealthZone.YELLOW">Жёлтая группа здоровья</span>
                <span v-if="healthZone === HealthZone.RED">Красная группа здоровья</span>
            </div>
            <i />
        </template>
        <div class="flex align-items-center font-bold text-lg white-space-nowrap overflow-hidden text-overflow-ellipsis">
            Компонент здоровья
        </div>
        <template v-for="healthZone in (Object.keys(HealthZone) as HealthZone[])">
            <div
                class="flex align-items-center ml-2"
                :class="{
                    'bg-green-200': healthZone === HealthZone.GREEN,
                    'bg-yellow-200': healthZone === HealthZone.YELLOW,
                    'bg-red-200': healthZone === HealthZone.RED
                }"
            >
                <div class="col-6 flex flex-column gap-1 p-1">
                    <div class="text-sm font-bold">Начало периода</div>
                    <div>
                        {{ monthName((monthlyCount.at(0)?.date ?? new Date()).getMonth() - 1) }}
                        {{ monthlyCount.at(0)?.date.getFullYear() }}
                    </div>
                </div>
                <div class="col-6 flex flex-column gap-1 p-1">
                    <div class="text-sm font-bold">Конец периода</div>
                    <div>
                        {{ monthName((monthlyCount.at(-1)?.date ?? new Date()).getMonth() - 1) }}
                        {{ monthlyCount.at(-1)?.date.getFullYear() }}
                    </div>
                </div>
            </div>
            <i />
        </template>

        <template v-for="conclusionType in (Object.keys(ConclusionType) as ConclusionType[])">
            <div class="text-right font-bold py-3 white-space-nowrap overflow-hidden text-overflow-ellipsis">
                {{ conclusions.typeTitles[conclusionType].split(' ').at(0) }}
            </div>
            <template v-for="healthZone in (Object.keys(HealthZone) as HealthZone[])">
                <div
                    class="flex justify-content-center align-items-center border-top-2 ml-2"
                    style="min-width: 280px"
                    :class="{
                        'bg-green-100 border-green-200': healthZone === HealthZone.GREEN,
                        'bg-yellow-100 border-yellow-200': healthZone === HealthZone.YELLOW,
                        'bg-red-100 border-red-200': healthZone === HealthZone.RED,
                        'border-round-bottom': conclusionType === (Object.keys(ConclusionType) as ConclusionType[]).at(-1)
                    }"
                >
                    <div class="col-6 text-xl font-bold">
                        {{ monthlyCount.at(0)?.count[conclusionType]?.[healthZone] }}
                    </div>
                    <div class="col-6 text-xl font-bold">
                        {{ monthlyCount.at(-1)?.count[conclusionType]?.[healthZone] }}
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
                            (monthlyCount.at(-1)?.count[conclusionType]?.[healthZone] ?? 0) -
                                (monthlyCount.at(0)?.count[conclusionType]?.[healthZone] ?? 0)
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

<script setup lang="ts">
import { ConclusionType, HealthZone } from '@prisma/client'
import { useConclusionsStore } from '~~/store/health/conclusions'

const props = defineProps<{
    monthlyCount: {
        date: Date
        count: { [key in ConclusionType]?: { [key in HealthZone]: number } }
    }[]
}>()

const conclusions = useConclusionsStore()
</script>

<style>
.health-dynamics-grid {
    display: grid;
    grid-template-columns: auto repeat(3, 1fr 24px);
    grid-template-rows: repeat(7, 1fr);
}
</style>
