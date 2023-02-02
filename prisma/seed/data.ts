import {
    Role,
    HealthZone,
    HealthGroup,
    MedicalType,
    PedagogueTab,
    PedagogueType,
    EducationType,
    PsychologicalType,
    ConclusionType,
    SelectionType,
    ConclusionRecommendation
} from '@prisma/client'

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
    },
    {
        username: 'psycho',
        password: 'test',
        role: Role.PSYCHOLOGIST
    }
]

export const physicalHealthRecommendations: { title: string; healthZone: HealthZone; healthGroup: HealthGroup }[] = [
    {
        title: 'выполнение программы физического воспитания с ограничениями по рекомендации врача',
        healthZone: HealthZone.YELLOW,
        healthGroup: HealthGroup.PREPARATORY
    },
    {
        title: 'сдача индивидуальных нормативов и участие в массовых физкультурных мероприятиях при наличии медицинского заключения по результатам дополнительного осмотра',
        healthZone: HealthZone.YELLOW,
        healthGroup: HealthGroup.PREPARATORY
    },
    {
        title: 'не допущение к занятиям спортом и участию в соревнованиях',
        healthZone: HealthZone.YELLOW,
        healthGroup: HealthGroup.PREPARATORY
    },
    {
        title: 'проведение дополнительных занятий для повышения общей физической подготовки',
        healthZone: HealthZone.YELLOW,
        healthGroup: HealthGroup.PREPARATORY
    },

    {
        title: 'обучение умению и навыкам элементов ЗОЖ',
        healthZone: HealthZone.RED,
        healthGroup: HealthGroup.SPECIAL
    },
    {
        title: 'осуществление самоконтроля здоровья и функциональных возможностей',
        healthZone: HealthZone.RED,
        healthGroup: HealthGroup.SPECIAL
    },
    {
        title: 'организация физкультурных занятий по особой программе, снижение нормативов, строгое дозирование физической нагрузки',
        healthZone: HealthZone.RED,
        healthGroup: HealthGroup.SPECIAL
    },
    {
        title: 'включение лечебной физкультуры в программу занятий',
        healthZone: HealthZone.RED,
        healthGroup: HealthGroup.SPECIAL
    },
    {
        title: 'широкое использование дыхательных, корригирующих и общеразвивающих упражнений',
        healthZone: HealthZone.RED,
        healthGroup: HealthGroup.SPECIAL
    },
    {
        title: 'проявление повышенной осторожности при использовании физических упражнений',
        healthZone: HealthZone.RED,
        healthGroup: HealthGroup.SPECIAL
    },
    {
        title: 'исключение физических упражнений, противопоказанных по состоянию здоровья',
        healthZone: HealthZone.RED,
        healthGroup: HealthGroup.SPECIAL
    },
    {
        title: 'включение в занятия подвижных игр умеренной интенсивности',
        healthZone: HealthZone.RED,
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

export const medicalHealthOptions: {
    title: string
    medicalType: MedicalType
    healthZone: HealthZone
    selectionType: SelectionType
    recommendations?: {
        title: string
    }[]
}[] = [
    {
        title: '1-ая',
        medicalType: MedicalType.HEALTH_GROUP,
        healthZone: HealthZone.GREEN,
        selectionType: SelectionType.SINGLE
    },
    {
        title: '2-ая',
        medicalType: MedicalType.HEALTH_GROUP,
        healthZone: HealthZone.YELLOW,
        selectionType: SelectionType.SINGLE
    },
    {
        title: '3-я',
        medicalType: MedicalType.HEALTH_GROUP,
        healthZone: HealthZone.RED,
        selectionType: SelectionType.SINGLE
    },
    {
        title: '4-ая',
        medicalType: MedicalType.HEALTH_GROUP,
        healthZone: HealthZone.RED,
        selectionType: SelectionType.SINGLE
    },
    {
        title: '5-ая',
        medicalType: MedicalType.HEALTH_GROUP,
        healthZone: HealthZone.RED,
        selectionType: SelectionType.SINGLE
    },

    {
        title: 'Нет',
        medicalType: MedicalType.DISABILITY,
        healthZone: HealthZone.GREEN,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Да',
        medicalType: MedicalType.DISABILITY,
        healthZone: HealthZone.RED,
        selectionType: SelectionType.SINGLE
    },

    {
        title: 'Не болеет',
        medicalType: MedicalType.MORBIDITY,
        healthZone: HealthZone.GREEN,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Болеет (2-4 раза/год)',
        medicalType: MedicalType.MORBIDITY,
        healthZone: HealthZone.YELLOW,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Болеет (более 4 раз/год)',
        medicalType: MedicalType.MORBIDITY,
        healthZone: HealthZone.RED,
        selectionType: SelectionType.SINGLE
    },

    {
        title: 'Регулярно',
        medicalType: MedicalType.BALANCED_DIET,
        healthZone: HealthZone.GREEN,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Не регулярно',
        medicalType: MedicalType.BALANCED_DIET,
        healthZone: HealthZone.YELLOW,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Нет',
        medicalType: MedicalType.BALANCED_DIET,
        healthZone: HealthZone.RED,
        selectionType: SelectionType.SINGLE
    },

    {
        title: 'Нет',
        medicalType: MedicalType.CHRONIC_DISEASES,
        healthZone: HealthZone.GREEN,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Проблемная наследственность, риск заболеваний',
        medicalType: MedicalType.CHRONIC_DISEASES,
        healthZone: HealthZone.YELLOW,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Да',
        medicalType: MedicalType.CHRONIC_DISEASES,
        healthZone: HealthZone.RED,
        selectionType: SelectionType.SINGLE
    },

    {
        title: 'Зрение',
        medicalType: MedicalType.VISION,
        healthZone: HealthZone.YELLOW,
        selectionType: SelectionType.CHECKBOX,
        recommendations: [
            {
                title: 'Общие офтальмо-гигиенические мероприятия'
            },
            {
                title: 'Очковая или контактная коррекция зрения'
            },
            {
                title: 'Курсы плеоптики и ортоптики по показаниям'
            }
        ]
    },
    {
        title: 'Слух',
        medicalType: MedicalType.HEARING,
        healthZone: HealthZone.YELLOW,
        selectionType: SelectionType.CHECKBOX,
        recommendations: [
            {
                title: 'Физиофункциональное лечение'
            },
            {
                title: 'Консультация аллерголога'
            }
        ]
    },
    {
        title: 'Ортопедия',
        medicalType: MedicalType.ORTHOPEDIA,
        healthZone: HealthZone.YELLOW,
        selectionType: SelectionType.CHECKBOX,
        recommendations: [
            {
                title: 'Профилактика остеохондроза, спинальной нестабильности (нарушений осанки)'
            }
        ]
    },
    {
        title: 'ЖКТ',
        medicalType: MedicalType.GASTROINTESTINAL,
        healthZone: HealthZone.YELLOW,
        selectionType: SelectionType.CHECKBOX,
        recommendations: [
            {
                title: 'Соблюдение индивидуальной диеты'
            },
            {
                title: 'Организация режима сбалансированного питания'
            }
        ]
    },
    {
        title: 'Неврология, психиатрия',
        medicalType: MedicalType.NEUROLOGY_PSYCHIATRY,
        healthZone: HealthZone.YELLOW,
        selectionType: SelectionType.CHECKBOX,
        recommendations: [
            {
                title: 'Регулярный прием витаминов и ноотропов'
            },
            {
                title: 'Профилактика  артериальной гипо- и гипертензии, нарушений сна, других форм неврозов'
            },
            {
                title: 'Физиофункциональное лечение вегетососудистой дистонии, неврозов  (ЛФК, массаж, электрофорез, электросон, лазер, магнит и др.)'
            }
        ]
    },
    {
        title: 'Зрение',
        medicalType: MedicalType.VISION,
        healthZone: HealthZone.RED,
        selectionType: SelectionType.CHECKBOX,
        recommendations: [
            {
                title: 'Диспансерное наблюдение врача-офтальмолога'
            },
            {
                title: 'Офтальмо-гигиенические мероприятия'
            },
            {
                title: 'Очковая или контактная коррекция'
            },
            {
                title: 'Курсы плеоптики и ортоптики'
            },
            {
                title: 'Курсы нейротрофической терапии'
            },
            {
                title: 'Использование тифлоприборов'
            },
            {
                title: 'Организация специального рабочего места обучающегося с патологией органов зрения'
            },
            {
                title: 'Обучение на основе применения рельефно-точечной системы обозначений Брайля'
            }
        ]
    },
    {
        title: 'Слух',
        medicalType: MedicalType.HEARING,
        healthZone: HealthZone.RED,
        selectionType: SelectionType.CHECKBOX,
        recommendations: [
            {
                title: 'Диспансерное наблюдение врача-оториноларинголога'
            },
            {
                title: 'Физиофункциональное лечение'
            },
            {
                title: 'Консультация аллерголога'
            },
            {
                title: 'Консультация сурдолога'
            },
            {
                title: 'Организация специального рабочего места обучающегося с патологией органов слуха'
            },
            {
                title: 'Контроль за ношением слуховых аппаратов'
            },
            {
                title: 'Занятия с сурдопедагогом'
            }
        ]
    },
    {
        title: 'Ортопедия',
        medicalType: MedicalType.ORTHOPEDIA,
        healthZone: HealthZone.RED,
        selectionType: SelectionType.CHECKBOX,
        recommendations: [
            {
                title: 'Диспансерное наблюдение врача-ортопеда'
            },
            {
                title: 'Занятия адаптивной (лечебной) физкультурой'
            },
            {
                title: 'Специальная физкультурная группа'
            },
            {
                title: 'Физиофункциональное лечение'
            },
            {
                title: 'Соблюдение статодинамического режима (чередование обучения и отдыха)'
            },
            {
                title: 'Ограничение физических нагрузок'
            },
            {
                title: 'Коррегирующее амбулаторное/ стационарное лечение'
            },
            {
                title: 'Организация специального рабочего места обучающегося с патологией опорно-двигательного аппарата'
            }
        ]
    },
    {
        title: 'ЖКТ',
        medicalType: MedicalType.GASTROINTESTINAL,
        healthZone: HealthZone.RED,
        selectionType: SelectionType.CHECKBOX,
        recommendations: [
            {
                title: 'Обеспечение полноценного и сбалансированного питания'
            },
            {
                title: 'Соблюдение диеты (№ 1, 3, 4, 5, 15), дробного питания (5-6 раз в сутки)'
            },
            {
                title: 'Соблюдение санитарно-гигиенического режима/дефекации'
            },
            {
                title: 'Освобождение от занятий физической культурой на период обострения'
            },
            {
                title: 'Подготовительная физкультурная группа (в период ремиссии)'
            },
            {
                title: 'Специальная физкультурная группа (в период реконвалесценции)'
            },
            {
                title: 'Основная физкультурная группа (в период стойкой ремиссии)'
            },
            {
                title: 'Ограничение физической нагрузки (исключение глубоких наклонов'
            },
            {
                title: 'Длительного пребывания в согнутом положении'
            },
            {
                title: 'Поднятия руками тяжестей более 8-10 кг на обе руки'
            },
            {
                title: 'Физических упражнений связанных с перенапряжением мышц брюшного пресса)'
            },
            {
                title: 'Специальная организация сна с приподнятым головным концом кровати (не менее чем на 15 см)'
            }
        ]
    },
    {
        title: 'Неврология, психиатрия',
        medicalType: MedicalType.NEUROLOGY_PSYCHIATRY,
        healthZone: HealthZone.RED,
        selectionType: SelectionType.CHECKBOX,
        recommendations: [
            {
                title: 'Диспансерное наблюдение врача-невролога'
            },
            {
                title: 'Диспансерное наблюдение врача-психиатра'
            },
            {
                title: 'Амбулаторное и стационарное обследование и медикаментозное лечение'
            },
            {
                title: 'Прием ноотропов и витаминов'
            },
            {
                title: 'Своевременное проведение реабилитационных и абилитационных процедур (ЛФК, массаж, физиотерапевтическое лечение)'
            },
            {
                title: 'Организация режима правильных физических нагрузок (занятия физкультурой в спецгруппе)'
            },
            {
                title: 'Индивидуальный режим организации учебной нагрузки'
            },
            {
                title: 'Дозированный режим труда и отдыха'
            },
            {
                title: 'Сопровождение профильными специалистами'
            }
        ]
    }
]

export const pedagogueHealthOptions: {
    title: string
    healthZone: HealthZone
    pedagogueTab: PedagogueTab
    pedagogueType: PedagogueType
    recommendations?: {
        title: string
    }[]
}[] = [
    {
        title: 'Понимает',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.UNDERSTANDING_INSTRUCTIONS
    },
    {
        title: 'Частично понимает',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.UNDERSTANDING_INSTRUCTIONS,
        recommendations: [
            {
                title: 'Краткость, четкость инструкций, подкрепление изучаемого материала наглядной опорой, алгоритмом действий'
            },
            {
                title: 'Выполнение родителями домашних заданий использование наглядной опоры и алгоритма выполнения задания'
            }
        ]
    },
    {
        title: 'Не понимает',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.UNDERSTANDING_INSTRUCTIONS,
        recommendations: [
            {
                title: 'Организация коррекционно-развивающей работы, направленной на развитие понимания обращенной речи, обогащение и расширение словарного запаса'
            },
            {
                title: 'Упрощение формулировок, дробление инструкции, разделение заданий на части'
            },
            {
                title: 'При выполнении домашних заданий родителям использовать пошаговый разбор, наглядную опору и алгоритм выполнения заданий'
            }
        ]
    },

    {
        title: 'Освоено',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.MASTERING_EDUCATION
    },
    {
        title: 'Освоено не в полном объёме',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.MASTERING_EDUCATION,
        recommendations: [
            {
                title: 'Проведение диагностики специалистами ППк'
            },
            {
                title: 'Организация дополнительных занятий по устранению пробелов в знаниях'
            },
            {
                title: 'Отработка родителями учебного материала, изученного на уроках, контроль за выполнением домашних заданий'
            }
        ]
    },
    {
        title: 'Не освоено',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.MASTERING_EDUCATION,
        recommendations: [
            {
                title: 'Проведение диагностических процедур с целью определения актуального уровня развития обучающегося'
            },
            {
                title: 'Определение актуального уровня освоения материала для выдачи рекомендаций о повторном обучении, либо обучении по АООП'
            },
            {
                title: 'Представление ребенка на ПМПК'
            }
        ]
    },

    {
        title: 'Высокий',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.WORK_PACE
    },
    {
        title: 'Средний',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.WORK_PACE,
        recommendations: [
            {
                title: 'Проведение педагогом-психологом диагностики по определению типа темперамента (по согласованию)'
            },
            {
                title: 'Учет темпераментальных особенностей во время работы на уроке'
            },
            {
                title: 'Выполнение родителями рекомендаций педагога-психолога'
            }
        ]
    },
    {
        title: 'Низкий',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.WORK_PACE,
        recommendations: [
            {
                title: 'Проведение педагогом-психологом диагностики по определению типа темперамента (по согласованию)'
            },
            {
                title: 'Учет психофизических особенностей обучающегося во время работы на уроке'
            },
            {
                title: 'Упрощение объёма и сложности учебного материала'
            },
            {
                title: 'Выпонение родителями рекомендаций педагога-психолога'
            }
        ]
    },

    {
        title: 'Действует самостоятельно',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.ACTIVITY_SPECIFICS
    },
    {
        title: 'Действует с незначительной помощью',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.ACTIVITY_SPECIFICS,
        recommendations: [
            {
                title: 'Создание и использование средств (инструментов), помогающих обучающемуся самостоятельно организовать собственную деятельность'
            },
            {
                title: 'Повышение родителями самостоятельности ребенка не только во время выполнения домашних заданий, но и в повседневной жизни'
            },
            {
                title: 'Снижение уровня опеки'
            }
        ]
    },
    {
        title: 'Действует с существенной помощью',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.ACTIVITY_SPECIFICS,
        recommendations: [
            {
                title: 'Постепенный переход от обучающей помощи к направляющей и стимулирующей'
            },
            {
                title: 'Повышение родителями самостоятельности ребенка не только во время выполнения домашних заданий, но и в повседневной жизни'
            },
            {
                title: 'Снижение уровня опеки'
            }
        ]
    },

    {
        title: 'Высокая',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.WORKABILITY
    },
    {
        title: 'Средняя',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.WORKABILITY,
        recommendations: [
            {
                title: 'Учет динамики работоспособности, цикличности интеллектуальной деятельности (в начале дня, начале занятий)'
            },
            {
                title: 'Регулирование образовательной нагрузки'
            },
            {
                title: 'Стимулирование родителями работоспособности ребенка через использование поощрений и четкое соблюдение режима дня'
            }
        ]
    },
    {
        title: 'Низкая',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.WORKABILITY,
        recommendations: [
            {
                title: 'Учёт индивидуального характера работоспособности в течение урока'
            },
            {
                title: 'Стимулирование родителями работоспособности ребенка через использование поощрений и четкое соблюдение режима дня'
            }
        ]
    },

    {
        title: 'Нет',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.HEALTH_LIMITATIONS
    },
    {
        title: 'Да, рекомендации реализуются',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.HEALTH_LIMITATIONS,
        recommendations: [
            {
                title: 'Создание специальных условий для получения образования'
            },
            {
                title: 'Создание инклюзивной образовательной среды'
            },
            {
                title: 'Сопровождение специалистами ППк'
            },
            {
                title: 'Организация индивидуальных коррекционно-развивающих занятий в соответствии с АООП'
            },
            {
                title: 'Консультирование родителей и педагогов по вопросам реализации АООП'
            },
            {
                title: 'Повторное представление на ПМПК по истечению сроков действия заключения или при переходе на другой уровень образования'
            }
        ]
    },
    {
        title: 'Да, рекомендации не реализуются',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.HEALTH_LIMITATIONS,
        recommendations: [
            {
                title: 'Создание специальных условий для получения образования'
            },
            {
                title: 'Создание инклюзивной образовательной среды'
            },
            {
                title: 'Сопровождение специалистами ППк'
            },
            {
                title: 'Организация индивидуальных коррекционно-развивающих занятий в соответствии с АООП'
            },
            {
                title: 'Консультирование родителей и педагогов по вопросам необходимости реализации АООП'
            },
            {
                title: 'Повторное представление на ПМПК по истечению сроков действия заключения или при переходе на другой уровень образования'
            }
        ]
    },

    {
        title: 'Нет',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.DISABILITY
    },
    {
        title: 'Да, мероприятия реализуются',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.DISABILITY,
        recommendations: [
            {
                title: 'Разработка мероприятий по реализации ИПРА в части психолого-педагогической реабилитации и абилитации ребенка-инвалида'
            },
            {
                title: 'Создание специальных условий для получения образования'
            },
            {
                title: 'Сопровождение специалистами ППк'
            },
            {
                title: 'Организация индивидуальных коррекционно-развивающих занятий (при необходимости)'
            },
            {
                title: 'Консультирование родителей и педагогов по вопросам реализации ИПРА в части психолого-педагогической реабилитации и абилитации ребенка-инвалида'
            },
            {
                title: 'Представление на ПМПК'
            }
        ]
    },
    {
        title: 'Да, мероприятия не реализуются',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.DISABILITY,
        recommendations: [
            {
                title: 'Разработка мероприятий по реализации ИПРА в части психолого-педагогической реабилитации и абилитации ребенка-инвалида'
            },
            {
                title: 'Создание специальных условий для получения образования'
            },
            {
                title: 'Сопровождение специалистами ППк'
            },
            {
                title: 'Организация индивидуальных коррекционно-развивающих занятий (при необходимости)'
            },
            {
                title: 'Консультирование родителей и педагогов по вопросам реализации ИПРА в части психолого-педагогической реабилитации и абилитации ребенка-инвалида'
            },
            {
                title: 'Представление на ПМПК'
            }
        ]
    },

    {
        title: 'Отсутствуют',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.VOICE_DISORDERS
    },
    {
        title: 'Незначительные нарушения',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.VOICE_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование оториноларинголога'
            },
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Профилактика нарушений голоса'
            },
            {
                title: 'Обучение навыкам диафрагмального дыхания и мягкой атаки голосоподачи'
            },
            {
                title: 'Соблюдение голосового режима'
            },
            {
                title: 'Исключение перенапряжения голосовых связок'
            },
            {
                title: 'Консультирование родителей и педагогов по вопросам профилактики нарушений голоса'
            }
        ]
    },
    {
        title: 'Ринофония',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.VOICE_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Наблюдение оториноларинголога'
            },
            {
                title: 'Консультирование психолога'
            },
            {
                title: 'Занятия лечебной физической культурой'
            },
            {
                title: 'Активизации и координация голосового аппарата в процессе коррекционно-логопедического воздействия'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },
    {
        title: 'Дисфония',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.VOICE_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Наблюдение оториноларинголога'
            },
            {
                title: 'Консультирование психолога'
            },
            {
                title: 'Занятия лечебной физической культурой'
            },
            {
                title: 'Активизации и координация голосового аппарата в процессе коррекционно-логопедического воздействия'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },
    {
        title: 'Афония',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.VOICE_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Наблюдение оториноларинголога'
            },
            {
                title: 'Консультирование психолога'
            },
            {
                title: 'Занятия лечебной физической культурой'
            },
            {
                title: 'Активизации и координация голосового аппарата в процессе коррекционно-логопедического воздействия'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },

    {
        title: 'Отсутствуют',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.TEMPO_RHYTHMIC_DISORDERS
    },
    {
        title: 'Незначительные нарушения',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.TEMPO_RHYTHMIC_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Профилактика нарушений темпа и ритма речи'
            },
            {
                title: 'Строгое соблюдение режима дня'
            },
            {
                title: 'Воспитание ритмически упорядоченной речи'
            },
            {
                title: 'Развитие слухового внимания'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },
    {
        title: 'Заикание',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.TEMPO_RHYTHMIC_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Консультирование психолога'
            },
            {
                title: 'Проведение логопедической коррекции, направленной на развитие моторики (координации и ритмизации движений, развитие мелкой артикуляционной моторики), речевого дыхания, навыков саморегуляции мышечного тонуса и эмоционального состояния'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },
    {
        title: 'Брадилалия',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.TEMPO_RHYTHMIC_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Проведение логопедической коррекции, направленной на развитие более быстрых и четких речевых движений в процессе речи, убыстренных речевых реакций, темпа внутренней речи, темпов письма и чтения, выразительных форм сценического чтения и драматизированной речи, правильной просодической стороны речи: темпа, ритма, мелодики, паузации, ударения'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },
    {
        title: 'Тахилалия',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.TEMPO_RHYTHMIC_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Консультирование психолога'
            },
            {
                title: 'Проведение логопедической коррекции, направленной на развитие медленного, спокойного, плавного, строго ритмичного дыхания и голосообразования, медленного ритмического чтения, спокойной, ритмически упорядоченной речи, здоровой установки на коллектив в процессе речевого и общего поведения, общего и слухового внимания к речи'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },

    {
        title: 'Отсутствуют',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.SPELLING_DISORDERS
    },
    {
        title: 'Мономорфная дислалия (ФН, ФФН, ОНР (III уровень речевого развития), НВОНР)',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.SPELLING_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Коррекционно-логопедическая работа над постановкой, автоматизацией, дифференциацией и введением нарушенного звука в самостоятельную речь обучающегося'
            },
            {
                title: 'Профилактика/устранение нарушений чтения и письма'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },
    {
        title: 'Полиморфная дислалия (ОНР (II, III уровень речевого развития))',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.SPELLING_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Организация коррекционно-логопедической работы над постановкой, автоматизацией, дифференциацией и введением нарушенных звуков в самостоятельную речь обучающегося'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },

    {
        title: 'Отсутствуют',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.ANATOMO_PHYSIOLOGICAL_DEFECTS
    },
    {
        title: 'Нарушения, не влияющие на произносительную сторону речи',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.ANATOMO_PHYSIOLOGICAL_DEFECTS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Консультирование ортодонта'
            },
            {
                title: 'Проведение логопедической коррекции при наличии дефектов произносительной стороны речи'
            },
            {
                title: 'Профилактика/устранение нарушений чтения и письма'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },
    {
        title: 'Ринолалия различной формы и этиологии',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.ANATOMO_PHYSIOLOGICAL_DEFECTS,
        recommendations: [
            {
                title: 'Консультирование ортодонта'
            },
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Проведение логопедической коррекции, направленной на формирование правильной артикуляции, развитие всех компонентов просодики, формирование слухопроизносительной дифференциации'
            },
            {
                title: 'Профилактика/устранение нарушений чтения и письма'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },

    {
        title: 'Отсутствуют',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.INNERVATION_DISORDERS
    },
    {
        title: 'Стертая дизартрия',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.INNERVATION_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Проведение логопедической коррекции при наличии дефектов произносительной стороны речи'
            },
            {
                title: 'Проведение логопедического массажа'
            },
            {
                title: 'Профилактика/устранение нарушений чтения и письма'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },
    {
        title: 'Выраженные дизартрические проявления',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.INNERVATION_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'проведение логопедической коррекции дефектов произносительной стороны речи'
            },
            {
                title: 'Проведение логопедического массажа'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },

    {
        title: 'Отсутствуют',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.STRUCTURAL_SEMANTIC_DISORDERS
    },
    {
        title: 'Незначительные нарушения',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.STRUCTURAL_SEMANTIC_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Проведение логопедической коррекции всех компонентов речевой системы'
            },
            {
                title: 'Профилактика/устранение нарушений чтения и письма'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },
    {
        title: 'Афазия',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.STRUCTURAL_SEMANTIC_DISORDERS,
        recommendations: [
            {
                title: 'Наблюдение невролога'
            },
            {
                title: 'Организация коррекционно-восстановительной логопедической работы'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },

    {
        title: 'Отсутствуют',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.WRITING_DISORDERS
    },
    {
        title: 'Незначительные проявления',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.WRITING_DISORDERS,
        recommendations: [
            {
                title: 'Проведение логопедического обследования устной и письменной речи'
            },
            {
                title: 'Профилактика/устранение нарушений чтения и письма'
            }
        ]
    },
    {
        title: 'Дисграфия',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.WRITING_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Консультирование нейропсихолога'
            },
            {
                title: 'Консультирование учителя-дефектолога'
            },
            {
                title: 'Проведение логопедической коррекции нарушений письменной речи'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций коррекционной работы'
            }
        ]
    },
    {
        title: 'Дизорфография',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.WRITING_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Консультирование нейропсихолога'
            },
            {
                title: 'Консультирование учителя-дефектолога'
            },
            {
                title: 'Проведение логопедической коррекции нарушений письменной речи'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций коррекционной работы'
            }
        ]
    },

    {
        title: 'Отсутствуют',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.READING_DISORDERS
    },
    {
        title: 'Незначительные проявления',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.READING_DISORDERS,
        recommendations: [
            {
                title: 'Проведение логопедического обследования устной и письменной речи'
            },
            {
                title: 'Профилактика/устранение нарушений чтения и письма'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    },
    {
        title: 'Дислексия',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.READING_DISORDERS,
        recommendations: [
            {
                title: 'Консультирование невролога'
            },
            {
                title: 'Консультирование нейропсихолога'
            },
            {
                title: 'Консультирование учителя-дефектолога'
            },
            {
                title: 'Проведение логопедической коррекции нарушений устной речи'
            },
            {
                title: 'Взаимодействие учителя-логопеда с педагогами и родителями, разработка для них системы методических рекомендаций'
            }
        ]
    }
]

export const psychologicalHealthOptions: {
    title: string
    healthZone: HealthZone
    educationType: EducationType
    psychologicalType: PsychologicalType
    recommendations?: {
        title: string
    }[]
}[] = [
    {
        title: 'Высокая',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.MOTIVATION
    },
    {
        title: 'Внешняя',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.MOTIVATION,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Выявление основных причин недостаточности мотивации: психофизиологические, организационно-деятельностные, нарушение здоровья'
            },
            {
                title: 'Целенаправленное развитие качеств, лежащих в основе развития познавательных способностей (быстроты реакций, всех видов памяти, внимания, воображения), развитие любознательности'
            },
            {
                title: 'Использование педагогами приемов, повышающих учебную мотивацию (занимательность, необычное начало урока, музыкальные фрагменты, игры и соревнования с акцентом на достижения ребенка)'
            },
            {
                title: 'Формирование положительного эмоционального настроя через создание на уроке доброжелательной атмосферы доверия и сотрудничества, веры обучающегося в свои способности и возможности'
            },
            {
                title: 'Положительное подкрепление активной познавательной деятельности ребенка родителями'
            }
        ]
    },
    {
        title: 'Низкая',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.MOTIVATION,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Выявление основных причин низкой мотивации (несформированность «позиции ученика», отсутствие стойкого познавательного интереса, однообразие педагогических приёмов, стимулирующих познавательную активность или игнорирование возрастных особенностей восприятия информации, вызывающих у ребенка ощущение рутины, скуки)'
            },
            {
                title: 'Создание ситуации успеха через выполнение посильных заданий, изучение нового материала с опорой на старые знания'
            },
            {
                title: 'Проведение комплекса коррекционно-развивающих мероприятий с обучающимся, направленного на формирование мотивации учения, стимуляцию познавательной активности, поиск и актуализацию значимых мотивов, формирование связи между учебой в школе и своими интересами'
            },
            {
                title: 'Использование педагогами приемов, повышающих учебную мотивацию (занимательность, необычное начало урока, игровые и соревновательные формы с акцентом на достижения обучающегося)'
            },
            {
                title: 'Проведение консультаций информационно-рекомендательного характера с родителями, направленных на организацию совместной познавательной деятельности с ребенком, развитие его любознательности'
            }
        ]
    },

    {
        title: 'Адаптирован',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.ADAPTATION
    },
    {
        title: 'Требуется помощь',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.ADAPTATION,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Отработка навыков учебного сотрудничества с учителем и одноклассниками'
            },
            {
                title: 'Проведение индивидуальных и групповых консультаций информационно-рекомендательного плана с участниками образовательного процесса (детьми, родителями, педагогами)'
            },
            {
                title: 'Снятие напряжения у родителей, вызванного началом учебного процесса'
            }
        ]
    },
    {
        title: 'Дезадаптация',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.ADAPTATION,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Контроль динамики показателей обучающегося по результатам проведенной коррекционной работы, постоянный мониторинг уровня адаптации'
            },
            {
                title: 'Организация учебно-познавательной деятельности в соответствии с возрастными особенностями ребенка, чередование продуктивной учебной и другой деятельности, соблюдение щадящего режима школьных занятий с постепенным переходом к обычному распорядку'
            },
            {
                title: 'Соблюдение преемственности в методах и стилях педагогического общения всех специалистов образовательной организации по отношению к ребенку'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов на тему развития успешной самореализации школьника в различных видах деятельности (с учетом неадекватных механизмов приспособления к условиям обучения, индивидуально-психологических особенностей, темпа усвоения знаний, отношения к интеллектуальной деятельности, особенностей эмоций и волевой регуляции поведения)'
            },
            {
                title: 'формирование положительного отношения семьи к статусу «ученика», организация активного досуга во внеурочное время и соблюдение санитарно-гигиенических требований'
            }
        ]
    },

    {
        title: 'Лидер, предпочитаемый',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.SOCIOMETRY
    },
    {
        title: 'Принятый',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.SOCIOMETRY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Формирование навыков социальной компетентности, общения, поведения в конфликтных ситуациях'
            },
            {
                title: 'Обучение приемам анализа ситуаций общения'
            },
            {
                title: 'Проведение консультаций для родителей и педагогов, направленных на формирование у обучающегося эмпатии и толерантности'
            }
        ]
    },
    {
        title: 'Аутсайдер',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.SOCIOMETRY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Вовлечение «изолированного» ученика в интересную деятельность, способствующую повышению его социометрического статуса, использование разовых школьных поручений'
            },
            {
                title: 'Проведение индивидуальной профилактической работы с «отвергнутым» учеником'
            },
            {
                title: 'Контроль динамики показателей по результатам проведенной коррекционной работы'
            },
            {
                title: 'Проведение мероприятий, направленных на сплочение коллектива класса (совместные прогулки на природе, создание и осуществление социально значимого проекта, разработка и выполнение коллективного творческого дела), организация игр, классных часов о дружбе, взаимовыручке, коллективизме'
            },
            {
                title: 'Организация групповых видов деятельности с частой сменой состава микрогрупп, создание в классе единой системы традиций и ценностей'
            },
            {
                title: 'Организация работы по подгруппам (по принципу взаимопомощи и поддержки, мотивации на достижения)'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов с целью развития успешной самореализации школьника'
            },
            {
                title: 'Проведение просветительских бесед с родителями, направленных на вовлечение родителей «изолированного» ученика в разнообразную внешкольную деятельность (спортивные секции, кружки), где имеется возможность завоёвывать ребенку более устойчивый статус в новой структуре межличностных отношений'
            }
        ]
    },

    {
        title: 'Адекватная',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.SELF_ASSESSMENT
    },
    {
        title: 'Тенденция к заниженной/завышенной',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.SELF_ASSESSMENT,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение краткого курса психопрофилактического просвещения для специалистов, направленного на создание у обучающегося ситуации успеха в разных видах деятельности, влияющей на формирование здоровой самооценки и уровня притязаний'
            },
            {
                title: 'Индивидуальное консультирование родителей обучающегося по вопросам психопрофилактики инверсий в познавательной деятельности, влияющих на формирование самооценки в данный возрастной период'
            }
        ]
    },
    {
        title: 'Заниженная/завышенная',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.SELF_ASSESSMENT,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Учет особенностей обучающегося с заниженной самооценкой, который крайне чувствителен к ежедневной похвале, одобрению, положительным оценкам и отметкам, доверию учителя, оказанию направляющей и поддерживающей помощи'
            },
            {
                title: 'Обучение ребенка умению слушать окружающих, принимать альтернативную точку зрения, спокойно относиться к неудачам и проигрышам, уважать мнение других'
            },
            {
                title: 'Формирование у школьника умения анализировать свои переживания, поступки и находить им адекватное объяснение'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов с целью развития успешной самореализации обучающегося в различных видах деятельности'
            },
            {
                title: 'Организация индивидуальной работы с родителями по вопросам влияния типа воспитания ребенка в семье на его самооценку'
            }
        ]
    },

    {
        title: 'Нормальный уровень – менее 50%',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.ANXIETY
    },
    {
        title: 'Умеренный уровень – от 50% до 75%',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.ANXIETY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Развитие коммуникативных навыков у обучающегося, снятие эмоционального напряжения через участие во внеклассных мероприятиях'
            },
            {
                title: 'Проведение коррекционно-развивающих занятий, направленных на развитие умения анализировать свои переживания, установление их причин, обучение эффективным приёмам преодоления тревоги'
            },
            {
                title: 'Консультирование педагогов по вопросу сплочения детского коллектива'
            },
            {
                title: 'Консультирование и просвещение родителей по вопросу оказания помощи высокотревожному ребенку в процессе обучения'
            }
        ]
    },
    {
        title: 'Высокий уровень – от 75% или ее отсутствие',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.ANXIETY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Повышение самооценки обучающегося и развитие способности справляться с повышенной тревогой с помощью различных упражнений'
            },
            {
                title: 'Организация коррекционно-развивающих занятий, направленных на повышение самооценки, обучение саморегуляции в конкретных наиболее волнующих ситуациях, снятие мышечного напряжения'
            },
            {
                title: 'Оказание психологической поддержки со стороны педагогов'
            },
            {
                title: 'Избегание педагогами оценочных суждений, сравнения с результатами более успешных учеников, критики ребенка в присутствии других'
            },
            {
                title: 'Создание благоприятного психологического климата в семье, способствующего гармоничному развитию личности ребенка и снижению уровня его тревожности'
            }
        ]
    },

    {
        title: 'Отсутствует',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.AGGRESSIVITY
    },
    {
        title: 'Слабо выражена',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.AGGRESSIVITY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Диагностика асоциальных отклонений в поведении и осуществление дифференцированного подхода в выборе воспитательно-профилактических средств психолого-педагогической коррекции отклоняющегося поведения'
            },
            {
                title: 'Выявление неблагоприятных факторов и десоциализирующего воздействия со стороны ближайшего окружения ребенка, которые обуславливают отклонения в развитии личности'
            },
            {
                title: 'Проведение игр, направленных на развитие коммуникации, снятие эмоционального напряжения, выплеск агрессии в продуктивной двигательной активности (на уроках физкультуры, музыкальных занятиях и др.), развитие представлений о способах саморегуляции'
            },
            {
                title: 'Организация активного отдыха обучающегося между уроками в целях снижения агрессии'
            },
            {
                title: 'Обучение ребенка адекватному реагированию на негативные эмоции (занятия спортом, активный отдых)'
            },
            {
                title: 'Проведение индивидуальной работы информационно-рекомендательного характера с родителями и педагогами по вопросам воспитания и стиля общения с подростками'
            }
        ]
    },
    {
        title: 'Выраженная',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.AGGRESSIVITY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Контроль динамики показателей обучающегося по результатам проведенной коррекционной работы'
            },
            {
                title: 'Развитие навыков общения со сверстниками через совместные игры, мероприятия'
            },
            {
                title: 'Повышение самооценки через выполнение внеурочных поручений, позволяющих ребенку проявить свои способности'
            },
            {
                title: 'Ограничение во время уроков до минимума отвлекающих факторов, выбор оптимального места за партой-в центре класса напротив доски'
            },
            {
                title: 'Построение учебных занятий по четко распланированному, стереотипному распорядку'
            },
            {
                title: 'Предъявление посильных заданий, т.к. в ситуации сниженных интеллектуальных способностей у ученика сложное задание провоцирует агрессивные реакции'
            },
            {
                title: 'Предоставление обучающемуся возможности быстро обращаться за помощью к учителю в случае затруднения'
            },
            {
                title: 'Обучение контролю негативных эмоций, осознанию своих чувств и потребностей, чувств и потребностей других людей'
            },
            {
                title: 'Избегание оценивания педагогами поступков ученика, так как бурные аффективные реакции являются результатом длительного зажима эмоций'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов (с учетом выявленных показателей) с целью развития успешной самореализации в различных видах деятельности (с учетом деструктивных, разрушительных форм общения и взаимодействия)'
            },
            {
                title: 'Проведение индивидуальной работы информационно-рекомендательного характера с родителями по вопросам воспитания и стиля общения в семье'
            }
        ]
    },

    {
        title: 'Да',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.EXTRACURRICULAR_ABILITIES
    },
    {
        title: 'Слабо выражены',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.EXTRACURRICULAR_ABILITIES,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Определение и развитие общих и специальных способностей обучающегося (учебных и творческих, математических и конструктивно-технических, музыкальных и литературных, художественно-изобразительных и спортивных)'
            },
            {
                title: 'Предоставление обучающемуся возможности проявить себя в активной деятельности разнообразной направленности'
            },
            {
                title: 'Создание педагогами условий для индивидуального развития ребенка, реализации выявленных способностей'
            },
            {
                title: 'Стимулирование родителей к созданию условий для развития различных способностей ребёнка, включение родителей в творческие дела школы'
            }
        ]
    },
    {
        title: 'Отсутствуют',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.EXTRACURRICULAR_ABILITIES,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Проведение диагностики с целью выявления интересов, склонностей обучающегося во внеурочной деятельности'
            },
            {
                title: 'Оказание ребенку помощи в поисках «себя», предоставление возможности проявить себя в активной деятельности разнообразной направленности'
            },
            {
                title: 'Создание педагогами условий для индивидуального развития обучающегося в избранной сфере внеурочной деятельности, реализации приобретенных знаний, умений и навыков'
            },
            {
                title: 'Развитие опыта творческой/спортивной/ деятельности и способностей'
            },
            {
                title: 'Воспитание культуры досуговой деятельности, расширение неформального общения, взаимодействия, сотрудничества'
            },
            {
                title: 'Стимулирование родителей и педагогов к созданию условий для выявления, поддержки и развития способностей и талантов ребенка'
            }
        ]
    },

    {
        title: 'Нет',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.BULLYING
    },
    {
        title: 'Риск',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.BULLYING,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение индивидуальных занятий по первичной профилактике агрессивного поведения с целью исключения условий и возможностей развития буллинга'
            },
            {
                title: 'Проведение со специалистами ОО работы по формированию общегрупповых норм и правил, позитивного и оптимального психологического климата в классном коллективе'
            },
            {
                title: 'Консультирование родителей по вопросам формирования адекватного стиля воспитания, устранения нарушений детско-родительских отношений и их гармонизации, предупреждения жестокого обращения с ребенком в семье'
            }
        ]
    },
    {
        title: 'Да',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.BULLYING,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Проведение индивидуальных занятий по коррекции агрессивных форм поведения, снижению уровня тревожности, укреплению самооценки, тренингов, предотвращающих депрессивные состояния и устранение последствий буллинга'
            },
            {
                title: 'Проведение работы с педагогами по оптимизации межличностных отношений в классе, развитию коммуникативной культуры, привитию навыков общения и сотрудничества, развитию эмпатийных способностей членов группы, формированию толерантных отношений в коллективе'
            },
            {
                title: 'Консультирование родителей по формированию объективной оценки результатов коррекционной деятельности и адекватного стиля воспитания'
            }
        ]
    },

    {
        title: 'Избегает',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.CONFLICTUALITY
    },
    {
        title: 'Эпизодически участвует',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.CONFLICTUALITY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Организация диалога педагога с ребенком, создание атмосферы доверия, доброжелательности'
            },
            {
                title: 'Обучение конструктивному решению конфликта без взаимных упреков и оскорблений, формирование выводов, сопровождение работы над ошибками'
            },
            {
                title: 'Проведение психологических тренингов с ребенком, направленных на профилактику конфликтов, сплочение коллектива, содействие осознанию всеми участниками своего поведения, формирование умения позитивно разрешать конфликты'
            },
            {
                title: 'Выяснение родителями и педагогами причин конфликта, поиск максимального количества вариантов его решения с учетом интересов всех участников'
            }
        ]
    },
    {
        title: 'Выраженная конфликтная позиция',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.CONFLICTUALITY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Изучение ситуации без превратности, выявление причин конфликтов, способов решения проблемы'
            },
            {
                title: 'Обучение ребенка умению делать выводы, что поможет избежать ошибок общения и взаимодействия в будущем'
            },
            {
                title: 'Развитие навыков общения со сверстниками через совместные игры, занятия'
            },
            {
                title: 'Формирование навыков коммуникации младших школьников в различных видах деятельности'
            },
            {
                title: 'Проведение групповых психологических тренингов для сплочения коллектива, формирования умения действовать сообща и решать текущие проблемы вместе'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для родителей с рекомендацией вовлечения ребенка в кружковую деятельность или спортивную секцию, согласно его интересам'
            },
            {
                title: 'Проведение консультаций для родителей с целью выяснения причины конфликта, поиск максимального количества вариантов его решения с учетом интересов всех участников'
            }
        ]
    },

    //

    {
        title: 'Высокая',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.MOTIVATION
    },
    {
        title: 'Внешняя',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.MOTIVATION,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Выявление основных причин снижения мотивации к учебной деятельности у подростка (возрастные особенности, гиперопека и чрезмерный контроль родителей, конфликты с учителем или с одноклассниками, неадекватные нагрузки, личностные особенности)'
            },
            {
                title: 'Ориентация обучающегося на саморазвитие, достижение успеха, укрепление в позиции школьника, предоставление возможности самоутвердиться, предупреждение формирования стратегии избегания неудач'
            },
            {
                title: 'Формирование в сознании обучающегося связи учебной деятельности и будущего профессионального становления'
            },
            {
                title: 'Взаимодействие с педагогами образовательной организации с целью развития у обучающихся внутренней мотивации, уровня притязаний, способности ставить цели и достигать их'
            },
            {
                title: 'Консультирование родителей по вопросам повышения учебной мотивации у подростка'
            }
        ]
    },
    {
        title: 'Низкая',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.MOTIVATION,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Выявление основных причин снижения мотивации к учебной деятельности у подростка (различные аспекты личности, уровень притязаний, способность ставить цели и достигать их)'
            },
            {
                title: 'Проведение коррекционно-развивающих занятий, направленных на повышение самооценки, формирование ответственности за свои решения, ориентация на достижение успехов в учебной деятельности, изменение у ребенка стратегии избегания неудач'
            },
            {
                title: 'Проведение индивидуальных и групповых консультаций информационно-рекомендательного характера с педагогами и родителями по вопросам повышения учебной мотивации, оказания поддержки в процессе достижения результата, установления связи между учебой и интересами подростка'
            },
            {
                title: 'Консультация педагогов по организации образовательного процесса с возможностью максимального удовлетворения потребностей подростка в познавательной сфере, сообщение информации по изучаемым темам, выходящей за рамки учебника, сведение к минимуму самостоятельного чтения учебника на уроках, подбор фактов по изучаемым темам из реальной действительности'
            }
        ]
    },

    {
        title: 'Адаптирован',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.ADAPTATION
    },
    {
        title: 'Требуется помощь',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.ADAPTATION,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение психологических тренингов, направленных на развитие у подростка коммуникативного общения, навыков учебного сотрудничества с учителем и одноклассниками, преодоление дестабилизирующих функциональных состояний (тревоги, агрессии, страха, тревожности)'
            },
            {
                title: 'Проведение семинаров с педагогами и консультаций по вопросам организации педагогической поддержки в период адаптации и построению стратегии взаимодействия с одноклассниками'
            },
            {
                title: 'Консультативная и просветительская работа с родителями, направленная на ознакомление с основными задачами и трудностями периода адаптации, тактикой общения и помощи обучающемуся, снятие напряжения у родителей, вызванного учебным'
            }
        ]
    },
    {
        title: 'Дезадаптация',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.ADAPTATION,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Коррекционная работа с обучающимся, испытывающим трудности в обучении и поведении с учетом данных психодиагностики (в мотивационной сфере, развитии коммуникативных навыков, поведении, самооценке, проблем в учебе)'
            },
            {
                title: 'Просвещение и консультирование педагогов по вопросам индивидуальных и возрастных особенностей обучающегося, выявленных форм дезадаптации'
            },
            {
                title: 'Индивидуальное консультирование и просвещение родителей по результатам диагностики и формированию адекватной системы взаимоотношений в семье в период адаптации'
            }
        ]
    },

    {
        title: 'Лидер, предпочитаемый',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.SOCIOMETRY
    },
    {
        title: 'Принятый',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.SOCIOMETRY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение профилактических тренингов, направленных на развитие межличностного общения, решение личностных проблем, изменение социальных установок школьника'
            },
            {
                title: 'Формирование навыков поведения в конфликтных ситуациях'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов с учетом выявленных показателей, с целью развития успешной самореализации обучающегося в различных видах деятельности (с учетом начальных проявлений эмоционального неблагополучия и самочувствия в системе межличностных взаимоотношений)'
            },
            {
                title: 'Проведение консультаций для родителей, направленных на формирование у обучающегося эмпатии, толератности (в форме классных часов, родительских клубов)'
            }
        ]
    },
    {
        title: 'Аутсайдер',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.SOCIOMETRY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Проведение коррекционных занятий, направленных на сплочение классного коллектива, обучение навыкам анализа различных ситуаций общения, эмоциональному самоконтролю в общении, эффективному взаимодействию в конфликте, развитию самопознания, взаимопомощи и поддержки'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов с целью развития успешной самореализации школьников в различных видах деятельности в ОО (с учетом эмоционального неблагополучия и самочувствия ученика в системе межличностных взаимоотношений)'
            },
            {
                title: 'Проведение просветительских бесед с родителями, направленных на вовлечение обучающегося в разнообразную внешкольную деятельность (спортивные секции, клубы) для приобретения более устойчивого статуса в новой структуре межличностных отношений'
            }
        ]
    },

    {
        title: 'Адекватная',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.SELF_ASSESSMENT
    },
    {
        title: 'Тенденция к заниженной/завышенной',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.SELF_ASSESSMENT,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение тренингов с обучающимся по формированию адекватной самооценки'
            },
            {
                title: 'Проведение практикума и круглого стола для специалистов по вопросам психопрофилактики рисков формирования нездоровой самооценки у обучающегося, влияющей на формирование личностных новообразований в подростковом возрасте'
            },
            {
                title: 'Индивидуальное и систематическое консультирование родителей по формированию у школьника нового представления о себе, влияющего на адекватность самооценки в данный возрастной период'
            }
        ]
    },
    {
        title: 'Заниженная/завышенная',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.SELF_ASSESSMENT,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Развитие навыков общения у подростка (коммуникация, поведение, понимание), рефлексии своей деятельности и ее результатов, лидерских качеств'
            },
            {
                title: 'Обучение адекватным эмоциональным реакциям, способам самовыражения через разные сферы деятельности, формирование позитивного отношения к различным ситуациям и стремлению к самопознанию и саморазвитию'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов (с учетом выявленных у ребенка показателей) с целью развития успешной самореализации школьника в различных видах деятельности'
            },
            {
                title: 'Организация индивидуальной работы с родителями подростка по вопросам развития детско-родительских отношений и их влияния на самооценку обучающегося'
            }
        ]
    },

    {
        title: 'Отсутствуют',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.ACCENTUATIONS
    },
    {
        title: 'Тенденция к акцентуациям',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.ACCENTUATIONS
    },
    {
        title: 'Наличие акцентуаций',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.ACCENTUATIONS
    },

    {
        title: 'Низкая',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.PERSONAL_ANXIETY
    },
    {
        title: 'Умеренная – 31-45%',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.PERSONAL_ANXIETY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение психологом коррекционных занятий с обучающимся, имеющим повышенный уровень тревожности, основываясь на характере и природе трудностей'
            },
            {
                title: 'Организация на внеклассных мероприятиях работы, направленной на снятие эмоционального напряжения, сплочение детского коллектива, развитие коммуникативных навыков'
            },
            {
                title: 'Доведение до сведения классных руководителей результатов психологической диагностики уровня тревожности с целью организации индивидуальной работы'
            },
            {
                title: 'Консультирование и просвещение педагогов и родителей по вопросу координации действий, направленных на оказание помощи тревожному ребенку в процессе обучения'
            }
        ]
    },
    {
        title: 'Высокая – от 46%',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.PERSONAL_ANXIETY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Осуществление индивидуального подхода в обучении и межличностном взаимодействии с высокотревожным обучающимся, избегая в общении критических замечаний и негативного оценивания личности, которые оказывают психотравмирующее действие'
            },
            {
                title: 'Создание спокойной и доброжелательной атмосферы в процессе обучения, т.к. в ситуации повышенного напряжения тревожные дети менее успешны (в условиях ограниченного времени выполнения заданий и контрольных работ, при опросе, требующем немедленной ответной реакции)'
            },
            {
                title: 'Организация и проведение тренинговых занятий с высокотревожным школьником с целью устранения школьных страхов, возможных трудностей обучения и формирования положительной учебной мотивации'
            },
            {
                title: 'Консультирование и просвещение педагогов и родителей по координации действий, направленных на оказание помощи высокотревожному ребенку в процессе обучения'
            }
        ]
    },

    {
        title: 'Отсутствует',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.AGGRESSIVITY
    },
    {
        title: 'Слабо выражена',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.AGGRESSIVITY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Получение психологом в результате диагностики знаний об особенностях проявления агрессии обучающимся, подбор индивидуальных приемов и методов работы'
            },
            {
                title: 'Проведение индивидуальных занятий с подростком по профилактике агрессивного поведения, направленных на обучение техникам саморегуляции и самоконтроля'
            },
            {
                title: 'Расширение диапазона тактик поведения в конфликтных ситуациях'
            },
            {
                title: 'Организация просветительской работы с педагогическим коллективом, направленной на повышение психолого-педагогической грамотности по вопросу распознавания первых признаков агрессивного поведения'
            },
            {
                title: 'Консультирование родителей по вопросам повышения родительской компетентности в сфере воспитания'
            }
        ]
    },
    {
        title: 'Выраженная',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.AGGRESSIVITY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Проведение коррекционной работы, направленной на улучшение микроклимата в коллективе, развитие навыков саморегуляции, коммуникативных умений, самоконтроля, обучение конструктивным действиями в конфликтных ситуациях'
            },
            {
                title: 'Обучение конструктивным действиями в конфликтных ситуациях'
            },
            {
                title: 'Обучение конструктивным действиями в конфликтных ситуациях'
            },
            {
                title: 'Проведение просветительской работы с педагогами по конструктивному взаимодействию с обучающимися «группы риска» и формированию у них навыков бесконфликтного и эффективного общения'
            },
            {
                title: 'Консультирование родителей по вопросам повышения уровня компетентности в сфере воспитания, формирования у ребенка умений владения собой в различных ситуациях'
            }
        ]
    },

    {
        title: 'Да',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.EXTRACURRICULAR_ABILITIES
    },
    {
        title: 'Слабо выражены',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.EXTRACURRICULAR_ABILITIES,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Повторное проведение диагностики с целью определения и развития общих и специальных способностей обучающегося (учебных и творческих, математических и конструктивно-технических, музыкальных и литературных, художественно-изобразительных и спортивных)'
            },
            {
                title: 'Создание педагогами условий для индивидуального развития и поддержки ребенка в выявленной сфере'
            },
            {
                title: 'Взаимодействие с родителями с целью развития интересов, склонностей ребенка, расширения рамок его общения с социумом, развития опыта неформального общения, сотрудничества в системе дополнительного образования, воспитания культуры досуговой деятельности'
            }
        ]
    },
    {
        title: 'Отсутствуют',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.EXTRACURRICULAR_ABILITIES,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Выявление интересов и склонностей обучающегося к различным видам деятельности'
            },
            {
                title: 'Оказание помощи в поисках «себя», предоставление возможности проявить себя в активной деятельности разнообразной направленности'
            },
            {
                title: 'Создание педагогами условий для индивидуального развития ребенка в избранной сфере внеурочной деятельности, реализации приобретенных знаний, умений и навыков'
            },
            {
                title: 'Организация мероприятий разного уровня направленных на выявление, поддержку и развитие способностей обучающегося'
            },
            {
                title: 'Взаимодействие с родителями для выявления интересов, склонностей ребенка, расширения рамок его общения с социумом, развития опыта неформальных контактов, сотрудничества в системе дополнительного образования, воспитания культуры досуговой деятельности'
            }
        ]
    },

    {
        title: 'Отсутствует',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.DEVIANT_BEHAVIOR
    },
    {
        title: 'Ситуативная предрасположенность',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.DEVIANT_BEHAVIOR,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Создание поддерживающей компенсаторной среды (формирование нравственно-правового пространства в учебном заведении, поддерживающего психофизиологическое здоровье'
            },
            {
                title: 'Организация психологически комфортной среды, основанной на доброжелательных взаимоотношениях, доверии, сотрудничестве и положительном эмоциональном фоне)'
            },
            {
                title: 'Формирование «полей выброса энергии» и содействие самореализации обучающегося с учетом его индивидуальных особенностей)'
            },
            {
                title: 'Минимизация негативного влияния факторов социальной среды на личность обучающегося (сочетание социально-педагогической и психолого-педагогической деятельности, направленной на выявление семейного неблагополучия'
            },
            {
                title: 'Консультирование родителей (законных представителей) в случае затрудненных воспитательных усилий или конфликтных детско-родительских взаимоотношениях'
            },
            {
                title: 'Использование методик конструирования социальной успешности'
            },
            {
                title: 'Подготовка подростка к безопасному использованию медийно-информационного пространства)'
            },
            {
                title: 'Подготовка подростка к безопасному использованию медийно-информационного пространства)'
            },
            {
                title: 'Формирование и развитие личностных характеристик, предупреждающих деструктивное поведение подростка (совокупность воспитательных и психолого-педагогических технологий в образовательной организации)'
            },
            {
                title: 'Проведение мастер-классов для педагогов, направленных на профилактику деструктивного поведения'
            },
            {
                title: 'Проведение совместных с социальным педагогом консультирований по вопросам формирования доверительных взаимоотношений и комфортного климата в семье'
            }
        ]
    },
    {
        title: 'СОП – социально обусловленное поведение',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.DEVIANT_BEHAVIOR,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Использование в работе педагога-психолога технологии организации социальной среды (формирование негативного отношения к деструктивным поведенческим проявлениям, социальная реклама здорового образа жизни и сознательного отказа от деструктивного поведения, работа с молодежными субкультурами'
            },
            {
                title: 'Внедрение в педагогический процесс доступных информационных технологий (корректное, безопасное и доступное информирование о деструктивном поведении с жизнеутверждающих позиций, без «запугивания» и разжигания интереса)'
            },
            {
                title: 'Использование технологии активного обучения социальным навыкам и формирования социально важных характеристик (формирование резистентности к негативному влиянию, ассертивности, жизненных навыков и т.п.)'
            },
            {
                title: 'Использование в работе технологии организации деятельности, альтернативной деструктивному поведению (раннее воспитание позитивных интересов, вовлечение подростка в различные социально одобряемые формы активности: физическую культуру и спорт, искусство и науку)'
            },
            {
                title: 'Использование технологии воспитания здорового образа жизни'
            },
            {
                title: 'Использование технологии активации личностных ресурсов (формирование жизнестойкости, стрессоустойчивости, тренингов конструктивного разрешения конфликтов и др.)'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов с целью развития успешной самореализации школьника в различных видах деятельности в образовательной организации'
            },
            {
                title: 'Организация индивидуальной работы с родителями подростка по психопрофилактике деструкций'
            }
        ]
    },
    {
        title: 'ДП – делинквентное поведение',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.DEVIANT_BEHAVIOR,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Использование в работе педагога-психолога технологии организации социальной среды (формирование негативного отношения к деструктивным поведенческим проявлениям, социальная реклама здорового образа жизни и сознательного отказа от деструктивного поведения, работа с молодежными субкультурами'
            },
            {
                title: 'Внедрение в педагогический процесс доступных информационных технологий (корректное, безопасное и доступное информирование о деструктивном поведении с жизнеутверждающих позиций, без «запугивания» и разжигания интереса)'
            },
            {
                title: 'Использование технологии активного обучения социальным навыкам и формирования социально важных характеристик (формирование резистентности к негативному влиянию, ассертивности, жизненных навыков и т.п.)'
            },
            {
                title: 'Использование в работе технологии организации деятельности, альтернативной деструктивному поведению (раннее воспитание позитивных интересов, вовлечение подростка в различные социально одобряемые формы активности: физическую культуру и спорт, искусство и науку)'
            },
            {
                title: 'Использование технологии воспитания здорового образа жизни'
            },
            {
                title: 'Использование технологии активации личностных ресурсов (формирование жизнестойкости, стрессоустойчивости, тренингов конструктивного разрешения конфликтов и др.)'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов с целью развития успешной самореализации школьника в различных видах деятельности в образовательной организации'
            },
            {
                title: 'Организация индивидуальной работы с родителями подростка по психопрофилактике деструкций'
            }
        ]
    },
    {
        title: 'ЗП – зависимое (аддиктивное) поведение',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.DEVIANT_BEHAVIOR,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Использование в работе педагога-психолога технологии организации социальной среды (формирование негативного отношения к деструктивным поведенческим проявлениям, социальная реклама здорового образа жизни и сознательного отказа от деструктивного поведения, работа с молодежными субкультурами'
            },
            {
                title: 'Внедрение в педагогический процесс доступных информационных технологий (корректное, безопасное и доступное информирование о деструктивном поведении с жизнеутверждающих позиций, без «запугивания» и разжигания интереса)'
            },
            {
                title: 'Использование технологии активного обучения социальным навыкам и формирования социально важных характеристик (формирование резистентности к негативному влиянию, ассертивности, жизненных навыков и т.п.)'
            },
            {
                title: 'Использование в работе технологии организации деятельности, альтернативной деструктивному поведению (раннее воспитание позитивных интересов, вовлечение подростка в различные социально одобряемые формы активности: физическую культуру и спорт, искусство и науку)'
            },
            {
                title: 'Использование технологии воспитания здорового образа жизни'
            },
            {
                title: 'Использование технологии активации личностных ресурсов (формирование жизнестойкости, стрессоустойчивости, тренингов конструктивного разрешения конфликтов и др.)'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов с целью развития успешной самореализации школьника в различных видах деятельности в образовательной организации'
            },
            {
                title: 'Организация индивидуальной работы с родителями подростка по психопрофилактике деструкций'
            }
        ]
    },
    {
        title: 'АП – агрессивное поведение',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.DEVIANT_BEHAVIOR,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Использование в работе педагога-психолога технологии организации социальной среды (формирование негативного отношения к деструктивным поведенческим проявлениям, социальная реклама здорового образа жизни и сознательного отказа от деструктивного поведения, работа с молодежными субкультурами'
            },
            {
                title: 'Внедрение в педагогический процесс доступных информационных технологий (корректное, безопасное и доступное информирование о деструктивном поведении с жизнеутверждающих позиций, без «запугивания» и разжигания интереса)'
            },
            {
                title: 'Использование технологии активного обучения социальным навыкам и формирования социально важных характеристик (формирование резистентности к негативному влиянию, ассертивности, жизненных навыков и т.п.)'
            },
            {
                title: 'Использование в работе технологии организации деятельности, альтернативной деструктивному поведению (раннее воспитание позитивных интересов, вовлечение подростка в различные социально одобряемые формы активности: физическую культуру и спорт, искусство и науку)'
            },
            {
                title: 'Использование технологии воспитания здорового образа жизни'
            },
            {
                title: 'Использование технологии активации личностных ресурсов (формирование жизнестойкости, стрессоустойчивости, тренингов конструктивного разрешения конфликтов и др.)'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов с целью развития успешной самореализации школьника в различных видах деятельности в образовательной организации'
            },
            {
                title: 'Организация индивидуальной работы с родителями подростка по психопрофилактике деструкций'
            }
        ]
    },
    {
        title: 'СП – суицидальное (аутоагрессивное) поведение',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.DEVIANT_BEHAVIOR,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Использование в работе педагога-психолога технологии организации социальной среды (формирование негативного отношения к деструктивным поведенческим проявлениям, социальная реклама здорового образа жизни и сознательного отказа от деструктивного поведения, работа с молодежными субкультурами'
            },
            {
                title: 'Внедрение в педагогический процесс доступных информационных технологий (корректное, безопасное и доступное информирование о деструктивном поведении с жизнеутверждающих позиций, без «запугивания» и разжигания интереса)'
            },
            {
                title: 'Использование технологии активного обучения социальным навыкам и формирования социально важных характеристик (формирование резистентности к негативному влиянию, ассертивности, жизненных навыков и т.п.)'
            },
            {
                title: 'Использование в работе технологии организации деятельности, альтернативной деструктивному поведению (раннее воспитание позитивных интересов, вовлечение подростка в различные социально одобряемые формы активности: физическую культуру и спорт, искусство и науку)'
            },
            {
                title: 'Использование технологии воспитания здорового образа жизни'
            },
            {
                title: 'Использование технологии активации личностных ресурсов (формирование жизнестойкости, стрессоустойчивости, тренингов конструктивного разрешения конфликтов и др.)'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов с целью развития успешной самореализации школьника в различных видах деятельности в образовательной организации'
            },
            {
                title: 'Организация индивидуальной работы с родителями подростка по психопрофилактике деструкций'
            }
        ]
    },

    {
        title: 'Да',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.PROFESSIONAL_INTERESTS
    },
    {
        title: 'Слабо выражены',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.PROFESSIONAL_INTERESTS,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение с подростком курса практических коррекционных занятий направленных на выявление, осознание и развитие интересов, способностей и склонностей, определяющих выбор дальнейшего профессионального пути и стратегии самореализации'
            }
        ]
    },
    {
        title: 'Нет',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.PROFESSIONAL_INTERESTS,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Ознакомление обучающегося со знаниями о влиянии индивидуальных особенностей личности на выбор профессионального пути, помощь в выборе профиля обучения'
            },
            {
                title: 'Оказание помощи в выявлении склонностей к различным видам деятельности, в том числе профессиональной, интереса в профессиональном выборе («хочу»), возможности личности («могу»), здоровье и социальных проблем («надо»)'
            },
            {
                title: 'Формирование мотивов саморазвития и личностного роста'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов с целью развития успешной самореализации школьника в различных видах деятельности в образовательной организации'
            },
            {
                title: 'Консультирование родителей подростка по вопросам выявления способностей, развития устойчивых интересов обучающегося'
            },
            {
                title: 'Проведение тренингов для родителей «Предупреждение ошибок в выборе профессии»'
            }
        ]
    },

    {
        title: 'Нет',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.BULLYING
    },
    {
        title: 'Риск',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.BULLYING,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение тренинга с обучающимся по формированию функциональных, конструктивных стратегий поведения, развитию эмпатии, толерантности, рефлексии'
            },
            {
                title: 'Организация комплексной, системной работы с педагогическим коллективом по вторичной профилактике буллинга и принятию мер, препятствующих его распространению: позитивной психологической атмосферы, гармонизации детско-родительских отношений и определения границ общения'
            },
            {
                title: 'Индивидуальное консультирование родителей по профилактике детско-родительских отношений, формированию крепких эмоциональных связей в семье'
            }
        ]
    },
    {
        title: 'Да',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.BULLYING,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Проведение коррекционной работы, направленной на обучение подростка навыкам самоконтроля, способности позитивного восприятия себя и окружающих'
            },
            {
                title: 'Проведение работы с педагогами по оптимизации межличностных отношений в классе через развитие коммуникативной культуры, навыков общения и сотрудничества, эмпатийных способностей членов группы, толерантности'
            },
            {
                title: 'Консультирование родителей по вопросам повышения уровня компетентности в сфере воспитания, формирования адекватных стратегий самореализации'
            }
        ]
    },

    {
        title: 'Избегает',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.CONFLICTUALITY
    },
    {
        title: 'Эпизодически участвует',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.CONFLICTUALITY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение психологических тренингов, направленных на профилактику конфликтов между подростками, формирование различных стратегий поведения в конфликтных ситуациях'
            },
            {
                title: 'Обучение педагогов отслеживанию сигналов, предупреждающих о развитии конфликта (незначительные инциденты, напряжение, непрерывное беспокойство, дискомфорт)'
            },
            {
                title: 'Выяснение с родителями причин появления разногласий, боязни открытого обсуждения'
            },
            {
                title: 'Формирование осознания, что в конфликте участвуют двое и каждый имеет право на собственную позицию, обсуждение чувств подростка в момент конфликта и поиски конструктивных способов их решения'
            }
        ]
    },
    {
        title: 'Выраженная конфликтная позиция',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.CONFLICTUALITY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Изучение ситуации без превратности, выявление общей цели, способов решения проблемы, позволяющих достичь этой цели'
            },
            {
                title: 'Демонстрация педагогами модели позитивного поведения: спокойное, уравновешенное поведение и доброжелательное отношение вне зависимости от ситуации'
            },
            {
                title: 'Проведение психологических мастер-классов на создание в классном коллективе новой ситуации, способствующей урегулированию конфликта, побуждение подростков переводу конфликта в ситуацию совместного поиска решений'
            },
            {
                title: 'Определение признаваемых сторонами критериев разрешения конфликта'
            },
            {
                title: 'Поиск максимального количества вариантов решения конфликта с учетом интересов всех участников (совместно с родителями и педагогами)'
            }
        ]
    },

    {
        title: 'Высокий',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.CULTURAL_VALUES
    },
    {
        title: 'Средний',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.CULTURAL_VALUES,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Организация с обучающимся тренинга обмена личностными смыслами и опытом между учителями, родителями и школьником, где педагог и родитель направляют процесс в "нужное русло", оказывая педагогическое сопровождение в формировании и развитии ценностных представлений (терминальных, инструментальных)'
            }
        ]
    },
    {
        title: 'Низкий',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.CULTURAL_VALUES,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Проведение тренингов по развитию ценностно-смыслового и личностного самоопределения: представлений о собственных возможностях, потребностях, интересах, ценностях'
            },
            {
                title: 'Внутренней регуляции на когнитивном, эмоционально-волевом и поведенческом уровнях, ответственности за свободный выбор перед самим собой, близкими, друзьями, одноклассниками, учителями и т.д.'
            },
            {
                title: 'Помощь в формировании общественно значимых мотивов выбора жизненного пути и профессии'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов, с целью развития ценностных ориентаций школьника через различные виды деятельности в ОО'
            },
            {
                title: 'Организация индивидуальной работы с родителями по вопросам оказания влияния на развитие терминальных и инструментальных ценностей ребенка, помощи в осознании понимания смысла жизни'
            }
        ]
    },

    {
        title: 'Адаптирован',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.ADAPTATION
    },
    {
        title: 'Требуется помощь',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.ADAPTATION,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение профилактических тренинговых занятий с обучающимся, направленных на предупреждение дестабилизирующих состояний: тревожности, агрессии, переутомления, снижения успеваемости'
            },
            {
                title: 'Организация совместных со специалистами ОО профилактических мероприятий с обучающимся по формированию чувства ответственности, достаточного уровня субъективного контроля, рефлексии, а также самоопределения и построения жизненных перспектив'
            },
            {
                title: 'Проведение консультативно-разъяснительной работы с родителями, направленной на оказание ребенку поддержки, формирование у него системы общечеловеческих ценностей, положительных качеств личности'
            }
        ]
    },
    {
        title: 'Дезадаптация',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.ADAPTATION,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Проведение воспитательно-разъяснительной работы с обучающимся по профилактике правонарушений, взаимодействие с КДН, ПДН'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов с целью развития успешной самореализации школьника в различных видах деятельности в ОО (с учетом неадекватных механизмов приспособления ребенка к условиям обучения, индивидуально-психологических особенностей, отношения к получению знаний, особенностей эмоций и волевой регуляции поведения)'
            },
            {
                title: 'Консультативно-разъяснительная работа с родителями, направленная на повышение самосознания обучающегося, путем привлечения к разнообразным формам совместной деятельности (спортивные секции, клубы, волонтерские движения), подходы, экскурсии и т.д.'
            }
        ]
    },

    {
        title: 'Лидер, предпочитаемый',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.SOCIOMETRY
    },
    {
        title: 'Принятый',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.SOCIOMETRY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Организация воспитательно-профилактической работы, направленной на формирование у школьника представлений о конструктивном поведении, здоровой несклонной к правонарушениям и противоправному поведению личности (толерантное воспитание, пропаганда ЗОЖ)'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов с целью развития успешной самореализации школьника в различных видах деятельности в ОО (с учетом признаков эмоционального неблагополучия и самочувствия в системе межличностных взаимоотношений)'
            },
            {
                title: 'Просветительская работа с родителями, направленная на оказание помощи ребенку в интеллектуальном, профессиональном, социальном поиске, развитии активных социальных качеств, формировании жизненных планов, основ профессионального самоопределения, стремлении осознать свое место и социальную значимость в будущей жизни'
            }
        ]
    },
    {
        title: 'Аутсайдер',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.SOCIOMETRY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Проведение индивидуальной работы  с «отвергнутым» учеником'
            },
            {
                title: 'Организация в классе работы по подгруппам (по принципу взаимопомощи и поддержки, мотивации на достижения обучающегося)'
            },
            {
                title: 'Вовлечение «изолированного» ученика в интересную деятельность, способствующую повышению его социометрического статуса, используя разовые школьные поручения'
            },
            {
                title: 'Контроль динамики показателей обучающегося по результатам проведенной коррекционной работы'
            },
            {
                title: 'Создание комфортной обстановки в коллективе с предоставлением некоторой свободы и самостоятельности, формирование традиций и ценностей коллектива, привлечение обучающегося к коллективной работе в классе, похвала и поощрение в присутствии всех, определение поручений, чтобы обучающийся проявил себя'
            },
            {
                title: 'Проведение мероприятий, направленных на сплочение обучающихся (совместные прогулки на природе, создание и осуществление социально значимых проектов, разработка и выполнение коллективного творческого дела)'
            },
            {
                title: 'Организация классных часов о дружбе, взаимовыручке, коллективизме, групповых видах деятельности с частой сменой состава микрогрупп'
            },
            {
                title: 'Создание в классе единой системы традиций и ценностей'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов с целью развития успешной самореализации школьника в различных видах деятельности в ОО (с учетом эмоционального неблагополучия и  самочувствия ученика в системе личных взаимоотношений)'
            },
            {
                title: 'Проведение просветительских бесед с родителями, направленных на вовлечение «изолированного» обучающегося в разнообразную внешкольную сеть образовательных организаций (спортивные секции, кружки), где есть возможность завоёвывать более устойчивый статус в новой структуре межличностных отношений'
            }
        ]
    },

    {
        title: 'Адекватная',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.SELF_ASSESSMENT
    },
    {
        title: 'Тенденция к заниженной/завышенной',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.SELF_ASSESSMENT,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение с обучающимся тренинга личностного роста'
            },
            {
                title: 'Консультирование специалистов по вопросам оказания помощи обучающемуся в выборе дальнейшего профессионального пути, определяющего характер самооценки и уровня притязаний в ранней юности'
            },
            {
                title: 'Индивидуальное взаимодействие с родителями в вопросах укрепления в школьнике веры в себя, своих возможностей, влияющих на характер самооценки в данный возрастной период'
            }
        ]
    },
    {
        title: 'Заниженная/завышенная',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.SELF_ASSESSMENT,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Организация тренингов по расширению знаний и представлений обучающегося о себе, формирование способности адекватно оценить себя на основе внутренней системы ценностей, взглядов, формирование уверенности, ощущения значимости собственной личности'
            },
            {
                title: 'Формирование стремления к самопознанию и саморазвитию'
            },
            {
                title: 'Проведение краткого курса психологического просвещения для педагогов с целью развития успешной самореализации школьника в различных видах деятельности в образовательной организации'
            },
            {
                title: 'Организация индивидуальной работы с родителями старшеклассника по вопросам  развития профессиональных предпочтений'
            }
        ]
    },

    {
        title: 'Отсутствует',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.AGGRESSIVITY
    },
    {
        title: 'Слабо выражена',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.AGGRESSIVITY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение тренинговых занятий с обучающимися (тренинг социальных умений) по профилактике агрессивных форм поведения, направленных на моделирование примеров адекватных действий'
            },
            {
                title: 'Перенесение полученных навыков из учебной ситуации в реальную жизненную обстановку'
            },
            {
                title: 'Проведение просветительской работы с педагогами по повышению уровня коммуникативной культуры обучающегося, формированию позитивных качеств личности'
            },
            {
                title: 'Консультирование родителей по вопросам  повышения родительской компетентности в сфере воспитания, обучения ребенка альтернативным методам выражения агрессии, формирования эмпатии, доверия к людям'
            }
        ]
    },
    {
        title: 'Выраженная',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.AGGRESSIVITY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },

            {
                title: 'Проведение тренинга с обучающимся по управлению агрессией в форме упражнений, дискуссий, мини-лекций в сочетании с психотерапевтическими методами (рационально-эмотивной психотерапии, гештальтерапии, со-консультировании)'
            },
            {
                title: 'Проведение просветительской работы с педагогами по  формированию само- и взаимоподдержки обучающихся, навыков бесконфликтного и эффективного общения'
            },
            {
                title: 'Консультирование родителей по вопросам повышения уровня компетентности в сфере воспитания, формирования здорового жизненного стиля, высокофункциональных стратегий и навыков поведения ребенка'
            }
        ]
    },

    {
        title: 'Низкая',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.PERSONAL_ANXIETY
    },
    {
        title: 'Умеренная – 31-45%',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.PERSONAL_ANXIETY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение коррекционных занятий, направленных на повышение самооценки, формирование умения управлять собой в ситуациях, вызывающих наибольшее беспокойство, освоение техники диафрагмально-релаксационного дыхания'
            },
            {
                title: 'Консультирование педагогов по результатам психологической диагностики уровня тревожности'
            },
            {
                title: 'Учет педагогами индивидуально-личностных особенностей обучающегося, создание на уроках максимально психологически безопасной атмосферы взаимоуважения, ситуации успеха, оказание поддерживающих реакций, упор на успешность'
            },
            {
                title: 'Консультирование и просвещение педагогов и родителей по координации действий, направленных на оказание помощи тревожному ребенку в процессе обучения и подготовки к экзаменам в школе и семье'
            }
        ]
    },
    {
        title: 'Высокая – от 46%',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.PERSONAL_ANXIETY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Организация и проведение тренинговых занятий с обучающимся с целью снижения уровня тревожности, формирования положительной учебной мотивации и устранения возможных трудностей при подготовке к сдаче ЕГЭ'
            },
            {
                title: 'Консультирование педагогов по вопросам осуществления индивидуального подхода в обучении и межличностном взаимодействии с высокотревожным обучающимся, избегая в общении критических замечаний и негативного оценивания личности, оказывающих психотравмирующее действие'
            },
            {
                title: 'Создание спокойной и доброжелательной атмосферы в процессе обучения, имея в виду, что тревожные обучающиеся менее успешны в ситуации повышенного напряжения, условиях ограниченного времени выполнения заданий, при выполнении контрольных работ, опросе, требующем немедленной ответной реакции'
            },
            {
                title: 'Консультирование и просвещение педагогов и родителей по вопросу координации действий, направленных на оказание помощи высокотревожному ребенку в процессе обучения и подготовки к экзаменам'
            }
        ]
    },

    {
        title: 'Нет',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.BULLYING
    },
    {
        title: 'Риск',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.BULLYING,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение коррекционных занятий с обучающимся по формированию стрессоустойчивости с учетом его социальной уязвимости'
            },
            {
                title: 'Проведение тренингов с по третичной профилактике антибуллинговых достижений, препятствующих возникновению травли'
            },
            {
                title: 'Проведение круглого стола специалистами образовательной организации по профилактике психологического дискомфорта, принятию мер по предотвращению агрессии в коллективе, нарушению этико-моральных ценностей и групповых норм'
            },
            {
                title: 'Консультирование родителей по формированию конструктивных стратегий самореализации обучающегося, выбору адекватных форм поведения в конфликтной ситуации'
            }
        ]
    },
    {
        title: 'Да',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.BULLYING,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Проведение коррекционной работы с обучающимся, направленной на  устранение буллинга (насмешки, издевательства, байкот): развитие навыков выхода из конфликтной ситуации'
            },
            {
                title: 'Расширение конструктивных способов взаимодействия с окружающими'
            },
            {
                title: 'Обучение повышению ответственности, принятию верных решений и действий'
            },
            {
                title: 'Проведение индивидуальных тренингов, ориентированных на раскрытие положительных сторон личности обучающегося'
            },
            {
                title: 'Организация работы с педагогами по оптимизации межличностных отношений в классе  через развитие  коммуникативной культуры, навыков общения и сотрудничества, эмпатийных способностей членов группы, толерантности'
            },
            {
                title: 'Консультирование родителей по вопросам формирования адекватных стратегий самореализации обучающегося в группе сверстников, умению принимать противоположную точку зрения, слушать и слышать друг друга'
            }
        ]
    },

    {
        title: 'Избегает',
        healthZone: HealthZone.GREEN,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.CONFLICTUALITY
    },
    {
        title: 'Эпизодически участвует',
        healthZone: HealthZone.YELLOW,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.CONFLICTUALITY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших профилактических мероприятий'
            },
            {
                title: 'Проведение психологических тренингов с обучающимся по профилактике конфликтных ситуаций, развитию эмоционального интеллекта, умению понимать других и признавать их право на собственное мнение, достигать компромиссов без оценивания личности, проговариванию чувств в момент конфликта и поиск конструктивных способов его решения'
            },
            {
                title: 'Проведение тренингов для педагогов по вопросам разрешения межличностных конфликтов среди школьников, выяснения причин и их устранение'
            },
            {
                title: 'Отслеживания сигналов, предупреждающих о развитии конфликтов (незначительные инциденты, напряжение, непрерывное беспокойство, дискомфорт)'
            },
            {
                title: 'Консультирование родителей по вопросу выявления причин появления разногласий, возможности открытого их обсуждения в семье'
            },
            {
                title: 'Формирование осознания, что в конфликте участвуют двое и каждый имеет право на собственную позицию'
            }
        ]
    },
    {
        title: 'Выраженная конфликтная позиция',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.CONFLICTUALITY,
        recommendations: [
            {
                title: 'Проведение углубленной диагностики и определение стратегии дальнейших коррекционно-развивающих мероприятий'
            },
            {
                title: 'Развитие психологических навыков эффективного поведения школьника в конфликтной ситуации, информирование о типах, причинах конфликтов и способах их разрешения, развитие навыков эффективного поведения в конфликтной ситуации, умения устанавливать и поддерживать дружеские отношения'
            },
            {
                title: 'Контроль динамики показателей обучающегося по результатам проведенной коррекционной работы'
            },
            {
                title: 'Изучение ситуации без превратности, выявление способов решения проблемы'
            },
            {
                title: 'Демонстрация модели позитивного поведения'
            },
            {
                title: 'Определение признаваемых сторонами критериев разрешения конфликта (правовые, нравственные, мнение авторитетных лиц, прецеденты)'
            },
            {
                title: 'Консультирование родителей по вопросам выяснения причин конфликта, поиску максимального количества вариантов решения конфликта с учетом интересов всех участников, совместной оценке всех вариантов и выбора того, который максимально соответствует интересам участников взаимодействия, проведению анализа ошибок в собственном поведении и воспитании ребенка'
            }
        ]
    }
]

