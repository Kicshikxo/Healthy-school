import { defineStore } from 'pinia'
import { SocialHealthOption, SocialType } from '@prisma/client'

export const useSocialHealthStore = defineStore('social', () => {
    const { data: optionsWithRecommendations } = useFetch('/api/students/health/social/options/with-recommendations')
    const options = computed(() => optionsWithRecommendations.value?.map((option) => useOmit(option, 'recommendations')))

    const typedOptions = computed(() =>
        (options.value ?? []).reduce((acc, option) => {
            acc[option.socialType] = (acc[option.socialType] ?? []).concat(option)
            return acc
        }, {} as { [key in SocialType]: SocialHealthOption[] })
    )

    const typeTitles: { [key in SocialType]: string } = {
        HEALTH_LIMITATIONS: 'Обучающийся с ОВЗ, с инвалидностью',
        DEVIANT_BEHAVIOR: 'Обучающийся с отклоняющимся поведением',
        PREVENTIVE_ACCOUNTING: 'Несовершеннолетний состоит на профилактическом учете (КДН, ПДН, ВШУ)',
        BAD_HABITS:
            'Наличие вредных привычек у обучающегося (курение, алкоголь, ПАВ, компьютерная, игровая зависимость и другие)',
        ORPHAN: 'Ребенок-сирота (оставшийся без попечения родителей)',
        SOCIAL_RISK: 'Ребенок из семьи, находящейся в социально-опасном положении, состоящей на учете в органах опеки',
        ADDICTED_FAMILY: 'Наркотическая, алкогольная зависимость у членов семьи',
        DOMESTIC_ABUSE: 'Физические наказания, факты насилия, жестокого обращения в семье',
        REFUGEE: 'Ребенок из семьи переселенцев, беженцев',
        SWO_FAMILY: 'Ребенок из семьи участника СВО',
        LOW_INCOME: 'Ребенок из семьи с низким уровнем дохода',
        CONFLICTUAL_FAMILY_RELATIONS: 'Конфликтные отношения в семье'
    }

    return { options, optionsWithRecommendations, typedOptions, typeTitles }
})
