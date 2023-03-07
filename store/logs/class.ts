import { Class, ConclusionType, EducationalOrganization, HealthZone, Municipality } from '@prisma/client'
import { defineStore } from 'pinia'

export const useClassLogsStore = defineStore('classLogs', () => {
    const selectedStartDate = ref<Date>(new Date())
    const selectedEndDate = ref<Date>(new Date())

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

    const monthlyData = computed(() => {
        return [
            ...Array(
                Math.min(
                    selectedEndDate.value.getMonth() -
                        selectedStartDate.value.getMonth() +
                        12 * (selectedEndDate.value.getFullYear() - selectedStartDate.value.getFullYear()) +
                        1,
                    20
                )
            ).keys()
        ]
            .map((index) => {
                const endDate = new Date(selectedEndDate.value.getFullYear(), selectedEndDate.value.getMonth() - index + 1, 1)
                return {
                    date: endDate,
                    students: selectedClassId.value
                        ? useFetch('/api/students/logs/class/list', {
                              headers: useRequestHeaders() as HeadersInit,
                              query: {
                                  classId: selectedClassId.value,
                                  endDate: endDate.toJSON()
                              }
                          }).data
                        : ref(null)
                }
            })
            .reverse()
    })

    watchEffect(() => monthlyData.value) // Лютый костыль

    const monthlyCount = computed<
        {
            date: Date
            count: { [key in ConclusionType]?: { [key in HealthZone]: number } }
        }[]
    >(() =>
        monthlyData.value.map((month) => ({
            date: month.date,
            count: (Object.keys(ConclusionType) as ConclusionType[]).reduce((acc, type) => {
                acc[type] = (Object.keys(HealthZone) as HealthZone[]).reduce((acc, healthZone) => {
                    acc[healthZone] = (month.students.value ?? []).filter(
                        (student) => student.healthZones[type] === healthZone
                    ).length
                    return acc
                }, {} as { [key in HealthZone]: number })
                return acc
            }, {} as { [key in ConclusionType]?: { [key in HealthZone]: number } })
        }))
    )

    return {
        monthlyData,
        monthlyCount,

        selectedStartDate,
        selectedEndDate,

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
