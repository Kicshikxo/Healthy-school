import { ConclusionType } from '@prisma/client'
import { defineStore } from 'pinia'

export const useConclusionsStore = defineStore('conclusions', () => {
    const { data: list } = useFetch('/api/conclusions/with-recommendations')

    const typeTitles: { [key in ConclusionType]: string } = {
        MEDICAL: 'Медицинский компонент',
        PEDAGOGUE: 'Педагогический компонент',
        SPEECH: 'Логопедический компонент',
        PHYSICAL: 'Физический компонент',
        PSYCHOLOGICAL: 'Психологический компонент',
        SOCIAL: 'Социальный компонент'
    }

    return { list: list, typeTitles }
})
