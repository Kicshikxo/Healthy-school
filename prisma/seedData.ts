import { Role, HealthZone, HealthGroup } from '@prisma/client'

export const municipality: { name: string } = {
    name: 'Курский район'
}

export const educationalOrganization: { name: string } = {
    name: 'СОШ с углубленным изучением предметов художественно-эстетического цикла № 27 имени А. А. Дейнеки'
}

export const usersData: { username: string; password: string; role: Role }[] = [
    {
        username: 'admin',
        password: 'test',
        role: Role.OPERATOR
    },
    {
        username: 'class',
        password: 'test',
        role: Role.CLASS_TEACHER
    },
    {
        username: 'health',
        password: 'test',
        role: Role.HEALTH_WORKER
    },
    {
        username: 'social',
        password: 'test',
        role: Role.SOCIAL_PEDAGOGUE
    },
    {
        username: 'phys',
        password: 'test',
        role: Role.PHYSICAL_EDUCATION_TEACHER
    },
    {
        username: 'ped',
        password: 'test',
        role: Role.PEDAGOGUE
    }
]

export const physicalHealthRecommendations: { title: string; healthGroup: HealthGroup }[] = [
    {
        title: 'выполнение программы физического воспитания с ограничениями по рекомендации врача',
        healthGroup: HealthGroup.PREPARATORY
    },
    {
        title: 'сдача индивидуальных нормативов и участие в массовых физкультурных мероприятиях при наличии медицинского заключения по результатам дополнительного осмотра',
        healthGroup: HealthGroup.PREPARATORY
    },
    { title: 'не допущение к занятиям спортом и участию в соревнованиях', healthGroup: HealthGroup.PREPARATORY },
    {
        title: 'проведение дополнительных занятий для повышения общей физической подготовки',
        healthGroup: HealthGroup.PREPARATORY
    },

    {
        title: 'обучение умению и навыкам элементов ЗОЖ',
        healthGroup: HealthGroup.SPECIAL
    },
    {
        title: 'осуществление самоконтроля здоровья и функциональных возможностей',
        healthGroup: HealthGroup.SPECIAL
    },
    {
        title: 'организация физкультурных занятий по особой программе, снижение нормативов, строгое дозирование физической нагрузки',
        healthGroup: HealthGroup.SPECIAL
    },
    {
        title: 'включение лечебной физкультуры в программу занятий',
        healthGroup: HealthGroup.SPECIAL
    },
    {
        title: 'широкое использование дыхательных, корригирующих и общеразвивающих упражнений',
        healthGroup: HealthGroup.SPECIAL
    },
    {
        title: 'проявление повышенной осторожности при использовании физических упражнений',
        healthGroup: HealthGroup.SPECIAL
    },
    {
        title: 'исключение физических упражнений, противопоказанных по состоянию здоровья',
        healthGroup: HealthGroup.SPECIAL
    },
    {
        title: 'включение в занятия подвижных игр умеренной интенсивности',
        healthGroup: HealthGroup.SPECIAL
    }
]

export const socialHealthIndicators: { title: string; healthZone: HealthZone }[] = [
    {
        title: 'Ребенок из семьи с низким уровнем дохода',
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'Ребенок из семьи переселенцев, беженцев',
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'Ребенок из семьи участника СВО',
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'Ребенок из семьи родителей-инвалидов',
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'Ребенок из семьи с одним родителем',
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'Обучающийся является ребенком-инвалидом',
        healthZone: HealthZone.RED
    },
    {
        title: 'Обучающийся с ОВЗ',
        healthZone: HealthZone.RED
    },
    {
        title: 'Обучающийся с отклоняющимся поведением',
        healthZone: HealthZone.RED
    },
    {
        title: 'Увлечение видеоиграми',
        healthZone: HealthZone.RED
    },
    {
        title: 'Несовершеннолетний состоит на профилактическом учете (КДН, ПДН, ОШУ)',
        healthZone: HealthZone.RED
    },
    {
        title: 'Вредные привычки у обучающегося (курение, алкоголь, ПАВ)',
        healthZone: HealthZone.RED
    },
    {
        title: 'Ребенок из семьи бывших воспитанников школ-интернатов',
        healthZone: HealthZone.RED
    },
    {
        title: 'Ребенок сирота, оставшийся без попечения родителей',
        healthZone: HealthZone.RED
    },
    {
        title: 'Ребенок из семьи, состоящей на учете в органах опеки',
        healthZone: HealthZone.RED
    },
    {
        title: 'Ребенок из семьи, находящейся в социально-опасном положении',
        healthZone: HealthZone.RED
    },
    {
        title: 'Наркотическая, алкогольная зависимость у членов семьи',
        healthZone: HealthZone.RED
    },
    {
        title: 'Конфликтные отношения между родителями',
        healthZone: HealthZone.RED
    },
    {
        title: 'Конфликтные отношения между родителями и ребёнком',
        healthZone: HealthZone.RED
    },
    {
        title: 'Физические наказания, факты насилия, жестокого обращения в семье',
        healthZone: HealthZone.RED
    }
]

export const socialHealthRecommendations: { title: string; healthZone: HealthZone }[] = [
    {
        title: 'консультирование у специалистов по запросу',
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'формирование здорового образа жизни через проведение профилактических и просветительских мероприятий',
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'занятия с социальным педагогом',
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'социальная помощь',
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'юридическая консультация',
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'просветительские и профилактические занятия с педагогом-психологом',
        healthZone: HealthZone.YELLOW
    },

    {
        title: 'консультирование у специалистов по запросу',
        healthZone: HealthZone.RED
    },
    {
        title: 'формирование здорового образа жизни через проведение профилактических и просветительских мероприятий',
        healthZone: HealthZone.RED
    },
    {
        title: 'социальная помощь',
        healthZone: HealthZone.RED
    },
    {
        title: 'юридическая консультация',
        healthZone: HealthZone.RED
    },
    {
        title: 'просветительские и профилактические занятия с педагогом-психологом',
        healthZone: HealthZone.RED
    },
    {
        title: 'контроль и консультирование семьи несовершеннолетнего и обучающегося',
        healthZone: HealthZone.RED
    },
    {
        title: 'организация межведомственного взаимодействия по сопровождению обучающегося со всеми заинтересованными структурами',
        healthZone: HealthZone.RED
    },
    {
        title: 'проведение индивидуальных занятий с обучающимся с социальным педагогом и педагогом-психологом',
        healthZone: HealthZone.RED
    },
    {
        title: 'проведение мониторингов социальной работы в образовательной организации',
        healthZone: HealthZone.RED
    },
    {
        title: 'организация рейдов в семью совместно с органами опеки, КДН, ПДН',
        healthZone: HealthZone.RED
    },
    {
        title: 'междисциплинарное взаимодействие с педагогами образовательной организации',
        healthZone: HealthZone.RED
    },
    {
        title: 'совестная профилактическая и просветительская деятельность с центром сопровождения несовершеннолетних (для семьи – бывших воспитанников школы-интерната)',
        healthZone: HealthZone.RED
    },
    {
        title: 'проведение мероприятий совместно с медицинскими организациями по профилактике нарко- и алкозависимости',
        healthZone: HealthZone.RED
    },
    {
        title: 'проведение мероприятий совместно с УМВД по профилактике насилия и жестокости',
        healthZone: HealthZone.RED
    }
]
