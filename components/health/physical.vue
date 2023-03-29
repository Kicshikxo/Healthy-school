<template>
    <health-component
        :loading="student.loading"
        :allow-save="student.current.physical.changed"
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
                    <health-option
                        v-for="{ title, type } in currentOptions"
                        :disabled="!enableEditing || loading"
                        :loading="loading"
                        :options="
                            physicalHealth.typedOptions[type].filter(
                                (option) => option.healthGroup === student.current.physical.healthGroup
                            )
                        "
                        :title="title"
                        option-label="title"
                        v-model="student.current.physical.options[type]"
                    />
                </template>
            </health-component-body>
        </template>
    </health-component>
</template>

<script setup lang="ts">
import { HealthGroup, PhysicalType } from '@prisma/client'
import { usePhysicalHealthStore } from '~~/store/health/physical'
import { useStudentStore } from '~~/store/student'

const student = useStudentStore()
const physicalHealth = usePhysicalHealthStore()

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
