<template>
    <health-component :editable="false" :reloadable="true" :on-reload="props.refreshData">
        <template #title>Мероприятия индивидуального здоровьесберегающего маршрута</template>
        <template #body>
            <health-component-body :padding-top="false">
                <template #title> Мероприятия, рекомендации и назначения </template>
                <template #content>
                    <div class="flex flex-column gap-2 mt-3">
                        <p-card
                            v-for="conclusionType in (Object.keys(ConclusionType) as ConclusionType[])"
                            class="shadow-none text-white"
                            :class="{
                                'bg-green-400': studentHealthZones[conclusionType] === HealthZone.GREEN,
                                'bg-yellow-400': studentHealthZones[conclusionType] === HealthZone.YELLOW,
                                'bg-red-400': studentHealthZones[conclusionType] === HealthZone.RED
                            }"
                        >
                            <template #title>
                                {{ typeTitles[conclusionType] }}
                            </template>
                            <template #content>
                                <div class="flex flex-column gap-3">
                                    <div>
                                        <div
                                            v-for="conclusion in conclusions?.filter(
                                                (conclusion) =>
                                                    conclusion.conclusionType === conclusionType &&
                                                    conclusion.healthZone === studentHealthZones[conclusion.conclusionType]
                                            )"
                                        >
                                            {{ conclusion.title }}
                                        </div>
                                    </div>
                                    <div
                                        v-if="
                                            studentRecommendations[conclusionType].length ||
                                            studentSpecialistNotes[conclusionType]
                                        "
                                        class="p-cards-joinable"
                                    >
                                        <p-card
                                            v-if="studentRecommendations[conclusionType].length"
                                            class="shadow-none text-white border-bottom-2"
                                            :class="{
                                                'bg-green-500 border-green-400':
                                                    studentHealthZones[conclusionType] === HealthZone.GREEN,
                                                'bg-yellow-500 border-yellow-400':
                                                    studentHealthZones[conclusionType] === HealthZone.YELLOW,
                                                'bg-red-500 border-red-400':
                                                    studentHealthZones[conclusionType] === HealthZone.RED
                                            }"
                                        >
                                            <template #title>Рекомендации</template>
                                            <template #content>
                                                <div class="flex flex-wrap gap-1">
                                                    <p-chip
                                                        v-for="recommendation in studentRecommendations[conclusionType]"
                                                        class="px-2 py-2"
                                                        :class="{
                                                            'bg-green-100':
                                                                studentHealthZones[conclusionType] === HealthZone.GREEN,
                                                            'bg-yellow-100':
                                                                studentHealthZones[conclusionType] === HealthZone.YELLOW,
                                                            'bg-red-100': studentHealthZones[conclusionType] === HealthZone.RED
                                                        }"
                                                    >
                                                        <health-zone-indicator
                                                            :health-zone="recommendation.healthZone"
                                                            :label="recommendation.title"
                                                        />
                                                    </p-chip>
                                                </div>
                                            </template>
                                        </p-card>
                                        <p-card
                                            v-if="studentSpecialistNotes[conclusionType]"
                                            class="shadow-none text-white"
                                            :class="{
                                                'bg-green-500 ': studentHealthZones[conclusionType] === HealthZone.GREEN,
                                                'bg-yellow-500 ': studentHealthZones[conclusionType] === HealthZone.YELLOW,
                                                'bg-red-500 ': studentHealthZones[conclusionType] === HealthZone.RED
                                            }"
                                        >
                                            <template #title>Иное</template>
                                            <template #content>
                                                <p-textarea
                                                    :disabled="true"
                                                    :autoResize="true"
                                                    :rows="2"
                                                    :modelValue="studentSpecialistNotes[conclusionType]"
                                                    placeholder="Заполняется вручную медицинской сестрой"
                                                    class="w-full opacity-100 border-none"
                                                    :class="{
                                                        'bg-green-100': studentHealthZones[conclusionType] === HealthZone.GREEN,
                                                        'bg-yellow-100':
                                                            studentHealthZones[conclusionType] === HealthZone.YELLOW,
                                                        'bg-red-100': studentHealthZones[conclusionType] === HealthZone.RED
                                                    }"
                                                />
                                            </template>
                                        </p-card>
                                    </div>
                                </div>
                            </template>
                        </p-card>
                    </div>
                </template>
            </health-component-body>
        </template>
    </health-component>
