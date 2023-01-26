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
                                {{ conclusionTypeTitles[conclusionType] }}
                            </template>
                            <template #content>
                                <div class="flex flex-column gap-3">
                                    <p-card
                                        class="shadow-none text-white"
                                        :class="{
                                            'bg-green-500': studentHealthZones[conclusionType] === HealthZone.GREEN,
                                            'bg-yellow-500': studentHealthZones[conclusionType] === HealthZone.YELLOW,
                                            'bg-red-500': studentHealthZones[conclusionType] === HealthZone.RED
                                        }"
                                    >
                                        <template #title>
                                            <div class="flex flex-column gap-3">
                                                <div
                                                    v-for="conclusion in conclusions?.filter(
                                                        (conclusion) =>
                                                            conclusion.conclusionType === conclusionType &&
                                                            conclusion.healthZone ===
                                                                studentHealthZones[conclusion.conclusionType]
                                                    )"
                                                >
                                                    {{ conclusion.title }}
                                                </div>
                                            </div>
                                        </template>
                                    </p-card>
                                    <div
                                        v-if="
                                            studentOverallRecommendations[conclusionType]?.length ||
                                            studentNamedRecommendations[conclusionType]?.length ||
                                            studentSpecialistNotes[conclusionType]
                                        "
                                        class="p-cards-joinable"
                                    >
                                        <p-card
                                            v-if="
                                                studentOverallRecommendations[conclusionType]?.length ||
                                                studentNamedRecommendations[conclusionType]?.length
                                            "
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
                                                        v-for="recommendation in studentOverallRecommendations[conclusionType]"
                                                        class="px-2 py-2 text-gray-800"
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
                                                <div class="p-cards-joinable">
                                                    <p-card
                                                        v-for="namedRecommendation in studentNamedRecommendations[
                                                            conclusionType
                                                        ]"
                                                        class="shadow-none text-white bg-transparent"
                                                    >
                                                        <template #title>{{ namedRecommendation.title }}</template>
                                                        <template #content>
                                                            <div class="flex flex-wrap gap-1">
                                                                <p-chip
                                                                    v-for="recommendation in namedRecommendation.recommendations"
                                                                    class="px-2 py-2 text-gray-800"
                                                                    :class="{
                                                                        'bg-green-100':
                                                                            namedRecommendation.healthZone === HealthZone.GREEN,
                                                                        'bg-yellow-100':
                                                                            namedRecommendation.healthZone ===
                                                                            HealthZone.YELLOW,
                                                                        'bg-red-100':
                                                                            namedRecommendation.healthZone === HealthZone.RED
                                                                    }"
                                                                >
                                                                    <health-zone-indicator
                                                                        :health-zone="namedRecommendation.healthZone"
                                                                        :label="recommendation.title"
                                                                    />
                                                                </p-chip>
                                                            </div>
                                                        </template>
                                                    </p-card>
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
                                                    class="w-full opacity-100 border-none text-gray-800"
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
    SelectionType,
    SocialHealthRecommendation
} from '@prisma/client'

const { data: conclusions } = await useFetch('/api/conclusions/with-recommendations')
const { data: medicalOptions } = await useFetch('/api/students/health/medical/options')
const { data: pedagogueOptions } = await useFetch('/api/students/health/pedagogue/options/with-recommendations')
const { data: psychologicalOptions } = await useFetch('/api/students/health/psychological/options/with-recommendations')

const props = defineProps<{
    studentData: HealthComponentData
    loadingData: boolean
    refreshData: () => Promise<void>
}>()

