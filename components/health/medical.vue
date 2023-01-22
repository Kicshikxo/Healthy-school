<template>
    <health-component :loading="loadingData" :allow-save="hasChanges" :on-cancel="cancelChanges" :on-save="saveChanges">
        <template #title>Компонент медицинского здоровья</template>
        <template #body="{ enableEditing }">
            <health-component-body :padding-top="false">
                <template #title> Основные показатели </template>
                <template #content>
                    <template v-for="{ title, type } in singleOptions">
                        <p-divider />
                        <div class="grid grid-nogutter">
                            <div class="col-6 flex justify-content-start align-items-center text-lg">{{ title }}</div>
                            <div class="col-6 border-left-1 border-300 pl-4">
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
            <health-component-body v-if="showIndividualOptions" :padding-top="false">
                <template #title>Индивидуальные рекомендации и назначения профильных медицинских специалистов</template>
                <template #content>
                    <template v-for="{ title, type } in multipleOptions">
                        <p-divider />
                        <div class="grid grid-nogutter">
                            <div class="col-6 flex justify-content-start align-items-center text-lg">{{ title }}</div>
                            <div class="col-6 border-left-1 border-300 pl-4">
                                <health-multi-select
                                    :disabled="!enableEditing"
                                    :loading="loadingData"
                                    :options="options[type]"
                                    :placeholder="title"
                                    optionLabel="title"
                                    v-model="selectedOptions.MULTIPLE[type]"
                                />
                            </div>
                        </div>
                    </template>
                </template>
            </health-component-body>
            <health-component-body v-if="showIndividualOptions">
                <template #title> Профилактические и здоровьесберегающие мероприятия </template>
                <template #content>
                    <health-multi-select
                        :disabled="!enableEditing"
                        :loading="loadingData"
                        :options="availableRecommendations"
                        placeholder="Профилактические и здоровьесберегающие мероприятия"
                        optionLabel="title"
                        v-model="selectedRecommendations"
                    />
                </template>
            </health-component-body>
            <health-component-body v-if="showIndividualOptions">
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
import { HealthZone, MedicalHealth, MedicalHealthOption, MedicalHealthRecommendation, MedicalType } from '@prisma/client'

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
            options: [...Object.values(selectedOptions.value.SINGLE), ...Object.values(selectedOptions.value.MULTIPLE).flat()],
            recommendations: selectedRecommendations.value.filter(
                (recommendation) => recommendation.healthZone === currentHealthZone.value
            ),
            specialistNotes: currentSpecialistNotes.value
        } as MedicalHealth & { options: MedicalHealthOption[]; recommendations: MedicalHealthRecommendation[] }
    })

    if (error.value) {
        throw new Error(error.value.message)
    }

    await props.refreshData()
}

// Data from server
const { data: medicalOptions } = await useFetch('/api/students/health/medical/options')
const { data: medicalRecommendations } = await useFetch('/api/students/health/medical/recommendations')

enum SelectionType {
    SINGLE = 'SINGLE',
    MULTIPLE = 'MULTIPLE'
}
const optionSelectionTypes: { [key in SelectionType]: MedicalType[] } = {
    SINGLE: ['DISABILITY', 'MORBIDITY', 'BALANCED_DIET', 'CHRONIC_DISEASES'],
    MULTIPLE: ['VISION', 'HEARING', 'ORTHOPEDIA', 'GASTROINTESTINAL', 'NEUROLOGY_PSYCHIATRY']
}

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
            if (optionSelectionTypes.SINGLE.includes(type)) {
                acc.SINGLE[type] =
                    props.studentData?.medicalHealth?.options.find((option) => option.medicalType === type) ??
                    options.value[type].find((option) => option.healthZone === 'GREEN')!
            } else if (optionSelectionTypes.MULTIPLE.includes(type)) {
                acc.MULTIPLE[type] =
                    props.studentData?.medicalHealth?.options.filter((option) => option.medicalType === type) ?? []
            }
            return acc
        },
        { SINGLE: {}, MULTIPLE: {} } as {
            SINGLE: { [key in MedicalType]: MedicalHealthOption }
            MULTIPLE: { [key in MedicalType]: MedicalHealthOption[] }
        }
    )
)
const studentRecommendations = computed(() => props.studentData?.medicalHealth?.recommendations ?? [])
const studentSpecialistNotes = computed(() => props.studentData?.medicalHealth?.specialistNotes ?? '')

// Selected data
const selectedOptions = ref(useCloneDeep(studentOptions.value))
const selectedRecommendations = ref(studentRecommendations.value)
const currentSpecialistNotes = ref(studentSpecialistNotes.value)

// Watch on student data update
watch(studentOptions, (value) => (selectedOptions.value = useCloneDeep(value)))
watch(studentRecommendations, (value) => (selectedRecommendations.value = value))
watch(studentSpecialistNotes, (value) => (currentSpecialistNotes.value = value))

const hasChanges = computed(
    () =>
        JSON.stringify(selectedOptions.value) !== JSON.stringify(studentOptions.value) ||
        JSON.stringify(selectedRecommendations.value) !== JSON.stringify(studentRecommendations.value) ||
        JSON.stringify(currentSpecialistNotes.value) !== JSON.stringify(studentSpecialistNotes.value)
)

const typeTitles: { [key in MedicalType]: string } = {
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
    optionSelectionTypes.SINGLE.map((type) => ({ title: typeTitles[type], type }))
)

const multipleOptions = computed<{ title: string; type: MedicalType }[]>(() =>
    optionSelectionTypes.MULTIPLE.map((type) => ({ title: typeTitles[type], type }))
)

const currentHealthZone = computed<HealthZone>(() => {
    if (Object.values(selectedOptions.value.SINGLE).some((option) => option.healthZone === 'RED')) {
        return 'RED'
    }
    if (Object.values(selectedOptions.value.SINGLE).some((option) => option.healthZone === 'YELLOW')) {
        if (
            Object.values(selectedOptions.value.MULTIPLE)
                .flat()
                .some((option) => option.healthZone === 'RED')
        ) {
            return 'RED'
        }
        return 'YELLOW'
    }
    return 'GREEN'
})

const availableRecommendations = computed(() =>
    medicalRecommendations.value?.filter((recommendation) => recommendation.healthZone === currentHealthZone.value)
)

const showIndividualOptions = computed(() => (['YELLOW', 'RED'] as HealthZone[]).includes(currentHealthZone.value))
</script>
