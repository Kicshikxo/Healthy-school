import { PhysicalType, PhysicalHealthOption, HealthGroup } from '@prisma/client'
import { defineStore } from 'pinia'

export const usePhysicalHealthStore = defineStore('physical', () => {
    const { data: optionsWithRecommendations } = useFetch('/api/students/health/physical/options/with-recommendations')
    const options = computed(() => optionsWithRecommendations.value?.map((option) => useOmit(option, 'recommendations')))

    const typedOptions = computed(() =>
        (options.value ?? []).reduce((acc, option) => {
            acc[option.physicalType] = (acc[option.physicalType] ?? []).concat(option)
            return acc
        }, {} as { [key in PhysicalType]: PhysicalHealthOption[] })
    )

    const healthGroupTypes = computed(() =>
        (Object.keys(HealthGroup) as HealthGroup[]).reduce((acc, group) => {
            acc[group] = [
                ...new Set(
                    (options.value ?? []).filter((option) => option.healthGroup === group).map((option) => option.physicalType)
                )
            ]
            return acc
        }, {} as { [key in HealthGroup]: PhysicalType[] })
    )

    const typeTitles: { [key in PhysicalType]: string } = {
        FUNCTIONAL_INDICATORS: 'Функциональные показатели',
        PHYSICAL_DEVELOPMENT: 'Физическое развитие',
        PHYSICAL_TRAINING: 'Физическая подготовка'
    }

    return { options, optionsWithRecommendations, typedOptions, healthGroupTypes, typeTitles }
})
