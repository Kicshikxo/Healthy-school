<template>
    <health-component
        :loading="student.loading"
        :allow-save="student.current.medical.changed"
        :on-cancel="student.refresh"
        :on-save="student.current.medical.save"
    >
        <template #title>Компонент медицинского здоровья</template>
        <template #body="{ enableEditing, loading }">
            <health-component-body :content-padding-top="false">
                <template #title> Показатели </template>
                <template #content>
                    <health-option
                        v-for="{ title, type } in singleOptions"
                        :disabled="!enableEditing || loading"
                        :loading="loading"
                        :options="
                            (medicalHealth.typedOptions[type] ?? [])
                                .filter(
                                    (option) =>
                                        option.medicalType === MedicalType.HEALTH_GROUP ||
                                        healthZones.indexOf(option.healthZone) <=
                                            healthZones.indexOf(student.current.medical.healthZone)
                                )
                                .sort((a, b) => healthZones.indexOf(a.healthZone) - healthZones.indexOf(b.healthZone))
                        "
                        :title="title"
                        option-label="title"
                        v-model="student.current.medical.options.SINGLE[type]"
                    />
                </template>
            </health-component-body>
            <health-component-body
                v-if="student.current.medical.options.SINGLE.HEALTH_GROUP?.healthZone !== HealthZone.GREEN"
                :content-padding-top="false"
            >
                <template #content>
                    <div v-for="{ title, type } in checkboxOptions" class="field-checkbox">
                        <p-checkbox
                            :disabled="!enableEditing || loading"
                            :inputId="`indicator-${type}`"
                            :binary="true"
                            :trueValue="
                                [student.current.medical.options.CHECKBOX[type], ...medicalHealth.typedOptions[type]].find(
                                    (option) => option && option.healthZone === student.current.medical.healthZone
                                )
                            "
                            v-model="student.current.medical.options.CHECKBOX[type]"
                            :class="{
                                'p-checkbox-green': student.current.medical.healthZone === HealthZone.GREEN,
                                'p-checkbox-yellow': student.current.medical.healthZone === HealthZone.YELLOW,
                                'p-checkbox-red': student.current.medical.healthZone === HealthZone.RED
                            }"
                        />
                        <label :for="`indicator-${type}`">
                            {{ title }}
                        </label>
                    </div>
                </template>
            </health-component-body>
            <health-component-body>
                <template #title> Иное </template>
                <template #content>
                    <p-textarea
                        :disabled="!enableEditing || loading"
                        :autoResize="true"
                        :rows="6"
                        v-model="student.current.medical.specialistNotes"
                        placeholder="Заполняется вручную"
                        class="w-full"
                    />
                </template>
            </health-component-body>
        </template>
    </health-component>
</template>

<script setup lang="ts">
import { HealthZone, MedicalType } from '@prisma/client'
import { useMedicalHealthStore } from '~~/store/health/medical'
import { useStudentStore } from '~~/store/student'

const student = useStudentStore()
const medicalHealth = useMedicalHealthStore()

const healthZones: HealthZone[] = [HealthZone.GREEN, HealthZone.YELLOW, HealthZone.RED]

const optionsTypes = ref<MedicalType[]>([
    MedicalType.HEALTH_GROUP,
    MedicalType.DISABILITY,
    MedicalType.MORBIDITY,
    MedicalType.BALANCED_DIET,
    MedicalType.CHRONIC_DISEASES
])

const singleOptions = computed<{ title: string; type: MedicalType }[]>(() =>
    optionsTypes.value
        .filter(
            (type) =>
                (type !== MedicalType.HEALTH_GROUP &&
                    student.current.medical.options.SINGLE.HEALTH_GROUP?.healthZone !== HealthZone.GREEN) ||
                type === MedicalType.HEALTH_GROUP
        )
        .map((type) => ({ title: medicalHealth.typeTitles[type], type }))
)

const checkboxOptions = computed<{ title: string; type: MedicalType }[]>(() =>
    medicalHealth.selectionTypes.CHECKBOX.map((type) => ({ title: medicalHealth.typeTitles[type], type }))
)
</script>
