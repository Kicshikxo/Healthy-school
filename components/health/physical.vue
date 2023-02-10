<template>
    <health-component
        :loading="student.loading"
        :allow-save="hasChanges"
        :on-cancel="student.refresh"
        :on-save="student.current.physical.save"
    >
        <template #title>Компонент физической культуры</template>
        <template #body="{ enableEditing, loading }">
            <health-component-body>
                <template #title> Медицинская группа для занятий физической культурой </template>
                <template #content>
                    <div class="flex justify-content-center">
                        <p-select-button
                            :disabled="!enableEditing || loading"
                            :options="[
                                { label: 'Основная', value: HealthGroup.BASIC },
                                { label: 'Подготовительная', value: HealthGroup.PREPARATORY },
                                { label: 'Специальная', value: HealthGroup.SPECIAL }
                            ]"
                            :unselectable="false"
                            optionLabel="label"
                            optionValue="value"
                            class="select-health-group"
                            v-model="student.current.physical.healthGroup"
                        />
                    </div>
                </template>
            </health-component-body>
            <health-component-body v-if="currentOptions.length" :content-padding-top="false">
                <template #title> Показатели </template>
                <template #content>
                    <template v-for="{ title, type } in currentOptions">
                        <p-divider />
                        <div class="grid grid-nogutter">
                            <div class="col-6 flex justify-content-start align-items-center text-lg">{{ title }}</div>
                            <div class="col-6 border-left-1 surface-border pl-4">
                                <health-dropdown
                                    :disabled="!enableEditing || loading"
                                    :loading="loading"
                                    :options="
                                        physicalHealth.typedOptions[type].filter(
                                            (option) => option.healthGroup === student.current.physical.healthGroup
                                        )
                                    "
                                    :placeholder="title"
                                    option-label="title"
                                    v-model="student.current.physical.options[type]"
                                />
                            </div>
                        </div>
                    </template>
                </template>
            </health-component-body>
        </template>
    </health-component>
</template>

<script setup lang="ts">
import { PhysicalType, HealthGroup } from '@prisma/client'
import { useStudentStore } from '~~/store/student'
import { usePhysicalHealthStore } from '~~/store/health/physical'

const student = useStudentStore()
const physicalHealth = usePhysicalHealthStore()

const hasChanges = computed(
    () =>
        JSON.stringify(student.current.physical.healthGroup) !== JSON.stringify(student.physical.healthGroup) ||
        JSON.stringify(student.current.physical.options) !== JSON.stringify(student.physical.options)
)

const currentOptions = computed<{ title: string; type: PhysicalType }[]>(() =>
    (Object.keys(PhysicalType) as PhysicalType[])
        .filter(
            (type) =>
                student.current.physical.healthGroup &&
                physicalHealth.healthGroupTypes[student.current.physical.healthGroup].includes(type)
        )
        .map((type) => ({ title: physicalHealth.typeTitles[type], type }))
)
</script>