export const conclusions: {
    title: string
    conclusionType: ConclusionType
    healthZone: HealthZone
    recommendations?: ConclusionRecommendation[]
}[] = [
    {
        title: 'Нет ограничений по здоровью',
        conclusionType: ConclusionType.MEDICAL,
        healthZone: HealthZone.GREEN
    },
    {
        title: 'Подвержен риску развития частых/хронических заболеваний, обладает пониженным иммунитетом/проблемной наследственностью',
        conclusionType: ConclusionType.MEDICAL,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'Наблюдается значительное ухудшение здоровья, нарушение функционирования некоторых органов и систем',
        conclusionType: ConclusionType.MEDICAL,
        healthZone: HealthZone.RED
    },
    {
        title: 'Сниженная сопротивляемость организма',
        conclusionType: ConclusionType.MEDICAL,
        healthZone: HealthZone.RED
    },
    {
        title: 'Требуется лечение/реабилитация',
        conclusionType: ConclusionType.MEDICAL,
        healthZone: HealthZone.RED
    },

    {
        title: 'Нет особенностей по педагогическим показателям',
        conclusionType: ConclusionType.PEDAGOGUE,
        healthZone: HealthZone.GREEN
    },
    {
        title: 'Наличие риска по педагогическим показателям',
        conclusionType: ConclusionType.PEDAGOGUE,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'Выявлены нарушения по педагогическим показателям',
        conclusionType: ConclusionType.PEDAGOGUE,
        healthZone: HealthZone.RED
    },

    {
        title: 'Отсутствие речевых нарушений',
        conclusionType: ConclusionType.SPEECH,
        healthZone: HealthZone.GREEN
    },
    {
        title: 'Наличие риска по логопедическим показателям',
        conclusionType: ConclusionType.SPEECH,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'Нарушения речевого развития',
        conclusionType: ConclusionType.SPEECH,
        healthZone: HealthZone.RED
    },

    {
        title: 'Основная группа для занятий физической культурой',
        conclusionType: ConclusionType.PHYSICAL,
        healthZone: HealthZone.GREEN
    },
    {
        title: 'Подготовительная группа для занятий физической культурой',
        conclusionType: ConclusionType.PHYSICAL,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'Специальная группа для занятий физической культурой',
        conclusionType: ConclusionType.PHYSICAL,
        healthZone: HealthZone.RED
    },

    {
        title: 'Нет ограничений по психологическому здоровью',
        conclusionType: ConclusionType.PSYCHOLOGICAL,
        healthZone: HealthZone.GREEN
    },
    {
        title: 'Наличие риска по показателям психологического здоровья',
        conclusionType: ConclusionType.PSYCHOLOGICAL,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'Наблюдается значительное ухудшение показателей психологического здоровья',
        conclusionType: ConclusionType.PSYCHOLOGICAL,
        healthZone: HealthZone.RED
    },

    {
        title: 'Нет ограничений по социальному здоровью',
        conclusionType: ConclusionType.SOCIAL,
        healthZone: HealthZone.GREEN
    },
    {
        title: 'Группа риска по показателям социального здоровья',
        conclusionType: ConclusionType.SOCIAL,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'Наблюдаются значительные ухудшения по показателям социального здоровья',
        conclusionType: ConclusionType.SOCIAL,
        healthZone: HealthZone.RED
    }
]