const medicalOptionSelectionTypes = computed(() =>
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

const studentMedicalOptions = computed(() =>
    (Object.keys(MedicalType) as MedicalType[]).reduce(
        (acc, type) => {
            if (medicalOptionSelectionTypes.value.SINGLE.includes(type)) {
                acc.SINGLE[type] =
                    props.studentData?.medicalHealth?.options.find((option) => option.medicalType === type) ??
                    medicalOptions.value?.find(
                        (option) => option.medicalType === type && option.healthZone === HealthZone.GREEN
                    )!
            } else if (medicalOptionSelectionTypes.value.MULTIPLE.includes(type)) {
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

const pedagogueTabTypes = computed(() =>
    (Object.keys(PedagogueTab) as PedagogueTab[]).reduce((acc, tab) => {
        acc[tab] = [
            ...new Set(
                (pedagogueOptions.value ?? [])
                    .filter((option) => option.pedagogueTab === tab)
                    .map((option) => option.pedagogueType)
            )
        ]
        return acc
    }, {} as { [key in PedagogueTab]: PedagogueType[] })
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

const studentSocialIndicators = computed(() => props.studentData?.socialHealth?.indicators ?? [])

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
    SOCIAL: Object.values(studentSocialIndicators.value).reduce(
        (acc, option) => healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
        'GREEN' as HealthZone
    )
}))

const studentOverallRecommendations = computed<{
    [key in ConclusionType]?: MedicalHealthRecommendation[] | PhysicalHealthRecommendation[] | SocialHealthRecommendation[]
}>(() => ({
    MEDICAL: [
        ...(Object.values(studentMedicalOptions.value.MULTIPLE).flat() ?? []),
        ...(props.studentData?.medicalHealth?.recommendations ?? [])
    ],
    PHYSICAL: props.studentData?.physicalHealth?.recommendations ?? [],
    SOCIAL: props.studentData?.socialHealth?.recommendations ?? []
}))

const pedagogueTypeTitles: { [key in PedagogueType]: string } = {
    UNDERSTANDING_INSTRUCTIONS: 'Понимание инструкции',
    MASTERING_EDUCATION: 'Освоение содержания образования',
    WORK_PACE: 'Темп работы',
    ACTIVITY_SPECIFICS: 'Специфика продуктивной деятельности',
    WORKABILITY: 'Работоспособность на уроке и внеурочной деятельности',
    HEALTH_LIMITATIONS: 'ОВЗ (наличие заключения ПМПК)',
    DISABILITY: 'Инвалидность (наличие справки МСЭ, рекомендаций ИПРА)',

    VOICE_DISORDERS: 'Расстройства голоса',
    TEMPO_RHYTHMIC_DISORDERS: 'Нарушения темпо-ритмической организации речи',
    SPELLING_DISORDERS: 'Нарушения звукопроизношения',
    ANATOMO_PHYSIOLOGICAL_DEFECTS: 'Анатомо-физиологические дефекты речевого аппарата',
    INNERVATION_DISORDERS: 'Нарушения иннервации речевого аппарата',
    STRUCTURAL_SEMANTIC_DISORDERS: 'Нарушения структурно-семантического оформления высказывания',
    WRITING_DISORDERS: 'Нарушения письма',
    READING_DISORDERS: 'Нарушения чтения'
}

const psychologicalTypeTitles: { [key in PsychologicalType]: string } = {
    CULTURAL_VALUES: 'Уровень сформированности ценностей',
    MOTIVATION: 'Мотивация',
    ADAPTATION: 'Адаптация',
    SOCIOMETRY: 'Социальный статус (социометрия)',
    SELF_ASSESSMENT: 'Самооценка',
    ACCENTUATIONS: 'Акцентуации характера',
    ANXIETY: 'Тревожность',
    PERSONAL_ANXIETY: 'Тревожность (личностная, ситуативная)',
    AGGRESSIVITY: 'Агрессивность',
    EXTRACURRICULAR_ABILITIES: 'Способности к различным видам внеучебной деятельности',
    DEVIANT_BEHAVIOR: 'Отклоняющееся поведение',
    PROFESSIONAL_INTERESTS: 'Профессиональные интересы и склонности',
    BULLYING: 'Буллинг',
    CONFLICTUALITY: 'Участие ребенка в конфликтах в школе и вне школы'
}

const studentNamedRecommendations = computed<{
    [key in ConclusionType]?: { title: string; healthZone: HealthZone; recommendations: { title: string }[] }[]
}>(() => ({
    PEDAGOGUE: pedagogueTabTypes.value.PEDAGOGUE.map((type) => ({
        title: pedagogueTypeTitles[type],
        healthZone: studentPedagogueOptions.value[type].healthZone,
        recommendations:
            pedagogueOptions.value?.find(
                (option) =>
                    option.pedagogueType === type && option.healthZone === studentPedagogueOptions.value[type].healthZone
            )?.recommendations ?? []
    })).filter(({ recommendations }) => recommendations.length),
    SPEECH: pedagogueTabTypes.value.SPEECH_THERAPIST.map((type) => ({
        title: pedagogueTypeTitles[type],
        healthZone: studentPedagogueOptions.value[type].healthZone,
        recommendations:
            pedagogueOptions.value?.find(
                (option) =>
                    option.pedagogueType === type && option.healthZone === studentPedagogueOptions.value[type].healthZone
            )?.recommendations ?? []
    })).filter(({ recommendations }) => recommendations.length),
    PSYCHOLOGICAL: studentPsychologicalTypes.value
        .map((type) => ({
            title: psychologicalTypeTitles[type],
            healthZone: studentPsychologicalOptions.value[type].healthZone,
            recommendations:
                psychologicalOptions.value?.find(
                    (option) =>
                        option.psychologicalType === type &&
                        option.healthZone === studentPsychologicalOptions.value[type].healthZone
                )?.recommendations ?? []
        }))
        .filter(({ recommendations }) => recommendations.length)
}))

const studentSpecialistNotes = computed<{
    [key in ConclusionType]?: string
}>(() => ({
    MEDICAL: props.studentData?.medicalHealth?.specialistNotes ?? '',
    PHYSICAL: props.studentData?.physicalHealth?.specialistNotes ?? ''
}))

const healthZones: HealthZone[] = [HealthZone.GREEN, HealthZone.YELLOW, HealthZone.RED]

const conclusionTypeTitles: { [key in ConclusionType]: string } = {
    MEDICAL: 'Медицинское здоровье',
    PEDAGOGUE: 'Педагогическое здоровье',
    SPEECH: 'Логопедическое здоровье',
    PHYSICAL: 'Физическое здоровье',
    PSYCHOLOGICAL: 'Психологическое здоровье',
    SOCIAL: 'Социальное здоровье'
}
</script>
