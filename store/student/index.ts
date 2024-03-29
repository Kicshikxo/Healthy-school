import {
    ConclusionType,
    EducationType,
    HealthGroup,
    HealthZone,
    MedicalHealth,
    MedicalHealthOption,
    MedicalType,
    PedagogueHealth,
    PedagogueHealthOption,
    PedagogueTab,
    PedagogueType,
    PhysicalHealth,
    PhysicalHealthOption,
    PhysicalType,
    PsychologicalHealth,
    PsychologicalHealthOption,
    PsychologicalType,
    SocialHealth,
    SocialHealthOption
} from '@prisma/client'
import { defineStore } from 'pinia'
import { useBreadcrumbsStore } from '~~/store/breadcrumbs'
import { useConclusionsStore } from '~~/store/health/conclusions'
import { useMedicalHealthStore } from '~~/store/health/medical'
import { usePedagogueHealthStore } from '~~/store/health/pedagogue'
import { usePhysicalHealthStore } from '~~/store/health/physical'
import { usePsychologicalHealthStore } from '~~/store/health/psychological'
import { useSocialHealthStore } from '~~/store/health/social'

export const useStudentStore = defineStore('student', () => {
    const route = useRoute()

    const id = ref<string | undefined>(route.params.studentId ? parseUUID(route.params.studentId as string) : undefined)
    function setId(value: string) {
        id.value = value
    }

    const {
        data,
        pending: loading,
        refresh
    } = useFetch('/api/students/info', {
        query: { studentId: id },
        transform: (data) =>
            Object.assign({}, data, {
                birthdate: new Date(data?.birthdate!),
                createdAt: new Date(data?.createdAt!),
                updatedAt: new Date(data?.updatedAt!)
            })
    })

    const breadcrumbs = useBreadcrumbsStore()
    watchEffect(() => breadcrumbs.setStudent(data.value))

    const medicalHealth = useMedicalHealthStore()
    const pedagogueHealth = usePedagogueHealthStore()
    const physicalHealth = usePhysicalHealthStore()
    const psychologicalHealth = usePsychologicalHealthStore()
    const socialHealth = useSocialHealthStore()
    const conclusions = useConclusionsStore()

    const healthZones: HealthZone[] = [HealthZone.GREEN, HealthZone.YELLOW, HealthZone.RED]
    const healthGroups: HealthGroup[] = [HealthGroup.BASIC, HealthGroup.PREPARATORY, HealthGroup.SPECIAL]
    function healthGroupToHealthZone(healthGroup: HealthGroup) {
        return healthZones[healthGroups.indexOf(healthGroup)]
    }

    // Student medical data
    const medicalOptions = computed(() =>
        (Object.keys(MedicalType) as MedicalType[]).reduce(
            (acc, type) => {
                if (medicalHealth.selectionTypes.SINGLE.includes(type)) {
                    acc.SINGLE[type] =
                        data.value?.medicalHealth?.options.find((option) => option.medicalType === type) ??
                        medicalHealth.typedOptions[type]?.find((option) => option.healthZone === HealthZone.GREEN)!
                } else if (medicalHealth.selectionTypes.MULTIPLE.includes(type)) {
                    acc.MULTIPLE[type] =
                        data.value?.medicalHealth?.options.filter((option) => option.medicalType === type) ?? []
                } else if (medicalHealth.selectionTypes.CHECKBOX.includes(type)) {
                    acc.CHECKBOX[type] = data.value?.medicalHealth?.options.find((option) => option.medicalType === type)
                }
                return acc
            },
            { SINGLE: {}, MULTIPLE: {}, CHECKBOX: {} } as {
                SINGLE: { [key in MedicalType]?: MedicalHealthOption }
                MULTIPLE: { [key in MedicalType]?: MedicalHealthOption[] }
                CHECKBOX: { [key in MedicalType]?: MedicalHealthOption }
            }
        )
    )
    const medicalSpecialistNotes = computed(() => data.value?.medicalHealth?.specialistNotes ?? '')
    const medicalHealthZone = computed(() => medicalOptions.value.SINGLE.HEALTH_GROUP?.healthZone ?? HealthZone.GREEN)
    // Current medical data
    const currentMedicalOptions = ref(useCloneDeep(medicalOptions.value))
    const currentMedicalSpecialistNotes = ref(useCloneDeep(medicalSpecialistNotes.value))
    const hasMedicalChanges = computed(
        () =>
            !isEqual(medicalOptions.value, currentMedicalOptions.value) ||
            !isEqual(medicalSpecialistNotes.value, currentMedicalSpecialistNotes.value)
    )
    watch(medicalOptions, (value) => (currentMedicalOptions.value = useCloneDeep(value)), {
        flush: 'sync'
    })
    watch(medicalSpecialistNotes, (value) => (currentMedicalSpecialistNotes.value = useCloneDeep(value)), {
        flush: 'sync'
    })
    const currentMedicalHealthZone = computed(
        () => currentMedicalOptions.value.SINGLE.HEALTH_GROUP?.healthZone ?? HealthZone.GREEN
    )
    // Medical methods
    async function saveCurrentMedical() {
        const { error } = await useFetch('/api/students/health/medical', {
            method: 'PATCH',
            body: {
                studentId: id.value,
                options: [
                    ...Object.values(currentMedicalOptions.value.SINGLE).map((option) =>
                        currentMedicalOptions.value.SINGLE.HEALTH_GROUP?.healthZone === HealthZone.GREEN
                            ? medicalHealth.typedOptions[option.medicalType]?.find(
                                  (option) => option.healthZone === HealthZone.GREEN
                              ) ?? option
                            : option
                    ),
                    ...Object.values(currentMedicalOptions.value.CHECKBOX).filter(
                        (option) => option && option.healthZone === currentMedicalHealthZone.value
                    )
                ],
                specialistNotes: currentMedicalSpecialistNotes.value.trim()
            } as MedicalHealth & { options: MedicalHealthOption[] }
        })

        if (error.value) {
            throw new Error(error.value.message)
        }

        await refresh()
    }

    // Student pedagogue data
    const pedagogueOptions = computed(() =>
        (Object.keys(PedagogueType) as PedagogueType[]).reduce((acc, type) => {
            acc[type] =
                data.value?.pedagogueHealth?.options.find((option) => option.pedagogueType === type) ??
                pedagogueHealth.typedOptions[type]?.find((option) => option.healthZone === HealthZone.GREEN)!
            return acc
        }, {} as { [key in PedagogueType]?: PedagogueHealthOption })
    )
    const pedagogueHealthZone = computed(() =>
        Object.values(pedagogueOptions.value)
            .filter((option) => option?.pedagogueTab === PedagogueTab.PEDAGOGUE)
            .reduce(
                (acc, option) => healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
                'GREEN' as HealthZone
            )
    )
    const speechHealthZone = computed(() =>
        Object.values(pedagogueOptions.value)
            .filter((option) => option?.pedagogueTab === PedagogueTab.SPEECH_THERAPIST)
            .reduce(
                (acc, option) => healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
                'GREEN' as HealthZone
            )
    )
    // Current pedagogue data
    const currentPedagogueOptions = ref(useCloneDeep(pedagogueOptions.value))
    const hasPedagogueChanges = computed(() => !isEqual(pedagogueOptions.value, currentPedagogueOptions.value))
    watch(pedagogueOptions, (value) => (currentPedagogueOptions.value = useCloneDeep(value)), {
        flush: 'sync'
    })
    const currentPedagogueHealthZone = computed(() =>
        Object.values(currentPedagogueOptions.value)
            .filter((option) => option?.pedagogueTab === PedagogueTab.PEDAGOGUE)
            .reduce(
                (acc, option) => healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
                'GREEN' as HealthZone
            )
    )
    const currentSpeechHealthZone = computed(() =>
        Object.values(currentPedagogueOptions.value)
            .filter((option) => option?.pedagogueTab === PedagogueTab.SPEECH_THERAPIST)
            .reduce(
                (acc, option) => healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
                'GREEN' as HealthZone
            )
    )
    // Pedagogue methods
    async function saveCurrentPedagogue() {
        const { error } = await useFetch('/api/students/health/pedagogue', {
            method: 'PATCH',
            body: {
                studentId: id.value,
                options: Object.values(currentPedagogueOptions.value)
            } as PedagogueHealth & { options: PedagogueHealthOption[] }
        })

        if (error.value) {
            throw new Error(error.value.message)
        }

        await refresh()
    }

    // Student physical options
    const physicalOptions = computed(() =>
        (Object.keys(PhysicalType) as PhysicalType[]).reduce((acc, type) => {
            acc[type] =
                data.value?.physicalHealth?.options.find((option) => option.physicalType === type) ??
                physicalHealth.typedOptions[type]?.find((option) => option.healthGroup === currentPhysicalHealthGroup.value)!
            return acc
        }, {} as { [key in PhysicalType]?: PhysicalHealthOption })
    )
    const physicalHealthGroup = computed(() => data.value?.physicalHealth?.healthGroup)
    const physicalHealthZone = computed(() => healthGroupToHealthZone(physicalHealthGroup.value ?? HealthGroup.BASIC))
    // Current physical data
    const currentPhysicalHealthGroup = ref(useCloneDeep(physicalHealthGroup.value))
    const currentPhysicalOptions = ref(useCloneDeep(physicalOptions.value))
    const hasPhysicalChanges = computed(
        () =>
            !isEqual(physicalHealthGroup.value, currentPhysicalHealthGroup.value) ||
            !isEqual(physicalOptions.value, currentPhysicalOptions.value)
    )
    watch(
        currentPhysicalHealthGroup,
        () =>
            (Object.keys(PhysicalType) as PhysicalType[]).forEach(
                (type) =>
                    (currentPhysicalOptions.value[type] = [
                        currentPhysicalOptions.value[type],
                        physicalOptions.value[type],
                        ...physicalHealth.typedOptions[type]
                    ].find((option) => option && option.healthZone === currentPhysicalHealthZone.value))
            ),
        { deep: true }
    )
    watch(physicalOptions, (value) => (currentPhysicalOptions.value = useCloneDeep(value)), {
        flush: 'sync'
    })
    watch(physicalHealthGroup, (value) => (currentPhysicalHealthGroup.value = useCloneDeep(value)), {
        flush: 'sync'
    })
    const currentPhysicalHealthZone = computed(() =>
        healthGroupToHealthZone(currentPhysicalHealthGroup.value ?? HealthGroup.BASIC)
    )
    // Physical methods
    async function saveCurrentPhysical() {
        const { error } = await useFetch('/api/students/health/physical', {
            method: 'PATCH',
            body: {
                studentId: id.value,
                healthGroup: currentPhysicalHealthGroup.value,
                options: Object.values(currentPhysicalOptions.value).filter(
                    (option) => option && option.healthGroup === currentPhysicalHealthGroup.value
                )
            } as PhysicalHealth & { options: PhysicalHealthOption[] }
        })

        if (error.value) {
            throw new Error(error.value.message)
        }

        await refresh()
    }

    // Student psychological options
    const studentEducationType = computed<EducationType | undefined>(() => {
        const classNumber = data.value?.class?.number
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
    const studentPsychologicalTypes = computed(() =>
        studentEducationType.value ? psychologicalHealth.educationTypes[studentEducationType.value] : []
    )
    const educationOptions = computed(() =>
        studentEducationType.value
            ? psychologicalHealth.typedOptions[studentEducationType.value]
            : ({} as { [key in PsychologicalType]: PsychologicalHealthOption[] })
    )
    const psychologicalOptions = computed(() => {
        return studentPsychologicalTypes.value.reduce((acc, type) => {
            acc[type] =
                data.value?.psychologicalHealth?.options.find((option) => option.psychologicalType === type) ??
                educationOptions.value[type].find((option) => option.healthZone === HealthZone.GREEN)!
            return acc
        }, {} as { [key in PsychologicalType]?: PsychologicalHealthOption })
    })
    const psychologicalSpecialistNotes = computed(() => data.value?.psychologicalHealth?.specialistNotes ?? '')
    const psychologicalHealthZone = computed(() =>
        Object.values(psychologicalOptions.value).reduce(
            (acc, option) => healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
            'GREEN' as HealthZone
        )
    )
    // Current psychological data
    const currentPsychologicalOptions = ref(useCloneDeep(psychologicalOptions.value))
    const currentPsychologicalSpecialistNotes = ref(useCloneDeep(psychologicalSpecialistNotes.value))
    const hasPsychologicalChanges = computed(
        () =>
            !isEqual(psychologicalOptions.value, currentPsychologicalOptions.value) ||
            !isEqual(psychologicalSpecialistNotes.value, currentPsychologicalSpecialistNotes.value)
    )
    watch(psychologicalOptions, (value) => (currentPsychologicalOptions.value = useCloneDeep(value)), {
        flush: 'sync'
    })
    watch(psychologicalSpecialistNotes, (value) => (currentPsychologicalSpecialistNotes.value = useCloneDeep(value)), {
        flush: 'sync'
    })
    const currentPsychologicalHealthZone = computed(() =>
        Object.values(currentPsychologicalOptions.value).reduce(
            (acc, option) => healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
            'GREEN' as HealthZone
        )
    )
    // Psychological methods
    async function saveCurrentPsychological() {
        const { error } = await useFetch('/api/students/health/psychological', {
            method: 'PATCH',
            body: {
                studentId: id.value,
                options: Object.values(currentPsychologicalOptions.value).filter(
                    (option) => option.educationType === studentEducationType.value
                ),
                specialistNotes: currentPsychologicalSpecialistNotes.value.trim()
            } as PsychologicalHealth & { options: PsychologicalHealthOption[] }
        })

        if (error.value) {
            throw new Error(error.value.message)
        }

        await refresh()
    }

    // Student social options
    const socialOptions = computed(() => data.value?.socialHealth?.options ?? [])
    const socialHealthZone = computed(() =>
        (socialOptions.value ?? []).reduce(
            (acc, option) => healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
            'GREEN' as HealthZone
        )
    )
    // Current social data
    const currentSocialOptions = ref(useCloneDeep(socialOptions.value))
    const hasSocialChanges = computed(() => !isEqual(socialOptions.value, currentSocialOptions.value))
    watch(socialOptions, (value) => (currentSocialOptions.value = value), {
        flush: 'sync'
    })
    const currentSocialHealthZone = computed(() =>
        (currentSocialOptions.value ?? []).reduce(
            (acc, option) => healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
            'GREEN' as HealthZone
        )
    )
    // Social methods
    async function saveCurrentSocial() {
        const { error } = await useFetch('/api/students/health/social', {
            method: 'PATCH',
            body: {
                studentId: id.value,
                options: currentSocialOptions.value
            } as SocialHealth & { options: SocialHealthOption[] }
        })

        if (error.value) {
            throw new Error(error.value.message)
        }

        await refresh()
    }

    const healthConclusions = computed<{
        [key in ConclusionType]?: {
            title: string
            healthZone: HealthZone
            summary?: string
            recommendations?: {
                title: string
                subtitle?: string
                healthZone?: HealthZone
                list: { title: string }[]
            }[]
            notes?: {
                title: string
                value: string
            }[]
        }
    }>(() => ({
        MEDICAL: {
            title: conclusions.typeTitles.MEDICAL,
            healthZone: medicalHealthZone.value,
            summary: conclusions.list?.find(
                (conclusion) =>
                    conclusion.conclusionType === ConclusionType.MEDICAL && conclusion.healthZone === medicalHealthZone.value
            )?.summary,
            recommendations: [
                {
                    title: 'Общие рекомендации',
                    healthZone: medicalHealthZone.value,
                    list: conclusions.list?.find(
                        (conclusion) =>
                            conclusion.conclusionType === ConclusionType.MEDICAL &&
                            conclusion.healthZone === medicalHealthZone.value
                    )?.recommendations as { title: string }[]
                },
                ...Object.values(medicalOptions.value.CHECKBOX)
                    .filter((option) => option)
                    .map((option) => ({
                        title: medicalHealth.typeTitles[option.medicalType],
                        subtitle: option.title,
                        healthZone: option.healthZone,
                        list:
                            medicalHealth.optionsWithRecommendations?.find(
                                (optionWithRecommendations) => optionWithRecommendations.id === option.id
                            )?.recommendations ?? []
                    }))
            ].filter(({ list }) => list?.length),
            notes: [
                {
                    title: 'Иное',
                    value: medicalSpecialistNotes.value
                }
            ].filter((note) => note?.value)
        },
        PEDAGOGUE: {
            title: conclusions.typeTitles.PEDAGOGUE,
            healthZone: pedagogueHealthZone.value,
            summary: conclusions.list?.find(
                (conclusion) =>
                    conclusion.conclusionType === ConclusionType.PEDAGOGUE &&
                    conclusion.healthZone === pedagogueHealthZone.value
            )?.summary,
            recommendations: [
                {
                    title: 'Общие рекомендации',
                    healthZone: pedagogueHealthZone.value,
                    list: conclusions.list?.find(
                        (conclusion) =>
                            conclusion.conclusionType === ConclusionType.PEDAGOGUE &&
                            conclusion.healthZone === pedagogueHealthZone.value
                    )?.recommendations as { title: string }[]
                },
                ...Object.values(pedagogueOptions.value)
                    .filter((option) => option && option.pedagogueTab === PedagogueTab.PEDAGOGUE)
                    .map((option) => ({
                        title: pedagogueHealth.typeTitles[option.pedagogueType],
                        subtitle: option.title,
                        healthZone: option.healthZone,
                        list:
                            pedagogueHealth.optionsWithRecommendations?.find(
                                (optionWithRecommendations) => optionWithRecommendations.id === option.id
                            )?.recommendations ?? []
                    }))
            ].filter(({ list }) => list?.length)
        },
        SPEECH: {
            title: conclusions.typeTitles.SPEECH,
            healthZone: speechHealthZone.value,
            summary: conclusions.list?.find(
                (conclusion) =>
                    conclusion.conclusionType === ConclusionType.SPEECH && conclusion.healthZone === speechHealthZone.value
            )?.summary,
            recommendations: [
                {
                    title: 'Общие рекомендации',
                    healthZone: speechHealthZone.value,
                    list: conclusions.list?.find(
                        (conclusion) =>
                            conclusion.conclusionType === ConclusionType.SPEECH &&
                            conclusion.healthZone === speechHealthZone.value
                    )?.recommendations as { title: string }[]
                },
                ...Object.values(pedagogueOptions.value)
                    .filter((option) => option && option.pedagogueTab === PedagogueTab.SPEECH_THERAPIST)
                    .map((option) => ({
                        title: pedagogueHealth.typeTitles[option.pedagogueType],
                        subtitle: option.title,
                        healthZone: option.healthZone,
                        list:
                            pedagogueHealth.optionsWithRecommendations?.find(
                                (optionWithRecommendations) => optionWithRecommendations.id === option.id
                            )?.recommendations ?? []
                    }))
            ].filter(({ list }) => list?.length)
        },
        PHYSICAL: {
            title: conclusions.typeTitles.PHYSICAL,
            healthZone: physicalHealthZone.value,
            summary: conclusions.list?.find(
                (conclusion) =>
                    conclusion.conclusionType === ConclusionType.PHYSICAL && conclusion.healthZone === physicalHealthZone.value
            )?.summary,
            recommendations: [
                {
                    title: 'Общие рекомендации',
                    healthZone: physicalHealthZone.value,
                    list: conclusions.list?.find(
                        (conclusion) =>
                            conclusion.conclusionType === ConclusionType.PHYSICAL &&
                            conclusion.healthZone === physicalHealthZone.value
                    )?.recommendations as { title: string }[]
                },
                ...Object.values(physicalOptions.value)
                    .filter((option) => option)
                    .map((option) => ({
                        title: physicalHealth.typeTitles[option.physicalType],
                        subtitle: option.title,
                        healthZone: option.healthZone,
                        list:
                            physicalHealth.optionsWithRecommendations?.find(
                                (optionWithRecommendations) => optionWithRecommendations.id === option.id
                            )?.recommendations ?? []
                    }))
            ].filter(({ list }) => list?.length)
        },
        PSYCHOLOGICAL: {
            title: conclusions.typeTitles.PSYCHOLOGICAL,
            healthZone: psychologicalHealthZone.value,
            summary: conclusions.list?.find(
                (conclusion) =>
                    conclusion.conclusionType === ConclusionType.PSYCHOLOGICAL &&
                    conclusion.healthZone === psychologicalHealthZone.value
            )?.summary,
            recommendations: [
                {
                    title: 'Общие рекомендации',
                    healthZone: psychologicalHealthZone.value,
                    list: conclusions.list?.find(
                        (conclusion) =>
                            conclusion.conclusionType === ConclusionType.PSYCHOLOGICAL &&
                            conclusion.healthZone === psychologicalHealthZone.value
                    )?.recommendations as { title: string }[]
                },
                ...Object.values(psychologicalOptions.value)
                    .filter((option) => option)
                    .map((option) => ({
                        title: psychologicalHealth.typeTitles[option.psychologicalType],
                        subtitle: option.title,
                        healthZone: option.healthZone,
                        list:
                            psychologicalHealth.optionsWithRecommendations?.find(
                                (optionWithRecommendations) => optionWithRecommendations.id === option.id
                            )?.recommendations ?? []
                    }))
            ].filter(({ list }) => list?.length),
            notes: [
                {
                    title: 'Иное',
                    value: psychologicalSpecialistNotes.value
                }
            ].filter((note) => note?.value)
        },
        SOCIAL: {
            title: conclusions.typeTitles.SOCIAL,
            healthZone: socialHealthZone.value,
            summary: conclusions.list?.find(
                (conclusion) =>
                    conclusion.conclusionType === ConclusionType.SOCIAL && conclusion.healthZone === socialHealthZone.value
            )?.summary,
            recommendations: [
                {
                    title: 'Общие рекомендации',
                    healthZone: socialHealthZone.value,
                    list: conclusions.list?.find(
                        (conclusion) =>
                            conclusion.conclusionType === ConclusionType.SOCIAL &&
                            conclusion.healthZone === socialHealthZone.value
                    )?.recommendations as { title: string }[]
                },
                ...Object.values(socialOptions.value)
                    .filter((option) => option)
                    .map((option) => ({
                        title: socialHealth.typeTitles[option.socialType],
                        subtitle: option.title,
                        healthZone: option.healthZone,
                        list:
                            socialHealth.optionsWithRecommendations?.find(
                                (optionWithRecommendations) => optionWithRecommendations.id === option.id
                            )?.recommendations ?? []
                    }))
            ].filter(({ list }) => list?.length)
        }
    }))

    return {
        id,
        setId,

        data,
        loading,
        refresh,
        current: {
            medical: {
                save: saveCurrentMedical,
                changed: hasMedicalChanges,
                healthZone: currentMedicalHealthZone,
                options: currentMedicalOptions,
                specialistNotes: currentMedicalSpecialistNotes
            },
            pedagogue: {
                save: saveCurrentPedagogue,
                changed: hasPedagogueChanges,
                healthZone: {
                    pedagogue: currentPedagogueHealthZone,
                    speech: currentSpeechHealthZone
                },
                options: currentPedagogueOptions
            },
            physical: {
                save: saveCurrentPhysical,
                changed: hasPhysicalChanges,
                healthZone: currentPhysicalHealthZone,
                healthGroup: currentPhysicalHealthGroup,
                options: currentPhysicalOptions
            },
            psychological: {
                save: saveCurrentPsychological,
                changed: hasPsychologicalChanges,
                healthZone: currentPsychologicalHealthZone,
                educationType: studentEducationType,
                educationOptions: educationOptions,
                options: currentPsychologicalOptions,
                specialistNotes: currentPsychologicalSpecialistNotes
            },
            social: {
                save: saveCurrentSocial,
                changed: hasSocialChanges,
                healthZone: currentSocialHealthZone,
                options: currentSocialOptions
            }
        },

        medical: {
            healthZone: medicalHealthZone,
            options: medicalOptions,
            specialistNotes: medicalSpecialistNotes
        },
        pedagogue: {
            healthZone: {
                pedagogue: pedagogueHealthZone,
                speech: speechHealthZone
            },
            options: pedagogueOptions
        },
        physical: {
            healthZone: physicalHealthZone,
            healthGroup: physicalHealthGroup,
            options: physicalOptions
        },
        psychological: {
            healthZone: psychologicalHealthZone,
            options: psychologicalOptions,
            specialistNotes: psychologicalSpecialistNotes
        },
        social: {
            healthZone: socialHealthZone,
            options: socialOptions
        },

        conclusions: healthConclusions
    }
})
