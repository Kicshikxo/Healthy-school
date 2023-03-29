import { PedagogueHealthOption, PedagogueTab, PedagogueType } from '@prisma/client'
import { defineStore } from 'pinia'

export const usePedagogueHealthStore = defineStore('pedagogue', () => {
    const { data: optionsWithRecommendations } = useFetch('/api/students/health/pedagogue/options/with-recommendations')
    const options = computed(() => optionsWithRecommendations.value?.map((option) => useOmit(option, 'recommendations')))

    const typedOptions = computed(() =>
        (options.value ?? []).reduce((acc, option) => {
            acc[option.pedagogueType] = (acc[option.pedagogueType] ?? []).concat(option)
            return acc
        }, {} as { [key in PedagogueType]: PedagogueHealthOption[] })
    )

    const tabTypes = computed(() =>
        (Object.keys(PedagogueTab) as PedagogueTab[]).reduce((acc, tab) => {
            acc[tab] = [
                ...new Set(
                    (options.value ?? []).filter((option) => option.pedagogueTab === tab).map((option) => option.pedagogueType)
                )
            ]
            return acc
        }, {} as { [key in PedagogueTab]: PedagogueType[] })
    )

    const typeTitles: { [key in PedagogueType]: string } = {
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

    return { options, optionsWithRecommendations, typedOptions, tabTypes, typeTitles }
})