</template>

<script setup lang="ts">
import {
    ConclusionType,
    EducationType,
    HealthGroup,
    HealthZone,
    MedicalHealthOption,
    MedicalHealthRecommendation,
    MedicalType,
    PedagogueHealthOption,
    PedagogueTab,
    PedagogueType,
    PhysicalHealthRecommendation,
    PsychologicalHealthOption,
    PsychologicalType,
    SocialHealthRecommendation
} from '@prisma/client'

const { data: conclusions } = await useFetch('/api/conclusions')
const { data: medicalOptions } = await useFetch('/api/students/health/medical/options')
const { data: pedagogueOptions } = await useFetch('/api/students/health/pedagogue/options')
const { data: psychologicalOptions } = await useFetch('/api/students/health/psychological/options')

const props = defineProps<{
    studentData: HealthComponentData
    loadingData: boolean
    refreshData: () => Promise<void>
}>()

enum SelectionType {
    SINGLE = 'SINGLE',
    MULTIPLE = 'MULTIPLE'
}

const medicalOptionSelectionTypes: { [key in SelectionType]: MedicalType[] } = {
    SINGLE: ['DISABILITY', 'MORBIDITY', 'BALANCED_DIET', 'CHRONIC_DISEASES'],
    MULTIPLE: ['VISION', 'HEARING', 'ORTHOPEDIA', 'GASTROINTESTINAL', 'NEUROLOGY_PSYCHIATRY']
}

