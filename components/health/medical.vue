<template>
    <health-component :loading="loadingData" :allow-save="hasChanges" :on-cancel="cancelChanges" :on-save="saveChanges">
        <template #title>Компонент медицинского здоровья</template>
        <template #body="{ enableEditing }">
            <health-component-body :padding-top="false">
                <template #title> Показатели </template>
                <template #content>
                    <template v-for="{ title, type } in singleOptions">
                        <p-divider />
                        <div class="grid grid-nogutter">
                            <div class="col-6 flex justify-content-start align-items-center text-lg">{{ title }}</div>
                            <div class="col-6 border-left-1 surface-border pl-4">
                                <health-dropdown
                                    :disabled="!enableEditing"
                                    :loading="loadingData"
                                    :options="options[type]"
                                    :placeholder="title"
                                    option-label="title"
                                    v-model="selectedOptions.SINGLE[type]"
                                />
                            </div>
                        </div>
                    </template>
                </template>
            </health-component-body>
            <health-component-body
                v-if="selectedOptions.SINGLE.HEALTH_GROUP?.healthZone !== HealthZone.GREEN"
                :padding-top="false"
            >
                <template #content>
                    <div v-for="{ title, type } in checkboxOptions" class="field-checkbox">
                        <p-checkbox
                            :disabled="!enableEditing"
                            :inputId="`indicator${type}`"
                            :value="options[type].find((option) => option.healthZone === currentHealthZone)?.id"
                            v-model="selectedOptions.CHECKBOX"
                            :class="{
                                'p-checkbox-green': currentHealthZone === HealthZone.GREEN,
                                'p-checkbox-yellow': currentHealthZone === HealthZone.YELLOW,
                                'p-checkbox-red': currentHealthZone === HealthZone.RED
                            }"
                        />
                        <label :for="`indicator${type}`">
                            {{ title }}
                        </label>
                    </div>
                </template>
            </health-component-body>
            <health-component-body v-if="selectedOptions.SINGLE.HEALTH_GROUP?.healthZone !== HealthZone.GREEN">
                <template #title> Иное </template>
                <template #content>
                    <p-textarea
                        :disabled="!enableEditing"
                        :autoResize="true"
                        :rows="6"
                        v-model="currentSpecialistNotes"
                        placeholder="Заполняется вручную медицинской сестрой"
                        class="w-full"
                    />
                </template>
            </health-component-body>
        </template>
    </health-component>
</template>

<script setup lang="ts">
import { HealthZone, MedicalHealth, MedicalHealthOption, MedicalType, SelectionType } from '@prisma/client'

const props = defineProps<{
    studentData: HealthComponentData
    loadingData: boolean
    refreshData: () => Promise<void>
}>()

async function cancelChanges() {
    await props.refreshData()
}
async function saveChanges() {
    const { error } = await useFetch('/api/students/health/medical', {
        method: 'PATCH',
        body: {
            studentId: props.studentData?.id,
            options: [
                ...Object.values(selectedOptions.value.SINGLE).flat(),
                ...Object.values(selectedOptions.value.CHECKBOX)
                    .flat()
                    .map((id) => medicalOptions.value?.find((option) => option.id === id))
            ],
            specialistNotes: currentSpecialistNotes.value
        } as MedicalHealth & { options: MedicalHealthOption[] }
    })

    if (error.value) {
        throw new Error(error.value.message)
    }

    await props.refreshData()
}

// Data from server
const { data: medicalOptions } = await useFetch('/api/students/health/medical/options')

const optionSelectionTypes = computed(() =>
    (Object.keys(SelectionType) as SelectionType[]).reduce((acc, type) => {
        acc[type] = [
            ...new Set(
                (medicalOptions.value ?? [])
                    .filter((option) => option.selectionType === type)
                    .map((option) => option.medicalType)
            )
        ]
        return acc
    }, {} as { [key in SelectionType]: MedicalType[] })
)

// Options
const options = computed(() =>
    (medicalOptions.value ?? []).reduce((acc, option) => {
        acc[option.medicalType] = (acc[option.medicalType] ?? []).concat(option)
        return acc
    }, {} as { [key in MedicalType]: MedicalHealthOption[] })
)

// Student data
const studentOptions = computed(() =>
    (Object.keys(MedicalType) as MedicalType[]).reduce(
        (acc, type) => {
            if (optionSelectionTypes.value.SINGLE.includes(type)) {
                acc.SINGLE[type] =
                    props.studentData?.medicalHealth?.options.find((option) => option.medicalType === type) ??
                    options.value[type].find((option) => option.healthZone === HealthZone.GREEN)!
            } else if (optionSelectionTypes.value.CHECKBOX.includes(type)) {
                const option = props.studentData?.medicalHealth?.options.find((option) => option.medicalType === type)
                if (option) {
                    acc.CHECKBOX = (acc.CHECKBOX ?? []).concat(option.id)
                }
            }
            return acc
        },
        { SINGLE: {}, CHECKBOX: [] as number[] } as {
            SINGLE: { [key in MedicalType]: MedicalHealthOption }
            CHECKBOX: number[]
        }
    )
)
const studentSpecialistNotes = computed(() => props.studentData?.medicalHealth?.specialistNotes ?? '')

// Selected data
const selectedOptions = ref(useCloneDeep(studentOptions.value))
const currentSpecialistNotes = ref(useCloneDeep(studentSpecialistNotes.value))

// Watch on student data update
watch(studentOptions, (value) => (selectedOptions.value = useCloneDeep(value)))
watch(studentSpecialistNotes, (value) => (currentSpecialistNotes.value = useCloneDeep(value)))

const hasChanges = computed(
    () =>
        JSON.stringify(selectedOptions.value) !== JSON.stringify(studentOptions.value) ||
        JSON.stringify(currentSpecialistNotes.value) !== JSON.stringify(studentSpecialistNotes.value)
)

const typeTitles: { [key in MedicalType]: string } = {
    HEALTH_GROUP: 'Группа здоровья',
    DISABILITY: 'Наличие инвалидности',
    MORBIDITY: 'Сведения о заболеваемости',
    BALANCED_DIET: 'Сбалансированное питание',
    CHRONIC_DISEASES: 'Наличие хронических заболеваний',

    VISION: 'Зрение',
    HEARING: 'Слух',
    ORTHOPEDIA: 'Ортопедия',
    GASTROINTESTINAL: 'ЖКТ',
    NEUROLOGY_PSYCHIATRY: 'Неврология, психиатрия'
}

const singleOptions = computed<{ title: string; type: MedicalType }[]>(() =>
    optionSelectionTypes.value.SINGLE.filter(
        (type) =>
            (type !== MedicalType.HEALTH_GROUP && selectedOptions.value.SINGLE.HEALTH_GROUP?.healthZone !== HealthZone.GREEN) ||
            type === MedicalType.HEALTH_GROUP
    ).map((type) => ({ title: typeTitles[type], type }))
)

const checkboxOptions = computed<{ title: string; type: MedicalType }[]>(() =>
    optionSelectionTypes.value.CHECKBOX.map((type) => ({ title: typeTitles[type], type }))
)

const currentHealthZone = computed<HealthZone>(() => {
    if (Object.values(selectedOptions.value.SINGLE).some((option) => option.healthZone === HealthZone.RED)) {
        return HealthZone.RED
    }
    if (Object.values(selectedOptions.value.SINGLE).some((option) => option.healthZone === HealthZone.YELLOW)) {
        return HealthZone.YELLOW
    }
    return HealthZone.GREEN
})
</script>
