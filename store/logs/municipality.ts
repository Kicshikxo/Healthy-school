import { ConclusionType, HealthZone, Municipality } from '@prisma/client'
import { defineStore } from 'pinia'

export const useMunicipalityLogsStore = defineStore('municipalityLogs', () => {
    const selectedStartDate = ref<Date>(new Date())
    const selectedEndDate = ref<Date>(new Date())

    const selectedMunicipality = ref<
        Municipality & { _count: { organizations: number }; organizations: { classes: { _count: { students: number } }[] }[] }
    >()

    function getMonthlyData() {
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
                    students: useFetch('/api/students/logs/list', {
                        key: `${selectedMunicipality.value?.id}${endDate.toJSON()}`,
                        query: {
                            municipalityId: selectedMunicipality.value?.id,
                            endDate: endDate.toJSON()
                        }
                    }).data
                }
            })
            .reverse()
    }

    const monthlyData = ref(getMonthlyData())
    watch([selectedStartDate, selectedEndDate, selectedMunicipality], () => (monthlyData.value = ref(getMonthlyData()).value))

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
                    acc[healthZone] = (month.students ?? []).filter(
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

        selectedMunicipality
    }
})
