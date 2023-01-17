<template>
    <health-component :loading="loadingData" :allow-save="hasChanges" :on-cancel="cancelChanges" :on-save="saveChanges">
        <template #title>Компонент медицинского здоровья</template>
        <template #body="{ enableEditing }">
            <health-component-body :padding-top="false">
                <template #title> Основные показатели </template>
                <template #content>
                    <template v-for="{ title, options, selected } in generalOptions">
                        <p-divider />
                        <div class="grid grid-nogutter">
                            <div class="col-6 flex justify-content-start align-items-center text-lg">{{ title }}</div>
                            <div class="col-6 border-left-1 border-300 pl-4">
                                <p-dropdown
                                    :disabled="!enableEditing"
                                    :options="options.value"
                                    optionLabel="title"
                                    v-model="selected.value"
                                    :placeholder="title"
                                    class="w-full"
                                    panelClass="border-1 border-300"
                                >
                                    <template #value="{ value }">
                                        <health-zone-indicator :health-zone="value.healthZone" :label="value.title" />
                                    </template>
                                    <template #option="{ option }">
                                        <health-zone-indicator
                                            :health-zone="option.healthZone"
                                            :label="option.title"
                                            :gap="3"
                                        />
                                    </template>
                                </p-dropdown>
                            </div>
                        </div>
                    </template>
                </template>
            </health-component-body>
            <health-component-body v-if="showIndividualOptions" :padding-top="false">
                <template #title>Индивидуальные рекомендации и назначения профильных медицинских специалистов</template>
                <template #content>
                    <template v-for="{ title, options, selected } in individualOptions">
                        <p-divider />
                        <div class="grid grid-nogutter">
                            <div class="col-6 flex justify-content-start align-items-center text-lg">{{ title }}</div>
                            <div class="col-6 border-left-1 border-300 pl-4">
                                <p-multi-select
                                    :disabled="!enableEditing"
                                    :options="options.value"
                                    optionLabel="value"
                                    v-model="selected.value"
                                    display="chip"
                                    appendTo="self"
                                    :placeholder="title"
                                    class="w-full"
                                    panelClass="border-1 border-300"
                                >
                                    <template #chip="{ value }">
                                        <health-zone-indicator :health-zone="value.healthZone" :label="value.title" />
                                    </template>
                                    <template #option="{ option }">
                                        <health-zone-indicator :health-zone="option.healthZone" :label="option.title" />
                                    </template>
                                </p-multi-select>
                            </div>
                        </div>
                    </template>
                </template>
            </health-component-body>
            <health-component-body v-if="showIndividualOptions">
                <template #title> Профилактические и здоровьесберегающие мероприятия </template>
                <template #content>
                    <p-multi-select
                        :disabled="!enableEditing"
                        v-model="selectedRecommendations"
                        :options="availableRecommendations"
                        optionLabel="title"
                        panelClass="border-1 border-300"
                        display="chip"
                        appendTo="self"
                        placeholder="Профилактические и здоровьесберегающие мероприятия"
                        class="w-full"
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
import { Ref, ComputedRef } from 'vue'

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
                selectedDisability.value,
                selectedMorbidity.value,
                selectedBalancedDiet.value,
                selectedChronicDiseases.value,
                ...selectedVision.value,
                ...selectedHearing.value,
                ...selectedOrthopedia.value,
                ...selectedGastrointestinal.value,
                ...selectedNeurologyAndPsychiatry.value
            ],
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
const { data: medicalRecommendations } = useFetch('/api/students/health/medical/recommendations')

// Options
const disabilityOptions = computed<MedicalHealthOption[]>(
    () => medicalOptions.value?.filter((option) => option.medicalType === MedicalType.DISABILITY) ?? []
)
const morbidityOptions = computed<MedicalHealthOption[]>(
    () => medicalOptions.value?.filter((option) => option.medicalType === MedicalType.MORBIDITY) ?? []
)
const balancedDietOptions = computed<MedicalHealthOption[]>(
    () => medicalOptions.value?.filter((option) => option.medicalType === MedicalType.BALANCED_DIET) ?? []
)
const chronicDiseasesOptions = computed<MedicalHealthOption[]>(
    () => medicalOptions.value?.filter((option) => option.medicalType === MedicalType.CHRONIC_DISEASES) ?? []
)
//
const visionOptions = computed<MedicalHealthOption[]>(
    () => medicalOptions.value?.filter((option) => option.medicalType === MedicalType.VISION) ?? []
)
const hearingOptions = computed<MedicalHealthOption[]>(
    () => medicalOptions.value?.filter((option) => option.medicalType === MedicalType.HEARING) ?? []
)
const orthopediaOptions = computed<MedicalHealthOption[]>(
    () => medicalOptions.value?.filter((option) => option.medicalType === MedicalType.ORTHOPEDIA) ?? []
)
const gastrointestinalOptions = computed<MedicalHealthOption[]>(
    () => medicalOptions.value?.filter((option) => option.medicalType === MedicalType.GASTROINTESTINAL) ?? []
)
const neurologyAndPsychiatryOptions = computed<MedicalHealthOption[]>(
    () => medicalOptions.value?.filter((option) => option.medicalType === MedicalType.NEUROLOGY_PSYCHIATRY) ?? []
)

