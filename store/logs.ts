import {
    Class,
    ConclusionType,
    EducationalOrganization,
    HealthGroup,
    HealthZone,
    MedicalHealthOption,
    MedicalType,
    Municipality,
    PedagogueHealthOption,
    PedagogueTab,
    PedagogueType,
    PsychologicalHealthOption,
    PsychologicalType,
    SocialHealthOption,
    SocialType,
    Student
} from '@prisma/client'
import { defineStore } from 'pinia'

export const useLogsStore = defineStore('logs', () => {
    const selectedEndDate = ref<Date>(new Date())
    const endDate = computed(() => selectedEndDate.value?.toJSON())

    const selectedMunicipality = ref<Municipality>()
    const selectedMunicipalityId = computed(() => selectedMunicipality.value?.id)

    const selectedOrganization = ref<EducationalOrganization>()
    const selectedOrganizationId = computed(() => selectedOrganization.value?.id)

    const selectedClass = ref<
        Class & {
            _count: {
                students: number
            }
        }
    >()
    const selectedClassId = computed(() => selectedClass.value?.id)

    const { data: municipalities, pending: loadingMunicipalities } = useFetch('/api/municipalities/list')
    const { data: organizations, pending: loadingOrganizations } = useFetch('/api/organizations/list', {
        query: {
            municipalityId: selectedMunicipalityId
        }
    })
    const { data: classes, pending: loadingClasses } = useFetch('/api/classes/list', {
        query: {
            organizationId: selectedOrganizationId
        }
    })

    const {
        data: logs,
        pending: loadingLogs,
        refresh: refreshLogs
    } = useFetch('/api/students/logs/class/list', {
        headers: useRequestHeaders() as HeadersInit,
        query: {
            classId: selectedClassId,
            endDate: endDate
        }
    })

    const healthZones: HealthZone[] = [HealthZone.GREEN, HealthZone.YELLOW, HealthZone.RED]
    const healthGroups: HealthGroup[] = [HealthGroup.BASIC, HealthGroup.PREPARATORY, HealthGroup.SPECIAL]
    function healthGroupToHealthZone(healthGroup: HealthGroup) {
        return healthZones[healthGroups.indexOf(healthGroup)]
    }

    const studentsWithHealthZones = computed<(Student & { healthZones: { [key in ConclusionType]?: HealthZone } })[]>(() =>
        (logs.value ?? []).map((student) => {
            const medicalOptions = (Object.keys(MedicalType) as MedicalType[]).reduce((acc, type) => {
                acc[type] = student.medicalHealth?.optionsLogs
                    .map((log) => log.option)
                    .find((option) => option.medicalType === type)
                return acc
            }, {} as { [key in MedicalType]?: MedicalHealthOption })

            const pedagogueOptions = (Object.keys(PedagogueType) as PedagogueType[]).reduce((acc, type) => {
                acc[type] = student.pedagogueHealth?.optionsLogs
                    .map((log) => log.option)
                    .find((option) => option.pedagogueType === type)
                return acc
            }, {} as { [key in PedagogueType]?: PedagogueHealthOption })

            const psychologicalOptions = (Object.keys(PsychologicalType) as PsychologicalType[]).reduce((acc, type) => {
                acc[type] = student.psychologicalHealth?.optionsLogs
                    .map((log) => log.option)
                    .find((option) => option.psychologicalType === type)
                return acc
            }, {} as { [key in PsychologicalType]?: PsychologicalHealthOption })

            const socialOptions = (Object.keys(SocialType) as SocialType[]).reduce((acc, type) => {
                acc[type] = student.socialHealth?.optionsLogs
                    .map((log) => log.option)
                    .find((option) => option.socialType === type)
                return acc
            }, {} as { [key in SocialType]?: SocialHealthOption })

            return {
                ...student,
                healthZones: {
                    MEDICAL: medicalOptions.HEALTH_GROUP?.healthZone ?? HealthZone.GREEN,
                    PEDAGOGUE: Object.values(pedagogueOptions)
                        .filter((option) => option && option?.pedagogueTab === PedagogueTab.PEDAGOGUE)
                        .reduce(
                            (acc, option) =>
                                healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
                            'GREEN' as HealthZone
                        ),
                    SPEECH: Object.values(pedagogueOptions)
                        .filter((option) => option && option?.pedagogueTab === PedagogueTab.SPEECH_THERAPIST)
                        .reduce(
                            (acc, option) =>
                                healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
                            'GREEN' as HealthZone
                        ),
                    PHYSICAL: healthGroupToHealthZone(
                        student.physicalHealth?.healthGroupLogs?.at(0)?.healthGroup ?? HealthGroup.BASIC
                    ),
                    PSYCHOLOGICAL: Object.values(psychologicalOptions)
                        .filter((option) => option)
                        .reduce(
                            (acc, option) =>
                                healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
                            'GREEN' as HealthZone
                        ),
                    SOCIAL: Object.values(socialOptions)
                        .filter((option) => option)
                        .reduce(
                            (acc, option) =>
                                healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
                            'GREEN' as HealthZone
                        )
                }
            }
        })
    )

    const studentsHealthGroupsCound = computed<{ [key in ConclusionType]?: { [key in HealthZone]: number } }>(() =>
        (Object.keys(ConclusionType) as ConclusionType[]).reduce((acc, type) => {
            acc[type] = (Object.keys(HealthZone) as HealthZone[]).reduce((acc, healthZone) => {
                acc[healthZone] = studentsWithHealthZones.value.filter(
                    (student) => student.healthZones[type] === healthZone
                ).length
                return acc
            }, {} as { [key in HealthZone]: number })
            return acc
        }, {} as { [key in ConclusionType]?: { [key in HealthZone]: number } })
    )

    return {
        list: logs,
        loading: loadingLogs,
        refresh: refreshLogs,

        selectedEndDate,

        students: studentsWithHealthZones,
        studentsCount: studentsHealthGroupsCound,

        municipalities: {
            selected: selectedMunicipality,
            list: municipalities,
            loading: loadingMunicipalities
        },
        organizations: {
            selected: selectedOrganization,
            list: organizations,
            loading: loadingOrganizations
        },
        classes: {
            selected: selectedClass,
            list: classes,
            loading: loadingClasses
        }
    }
})