const studentMedicalOptions = computed(() =>
    (Object.keys(MedicalType) as MedicalType[]).reduce(
        (acc, type) => {
            if (medicalOptionSelectionTypes.SINGLE.includes(type)) {
                acc.SINGLE[type] =
                    props.studentData?.medicalHealth?.options.find((option) => option.medicalType === type) ??
                    medicalOptions.value?.find(
                        (option) => option.medicalType === type && option.healthZone === HealthZone.GREEN
                    )!
            } else if (medicalOptionSelectionTypes.MULTIPLE.includes(type)) {
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

const studentPedagogueOptions = computed(() =>
    (Object.keys(PedagogueType) as PedagogueType[]).reduce((acc, type) => {
        acc[type] =
            props.studentData?.pedagogueHealth?.options.find((option) => option.pedagogueType === type) ??
            pedagogueOptions.value?.find((option) => option.pedagogueType === type && option.healthZone === HealthZone.GREEN)!
        return acc
    }, {} as { [key in PedagogueType]: PedagogueHealthOption })
)

const studentEducationType = computed<EducationType | undefined>(() => {
    const classNumber = props.studentData?.class?.number
    if (!classNumber) return

    if (1 <= classNumber && classNumber <= 4) {
        return EducationType.PRIMARY
    }
    if (5 <= classNumber && classNumber <= 9) {
        return EducationType.BASIC
    }
    if (10 <= classNumber && classNumber <= 11) {
        return EducationType.MIDDLE
    }
})

const educationTypes = computed(() =>
    (Object.keys(EducationType) as EducationType[]).reduce((acc, type) => {
        acc[type] = [
            ...new Set(
                (psychologicalOptions.value ?? [])
                    .filter((option) => option.educationType === type)
                    .map((option) => option.psychologicalType)
            )
        ]
        return acc
    }, {} as { [key in EducationType]: PsychologicalType[] })
)

const studentPsychologicalTypes = computed(() =>
    studentEducationType.value ? educationTypes.value[studentEducationType.value] : []
)

const studentPsychologicalOptions = computed(() => {
    return studentPsychologicalTypes.value.reduce((acc, type) => {
        acc[type] =
            props.studentData?.psychologicalHealth?.options.find((option) => option.psychologicalType === type) ??
            psychologicalOptions.value?.find(
                (option) => option.psychologicalType === type && option.healthZone === HealthZone.GREEN
            )!
        return acc
    }, {} as { [key in PsychologicalType]: PsychologicalHealthOption })
})

const studentIndicators = computed(() => props.studentData?.socialHealth?.indicators ?? [])

const studentHealthZones = computed<{ [key in ConclusionType]: HealthZone }>(() => ({
    MEDICAL: Object.values(studentMedicalOptions.value.SINGLE).some((option) => option.healthZone === HealthZone.RED)
        ? HealthZone.RED
        : Object.values(studentMedicalOptions.value.SINGLE).some((option) => option.healthZone === HealthZone.YELLOW)
        ? Object.values(studentMedicalOptions.value.MULTIPLE)
              .flat()
              .some((option) => option.healthZone === HealthZone.RED)
            ? HealthZone.RED
            : HealthZone.YELLOW
        : HealthZone.GREEN,
    PEDAGOGUE: Object.values(studentPedagogueOptions.value)
        .filter((option) => option.pedagogueTab === PedagogueTab.PEDAGOGUE)
        .reduce(
            (acc, option) => healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
            'GREEN' as HealthZone
        ),
    SPEECH: Object.values(studentPedagogueOptions.value)
        .filter((option) => option.pedagogueTab === PedagogueTab.SPEECH_THERAPIST)
        .reduce(
            (acc, option) => healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
            'GREEN' as HealthZone
        ),
    PHYSICAL:
        healthZones[
            ([HealthGroup.BASIC, HealthGroup.PREPARATORY, HealthGroup.SPECIAL] as HealthGroup[]).indexOf(
                props.studentData?.physicalHealth?.healthGroup!
            )
        ],
    PSYCHOLOGICAL: Object.values(studentPsychologicalOptions.value).reduce(
        (acc, option) => healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
        'GREEN' as HealthZone
    ),
    SOCIAL: Object.values(studentIndicators.value).reduce(
        (acc, option) => healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
        'GREEN' as HealthZone
    )
}))

const studentRecommendations = computed<{
    [key in ConclusionType]: MedicalHealthRecommendation[] | PhysicalHealthRecommendation[] | SocialHealthRecommendation[]
}>(() => ({
    MEDICAL: [
        ...(Object.values(studentMedicalOptions.value.MULTIPLE).flat() ?? []),
        ...(props.studentData?.medicalHealth?.recommendations ?? [])
    ],
    PEDAGOGUE: [],
    SPEECH: [],
    PHYSICAL: props.studentData?.physicalHealth?.recommendations ?? [],
    PSYCHOLOGICAL: [],
    SOCIAL: props.studentData?.socialHealth?.recommendations ?? []
}))

const studentSpecialistNotes = computed<{
    [key in ConclusionType]?: string
}>(() => ({
    MEDICAL: props.studentData?.medicalHealth?.specialistNotes ?? '',
    // PEDAGOGUE: '',
    // SPEECH: '',
    PHYSICAL: props.studentData?.physicalHealth?.specialistNotes ?? ''
    // PSYCHOLOGICAL: '',
    // SOCIAL: ''
}))

const healthZones: HealthZone[] = [HealthZone.GREEN, HealthZone.YELLOW, HealthZone.RED]

const typeTitles: { [key in ConclusionType]: string } = {
    MEDICAL: 'Медицинское здоровье',
    PEDAGOGUE: 'Педагогическое здоровье',
    SPEECH: 'Логопедическое здоровье',
    PHYSICAL: 'Физическое здоровье',
    PSYCHOLOGICAL: 'Психологическое здоровье',
    SOCIAL: 'Социальное здоровье'
}
</script>