// Student data
const studentOptions = computed<MedicalHealthOption[]>(() => props.studentData?.medicalHealth?.options ?? [])
const studentDisability = computed<MedicalHealthOption>(
    () =>
        studentOptions.value?.find((option) => option.medicalType === MedicalType.DISABILITY) ??
        disabilityOptions.value?.find((option) => option.healthZone === 'GREEN')!
)
const studentMorbidity = computed<MedicalHealthOption>(
    () =>
        studentOptions.value?.find((option) => option.medicalType === MedicalType.MORBIDITY) ??
        morbidityOptions.value?.find((option) => option.healthZone === 'GREEN')!
)
const studentBalancedDiet = computed<MedicalHealthOption>(
    () =>
        studentOptions.value?.find((option) => option.medicalType === MedicalType.BALANCED_DIET) ??
        balancedDietOptions.value?.find((option) => option.healthZone === 'GREEN')!
)
const studentChronicDiseases = computed<MedicalHealthOption>(
    () =>
        studentOptions.value?.find((option) => option.medicalType === MedicalType.CHRONIC_DISEASES) ??
        chronicDiseasesOptions.value?.find((option) => option.healthZone === 'GREEN')!
)
//
const studentVision = computed<MedicalHealthOption[]>(() =>
    studentOptions.value.filter((option) => option.medicalType === MedicalType.VISION)
)
const studentHearing = computed<MedicalHealthOption[]>(() =>
    studentOptions.value.filter((option) => option.medicalType === MedicalType.HEARING)
)
const studentOrthopedia = computed<MedicalHealthOption[]>(() =>
    studentOptions.value.filter((option) => option.medicalType === MedicalType.ORTHOPEDIA)
)
const studentGastrointestinal = computed<MedicalHealthOption[]>(() =>
    studentOptions.value.filter((option) => option.medicalType === MedicalType.GASTROINTESTINAL)
)
const studentNeurologyAndPsychiatry = computed<MedicalHealthOption[]>(() =>
    studentOptions.value.filter((option) => option.medicalType === MedicalType.NEUROLOGY_PSYCHIATRY)
)
//
const studentRecommendations = computed<MedicalHealthRecommendation[]>(
    () => props.studentData?.medicalHealth?.recommendations ?? []
)
//
const studentSpecialistNotes = computed<string>(() => props.studentData?.medicalHealth?.specialistNotes ?? '')

// Selected data
const selectedDisability = ref<MedicalHealthOption>(studentDisability.value)
const selectedMorbidity = ref<MedicalHealthOption>(studentMorbidity.value)
const selectedBalancedDiet = ref<MedicalHealthOption>(studentBalancedDiet.value)
const selectedChronicDiseases = ref<MedicalHealthOption>(studentChronicDiseases.value)
//
const selectedVision = ref<MedicalHealthOption[]>(studentVision.value)
const selectedHearing = ref<MedicalHealthOption[]>(studentHearing.value)
const selectedOrthopedia = ref<MedicalHealthOption[]>(studentOrthopedia.value)
const selectedGastrointestinal = ref<MedicalHealthOption[]>(studentGastrointestinal.value)
const selectedNeurologyAndPsychiatry = ref<MedicalHealthOption[]>(studentNeurologyAndPsychiatry.value)
//
const selectedRecommendations = ref<MedicalHealthRecommendation[]>(studentRecommendations.value)
//
const currentSpecialistNotes = ref<string>(studentSpecialistNotes.value)

// Watch on student data update
watch(studentDisability, (value) => (selectedDisability.value = value))
watch(studentMorbidity, (value) => (selectedMorbidity.value = value))
watch(studentBalancedDiet, (value) => (selectedBalancedDiet.value = value))
watch(studentChronicDiseases, (value) => (selectedChronicDiseases.value = value))
//
watch(studentVision, (value) => (selectedVision.value = value))
watch(studentHearing, (value) => (selectedHearing.value = value))
watch(studentOrthopedia, (value) => (selectedOrthopedia.value = value))
watch(studentGastrointestinal, (value) => (selectedGastrointestinal.value = value))
watch(studentNeurologyAndPsychiatry, (value) => (selectedNeurologyAndPsychiatry.value = value))
//
watch(studentRecommendations, (value) => (selectedRecommendations.value = value))
//
watch(studentSpecialistNotes, (value) => (currentSpecialistNotes.value = value))

// Sorted student data
const sortedStudentVision = computed(() => studentVision.value.sort((a, b) => a.id - b.id))
const sortedStudentHearing = computed(() => studentHearing.value.sort((a, b) => a.id - b.id))
const sortedStudentOrthopedia = computed(() => studentOrthopedia.value.sort((a, b) => a.id - b.id))
const sortedStudentGastrointestinal = computed(() => studentGastrointestinal.value.sort((a, b) => a.id - b.id))
const sortedStudentNeurologyAndPsychiatry = computed(() => studentNeurologyAndPsychiatry.value.sort((a, b) => a.id - b.id))
const sortedStudentRecommendations = computed(() => studentRecommendations.value.sort((a, b) => a.id - b.id))

