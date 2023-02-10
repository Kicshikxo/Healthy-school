import { defineStore } from 'pinia'
import { MedicalHealthOption, MedicalType, SelectionType } from '@prisma/client'

export const useMedicalHealthStore = defineStore('medical', () => {
    const { data: optionsWithRecommendations } = useFetch('/api/students/health/medical/options/with-recommendations')
    const options = computed(() => optionsWithRecommendations.value?.map((option) => useOmit(option, 'recommendations')))

    const typedOptions = computed(() =>
        (options.value ?? []).reduce((acc, option) => {
            acc[option.medicalType] = (acc[option.medicalType] ?? []).concat(option)
            return acc
        }, {} as { [key in MedicalType]: MedicalHealthOption[] })
    )

    const selectionTypes = computed(() =>
        (Object.keys(SelectionType) as SelectionType[]).reduce((acc, type) => {
            acc[type] = [
                ...new Set(
                    (options.value ?? []).filter((option) => option.selectionType === type).map((option) => option.medicalType)
                )
            ]
            return acc
        }, {} as { [key in SelectionType]: MedicalType[] })
    )

    const typeTitles: { [key in MedicalType]: string } = {
        HEALTH_GROUP: 'Группа здоровья',
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

    return { options, optionsWithRecommendations, typedOptions, selectionTypes, typeTitles }
})
