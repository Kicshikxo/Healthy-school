<template>
    <div class="flex flex-column gap-5">
        <div class="text-6xl font-bold">
            Проведение оценки сбора сведений о состоянии медицинских, физических и социально-психологических показателей
            здоровья
        </div>
        <div class="text-4xl">Регион: <span class="font-bold">Курская область</span></div>
        <div class="flex flex-column gap-2 text-4xl">
            <div>
                Район: <span class="font-bold">{{ municipalityLogs.selectedMunicipality?.name }}</span>
            </div>
            <div>
                Количество обучающихся:
                <span class="font-bold">
                    {{
                        municipalityLogs.selectedMunicipality?.organizations.reduce(
                            (acc, organization) =>
                                (acc += organization.classes.reduce(
                                    (acc, currentClass) => (acc += currentClass._count.students),
                                    0
                                )),
                            0
                        ) ?? 0
                    }}
                    человек
                </span>
            </div>
        </div>
        <div class="flex flex-column gap-4 text-4xl">
            <div class="text-center font-bold">Динамика изменений показателей здоровья</div>
            <statistics-health-dynamics :monthly-count="municipalityLogs.monthlyCount" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMunicipalityLogsStore } from '~~/store/logs/municipality'

const municipalityLogs = useMunicipalityLogsStore()
</script>
