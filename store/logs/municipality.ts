import { ConclusionType, HealthZone, Municipality } from '@prisma/client'
import { defineStore } from 'pinia'

export const useMunicipalityLogsStore = defineStore('municipalityLogs', () => {
    const selectedStartDate = ref<Date>(new Date())
    const selectedEndDate = ref<Date>(new Date())

    const selectedMunicipality = ref<
        Municipality & { _count: { organizations: number }; organizations: { classes: { _count: { students: number } }[] }[] }
    >()
    const selectedMunicipalityId = computed(() => selectedMunicipality.value?.id)

    const { data: municipalities, pending: loadingMunicipalities } = useFetch('/api/municipalities/list')

    const monthlyData = computed(() => {
        return [
            ...Array(
                selectedEndDate.value.getMonth() -
                    selectedStartDate.value.getMonth() +
                    12 * (selectedEndDate.value.getFullYear() - selectedStartDate.value.getFullYear()) +
                    1
            ).keys()
        ]
            .map((index) => {
                const endDate = new Date(selectedEndDate.value.getFullYear(), selectedEndDate.value.getMonth() - index + 1, 1)
                return {
                    date: endDate,
                    students: selectedMunicipalityId.value
                        ? useFetch('/api/students/logs/list', {
                              headers: useRequestHeaders() as HeadersInit,
                              query: {
                                  municipalityId: selectedMunicipalityId.value,
                                  endDate: endDate.toJSON()
                              }
                          }).data
                        : ref(null)
                }
            })
            .reverse()
    })

    watchEffect(() => monthlyData.value) // Лютый костыль для графика

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
        }
    }
})