// Sorted selected data
const sortedSelectedVision = computed(() => selectedVision.value.sort((a, b) => a.id - b.id))
const sortedSelectedHearing = computed(() => selectedHearing.value.sort((a, b) => a.id - b.id))
const sortedSelectedOrthopedia = computed(() => selectedOrthopedia.value.sort((a, b) => a.id - b.id))
const sortedSelectedGastrointestinal = computed(() => selectedGastrointestinal.value.sort((a, b) => a.id - b.id))
const sortedSelectedNeurologyAndPsychiatry = computed(() => selectedNeurologyAndPsychiatry.value.sort((a, b) => a.id - b.id))
const sortedSelectedRecommendations = computed(() => selectedRecommendations.value.sort((a, b) => a.id - b.id))

const hasChanges = computed(
    () =>
        JSON.stringify(selectedDisability.value) !== JSON.stringify(studentDisability.value) ||
        JSON.stringify(selectedMorbidity.value) !== JSON.stringify(studentMorbidity.value) ||
        JSON.stringify(selectedBalancedDiet.value) !== JSON.stringify(studentBalancedDiet.value) ||
        JSON.stringify(selectedChronicDiseases.value) !== JSON.stringify(studentChronicDiseases.value) ||
        JSON.stringify(sortedSelectedVision.value) !== JSON.stringify(sortedStudentVision.value) ||
        JSON.stringify(sortedSelectedHearing.value) !== JSON.stringify(sortedStudentHearing.value) ||
        JSON.stringify(sortedSelectedOrthopedia.value) !== JSON.stringify(sortedStudentOrthopedia.value) ||
        JSON.stringify(sortedSelectedGastrointestinal.value) !== JSON.stringify(sortedStudentGastrointestinal.value) ||
        JSON.stringify(sortedSelectedNeurologyAndPsychiatry.value) !==
            JSON.stringify(sortedStudentNeurologyAndPsychiatry.value) ||
        JSON.stringify(sortedSelectedRecommendations.value) !== JSON.stringify(sortedStudentRecommendations.value) ||
        JSON.stringify(currentSpecialistNotes.value) !== JSON.stringify(studentSpecialistNotes.value)
)

const generalOptions = computed<
    { title: string; options: ComputedRef<MedicalHealthOption[]>; selected: Ref<MedicalHealthOption> }[]
>(() => [
    {
        title: 'Наличие инвалидности',
        options: disabilityOptions,
        selected: selectedDisability
    },
    {
        title: 'Сведения о заболеваемости',
        options: morbidityOptions,
        selected: selectedMorbidity
    },
    {
        title: 'Сбалансированное питание',
        options: balancedDietOptions,
        selected: selectedBalancedDiet
    },
    {
        title: 'Наличие хронических заболеваний',
        options: chronicDiseasesOptions,
        selected: selectedChronicDiseases
    }
])

const individualOptions = computed<
    { title: string; options: ComputedRef<MedicalHealthOption[]>; selected: Ref<MedicalHealthOption[]> }[]
>(() => [
    {
        title: 'Зрение',
        options: visionOptions,
        selected: selectedVision
    },
    {
        title: 'Слух',
        options: hearingOptions,
        selected: selectedHearing
    },
    {
        title: 'Ортопедия',
        options: orthopediaOptions,
        selected: selectedOrthopedia
    },
    {
        title: 'ЖКТ',
        options: gastrointestinalOptions,
        selected: selectedGastrointestinal
    },
    {
        title: 'Неврология, психиатрия',
        options: neurologyAndPsychiatryOptions,
        selected: selectedNeurologyAndPsychiatry
    }
])

const currentHealthZone = computed<HealthZone>(() => {
    const generalOptions = [selectedDisability, selectedMorbidity, selectedBalancedDiet, selectedChronicDiseases]
    if (generalOptions.some((option) => option.value?.healthZone === HealthZone.RED)) {
        return HealthZone.RED
    }
    if (generalOptions.some((option) => option.value?.healthZone === HealthZone.YELLOW)) {
        const individualOptions = [
            ...selectedVision.value,
            ...selectedHearing.value,
            ...selectedOrthopedia.value,
            ...selectedGastrointestinal.value,
            ...selectedNeurologyAndPsychiatry.value
        ]
        if (individualOptions.some((option) => option.healthZone === HealthZone.RED)) {
            return HealthZone.RED
        }
        return HealthZone.YELLOW
    }
    return HealthZone.GREEN
})

const availableRecommendations = computed(() =>
    medicalRecommendations.value?.filter((recommendation) => recommendation.healthZone === currentHealthZone.value)
)

const showIndividualOptions = computed(
    () => currentHealthZone.value === HealthZone.YELLOW || currentHealthZone.value === HealthZone.RED
)
</script>
