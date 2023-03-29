import { EducationType, PsychologicalHealthOption, PsychologicalType } from '@prisma/client'
import { defineStore } from 'pinia'

export const usePsychologicalHealthStore = defineStore('psychological', () => {
    const { data: optionsWithRecommendations } = useFetch('/api/students/health/psychological/options/with-recommendations')
    const options = computed(() => optionsWithRecommendations.value?.map((option) => useOmit(option, 'recommendations')))

    const typedOptions = computed(() =>
        (Object.keys(EducationType) as EducationType[]).reduce((acc, type) => {
            acc[type] = (options.value?.filter((option) => option.educationType === type) ?? []).reduce((acc, option) => {
                acc[option.psychologicalType] = (acc[option.psychologicalType] ?? []).concat(option)
                return acc
            }, {} as { [key in PsychologicalType]: PsychologicalHealthOption[] })
            return acc
        }, {} as { [key in EducationType]: { [key in PsychologicalType]: PsychologicalHealthOption[] } })
    )

    const educationTypes = computed(() =>
        (Object.keys(EducationType) as EducationType[]).reduce((acc, type) => {
            acc[type] = [
                ...new Set(
                    (options.value ?? [])
                        .filter((option) => option.educationType === type)
                        .map((option) => option.psychologicalType)
                )
            ]
            return acc
        }, {} as { [key in EducationType]: PsychologicalType[] })
    )

    const typeTitles: { [key in PsychologicalType]: string } = {
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

    return { options, optionsWithRecommendations, typedOptions, educationTypes, typeTitles }
})
