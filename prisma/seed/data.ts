import {
    Role,
    HealthZone,
    HealthGroup,
    MedicalType,
    PedagogueTab,
    PedagogueType,
    EducationType,
    PsychologicalType,
    ConclusionType
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

export const medicalHealthOptions: { title: string; medicalType: MedicalType; healthZone: HealthZone }[] = [
    {
        title: 'Нет',
        medicalType: MedicalType.DISABILITY,
        healthZone: HealthZone.GREEN
    },
    {
        title: 'Да',
        medicalType: MedicalType.DISABILITY,
        healthZone: HealthZone.RED
    },

    {
        title: 'Не болеет',
        medicalType: MedicalType.MORBIDITY,
        healthZone: HealthZone.GREEN
    },
    {
        title: 'Болеет (2-4 раза/год)',
        medicalType: MedicalType.MORBIDITY,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'Болеет (более 4 раз/год)',
        medicalType: MedicalType.MORBIDITY,
        healthZone: HealthZone.RED
    },

    {
        title: 'Регулярно',
        medicalType: MedicalType.BALANCED_DIET,
        healthZone: HealthZone.GREEN
    },
    {
        title: 'Не регулярно',
        medicalType: MedicalType.BALANCED_DIET,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'Нет',
        medicalType: MedicalType.BALANCED_DIET,
        healthZone: HealthZone.RED
    },

    {
        title: 'Нет',
        medicalType: MedicalType.CHRONIC_DISEASES,
        healthZone: HealthZone.GREEN
    },
    {
        title: 'Проблемная наследственность, риск заболеваний',
        medicalType: MedicalType.CHRONIC_DISEASES,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'Да',
        medicalType: MedicalType.CHRONIC_DISEASES,
        healthZone: HealthZone.RED
    },

    {
        title: 'общие офтальмо-гигиенические мероприятия',
        medicalType: MedicalType.VISION,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'очковая или контактная коррекция зрения',
        medicalType: MedicalType.VISION,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'курсы плеоптики и ортоптики по показаниям',
        medicalType: MedicalType.VISION,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'диспансерное наблюдение врача-офтальмолога',
        medicalType: MedicalType.VISION,
        healthZone: HealthZone.RED
    },
    {
        title: 'офтальмо-гигиенические мероприятия',
        medicalType: MedicalType.VISION,
        healthZone: HealthZone.RED
    },
    {
        title: 'очковая или контактная коррекция',
        medicalType: MedicalType.VISION,
        healthZone: HealthZone.RED
    },
    {
        title: 'курсы плеоптики и ортоптики',
        medicalType: MedicalType.VISION,
        healthZone: HealthZone.RED
    },
    {
        title: 'курсы нейротрофической терапии',
        medicalType: MedicalType.VISION,
        healthZone: HealthZone.RED
    },
    {
        title: 'использование тифлоприборов',
        medicalType: MedicalType.VISION,
        healthZone: HealthZone.RED
    },
    {
        title: 'организация специального рабочего места обучающегося с патологией органов зрения',
        medicalType: MedicalType.VISION,
        healthZone: HealthZone.RED
    },
    {
        title: 'обучение на основе применения рельефно-точечной системы обозначений Брайля',
        medicalType: MedicalType.VISION,
        healthZone: HealthZone.RED
    },

    {
        title: 'физиофункциональное лечение',
        medicalType: MedicalType.HEARING,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'консультация аллерголога',
        medicalType: MedicalType.HEARING,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'диспансерное наблюдение врача-оториноларинголога',
        medicalType: MedicalType.HEARING,
        healthZone: HealthZone.RED
    },
    {
        title: 'физиофункциональное лечение',
        medicalType: MedicalType.HEARING,
        healthZone: HealthZone.RED
    },
    {
        title: 'консультация сурдолога',
        medicalType: MedicalType.HEARING,
        healthZone: HealthZone.RED
    },
    {
        title: 'организация специального рабочего места обучающегося с патологией органов слуха',
        medicalType: MedicalType.HEARING,
        healthZone: HealthZone.RED
    },
    {
        title: 'контроль за ношением слуховых аппаратов',
        medicalType: MedicalType.HEARING,
        healthZone: HealthZone.RED
    },
    {
        title: 'занятия с сурдопедагогом',
        medicalType: MedicalType.HEARING,
        healthZone: HealthZone.RED
    },

    {
        title: 'профилактика остеохондроза, спинальной нестабильности (нарушений осанки)',
        medicalType: MedicalType.ORTHOPEDIA,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'диспансерное наблюдение врача-ортопеда',
        medicalType: MedicalType.ORTHOPEDIA,
        healthZone: HealthZone.RED
    },
    {
        title: 'занятия адаптивной (лечебной) физкультурой',
        medicalType: MedicalType.ORTHOPEDIA,
        healthZone: HealthZone.RED
    },
    {
        title: 'специальная физкультурная группа',
        medicalType: MedicalType.ORTHOPEDIA,
        healthZone: HealthZone.RED
    },
    {
        title: 'физиофункциональное лечение',
        medicalType: MedicalType.ORTHOPEDIA,
        healthZone: HealthZone.RED
    },
    {
        title: 'соблюдение статодинамического режима (чередование обучения и отдыха)',
        medicalType: MedicalType.ORTHOPEDIA,
        healthZone: HealthZone.RED
    },
    {
        title: 'ограничение физических нагрузок',
        medicalType: MedicalType.ORTHOPEDIA,
        healthZone: HealthZone.RED
    },
    {
        title: 'коррегирующее амбулаторное/ стационарное лечение',
        medicalType: MedicalType.ORTHOPEDIA,
        healthZone: HealthZone.RED
    },
    {
        title: 'организация специального рабочего места обучающегося с патологией опорно-двигательного аппарата',
        medicalType: MedicalType.ORTHOPEDIA,
        healthZone: HealthZone.RED
    },

    {
        title: 'соблюдение индивидуальной диеты',
        medicalType: MedicalType.GASTROINTESTINAL,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'организация режима сбалансированного питания',
        medicalType: MedicalType.GASTROINTESTINAL,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'обеспечение полноценного и сбалансированного питания',
        medicalType: MedicalType.GASTROINTESTINAL,
        healthZone: HealthZone.RED
    },
    {
        title: 'соблюдение диеты (№ 1, 3, 4, 5, 15), дробного питания (5-6 раз в сутки)',
        medicalType: MedicalType.GASTROINTESTINAL,
        healthZone: HealthZone.RED
    },
    {
        title: 'соблюдение санитарно-гигиенического режима/дефекации',
        medicalType: MedicalType.GASTROINTESTINAL,
        healthZone: HealthZone.RED
    },
    {
        title: 'освобождение от занятий физической культурой на период обострения',
        medicalType: MedicalType.GASTROINTESTINAL,
        healthZone: HealthZone.RED
    },
    {
        title: 'подготовительная физкультурная группа (в период ремиссии)',
        medicalType: MedicalType.GASTROINTESTINAL,
        healthZone: HealthZone.RED
    },
    {
        title: 'специальная физкультурная группа (в период реконвалесценции)',
        medicalType: MedicalType.GASTROINTESTINAL,
        healthZone: HealthZone.RED
    },
    {
        title: 'основная физкультурная группа (в период стойкой ремиссии)',
        medicalType: MedicalType.GASTROINTESTINAL,
        healthZone: HealthZone.RED
    },
    {
        title: 'ограничение физической нагрузки (исключение глубоких наклонов, длительного пребывания в согнутом положении, поднятия руками тяжестей более 8-10 кг на обе руки, физических упражнений связанных с перенапряжением мышц брюшного пресса)',
        medicalType: MedicalType.GASTROINTESTINAL,
        healthZone: HealthZone.RED
    },
    {
        title: 'специальная организация сна с приподнятым головным концом кровати (не менее чем на 15 см)',
        medicalType: MedicalType.GASTROINTESTINAL,
        healthZone: HealthZone.RED
    },

    {
        title: 'регулярный прием витаминов и ноотропов',
        medicalType: MedicalType.NEUROLOGY_PSYCHIATRY,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'профилактика  артериальной гипо- и гипертензии, нарушений сна, других форм неврозов',
        medicalType: MedicalType.NEUROLOGY_PSYCHIATRY,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'физиофункциональное лечение вегетососудистой дистонии, неврозов  (ЛФК, массаж, электрофорез, электросон, лазер, магнит и др.)',
        medicalType: MedicalType.NEUROLOGY_PSYCHIATRY,
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'диспансерное наблюдение врача-невролога',
        medicalType: MedicalType.NEUROLOGY_PSYCHIATRY,
        healthZone: HealthZone.RED
    },
    {
        title: 'диспансерное наблюдение врача-психиатра',
        medicalType: MedicalType.NEUROLOGY_PSYCHIATRY,
        healthZone: HealthZone.RED
    },
    {
        title: 'амбулаторное и стационарное обследование и медикаментозное лечение',
        medicalType: MedicalType.NEUROLOGY_PSYCHIATRY,
        healthZone: HealthZone.RED
    },
    {
        title: 'прием ноотропов и витаминов',
        medicalType: MedicalType.NEUROLOGY_PSYCHIATRY,
        healthZone: HealthZone.RED
    },
    {
        title: 'своевременное проведение реабилитационных и абилитационных процедур (ЛФК, массаж, физиотерапевтическое лечение)',
        medicalType: MedicalType.NEUROLOGY_PSYCHIATRY,
        healthZone: HealthZone.RED
    },
    {
        title: 'организация режима правильных физических нагрузок (занятия физкультурой в спецгруппе)',
        medicalType: MedicalType.NEUROLOGY_PSYCHIATRY,
        healthZone: HealthZone.RED
    },
    {
        title: 'индивидуальный режим организации учебной нагрузки',
        medicalType: MedicalType.NEUROLOGY_PSYCHIATRY,
        healthZone: HealthZone.RED
    },
    {
        title: 'дозированный режим труда и отдыха',
        medicalType: MedicalType.NEUROLOGY_PSYCHIATRY,
        healthZone: HealthZone.RED
    },
    {
        title: 'сопровождение профильными специалистами',
        medicalType: MedicalType.NEUROLOGY_PSYCHIATRY,
        healthZone: HealthZone.RED
    }
]

export const medicalHealthRecommendations: { title: string; healthZone: HealthZone }[] = [
    {
        title: 'рациональная физическая нагрузка и исполнение требований гигиенических нормативов',
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'регулярные занятия физической культурой и соблюдение режима дня',
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'прогулки на свежем воздухе и закаливание',
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'полноценное и сбалансированное питание',
        healthZone: HealthZone.YELLOW
    },
    {
        title: 'Проведение профилактических бесед о пагубном воздействии вредных привычек на здоровье человека',
        healthZone: HealthZone.YELLOW
    },

    {
        title: 'рациональная физическая нагрузка и исполнение требований гигиенических нормативов',
        healthZone: HealthZone.RED
    },
    {
        title: 'регулярные занятия физической культурой и соблюдение режима дня',
        healthZone: HealthZone.RED
    },
    {
        title: 'прогулки на свежем воздухе и закаливание',
        healthZone: HealthZone.RED
    },
    {
        title: 'полноценное и сбалансированное питание',
        healthZone: HealthZone.RED
    },
    {
        title: 'проведение профилактических бесед о пагубном воздействии вредных привычек на здоровье человека',
        healthZone: HealthZone.RED
    },
    {
        title: 'направление на ПМПК для решения вопроса о создании специальных образовательных условий',
        healthZone: HealthZone.RED
    }
]

export const pedagogueHealthOptions: {
    title: string
    healthZone: HealthZone
    pedagogueTab: PedagogueTab
    pedagogueType: PedagogueType
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
        pedagogueType: PedagogueType.UNDERSTANDING_INSTRUCTIONS
    },
    {
        title: 'Не понимает',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.UNDERSTANDING_INSTRUCTIONS
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
        pedagogueType: PedagogueType.MASTERING_EDUCATION
    },
    {
        title: 'Не освоено',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.MASTERING_EDUCATION
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
        pedagogueType: PedagogueType.WORK_PACE
    },
    {
        title: 'Низкий',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.WORK_PACE
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
        pedagogueType: PedagogueType.ACTIVITY_SPECIFICS
    },
    {
        title: 'Действует с существенной помощью',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.ACTIVITY_SPECIFICS
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
        pedagogueType: PedagogueType.WORKABILITY
    },
    {
        title: 'Низкая',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.WORKABILITY
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
        pedagogueType: PedagogueType.HEALTH_LIMITATIONS
    },
    {
        title: 'Да, рекомендации не реализуются',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.HEALTH_LIMITATIONS
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
        pedagogueType: PedagogueType.DISABILITY
    },
    {
        title: 'Да, мероприятия не реализуются',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.DISABILITY
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
        pedagogueType: PedagogueType.VOICE_DISORDERS
    },
    {
        title: 'Ринофония',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.VOICE_DISORDERS
    },
    {
        title: 'Дисфония',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.VOICE_DISORDERS
    },
    {
        title: 'Афония',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.VOICE_DISORDERS
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
        pedagogueType: PedagogueType.TEMPO_RHYTHMIC_DISORDERS
    },
    {
        title: 'Заикание',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.TEMPO_RHYTHMIC_DISORDERS
    },
    {
        title: 'Брадилалия',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.TEMPO_RHYTHMIC_DISORDERS
    },
    {
        title: 'Тахилалия',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.TEMPO_RHYTHMIC_DISORDERS
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
        pedagogueType: PedagogueType.SPELLING_DISORDERS
    },
    {
        title: 'Полиморфная дислалия (ОНР (II, III уровень речевого развития))',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.SPELLING_DISORDERS
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
        pedagogueType: PedagogueType.ANATOMO_PHYSIOLOGICAL_DEFECTS
    },
    {
        title: 'Ринолалия различной формы и этиологии',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.ANATOMO_PHYSIOLOGICAL_DEFECTS
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
        pedagogueType: PedagogueType.INNERVATION_DISORDERS
    },
    {
        title: 'Выраженные дизартрические проявления',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.INNERVATION_DISORDERS
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
        pedagogueType: PedagogueType.STRUCTURAL_SEMANTIC_DISORDERS
    },
    {
        title: 'Афазия',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.STRUCTURAL_SEMANTIC_DISORDERS
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
        pedagogueType: PedagogueType.WRITING_DISORDERS
    },
    {
        title: 'Дисграфия',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.WRITING_DISORDERS
    },
    {
        title: 'Дизорфография',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.WRITING_DISORDERS
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
        pedagogueType: PedagogueType.READING_DISORDERS
    },
    {
        title: 'Дислексия',
        healthZone: HealthZone.RED,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.READING_DISORDERS
    }
]

export const psychologicalHealthOptions: {
    title: string
    healthZone: HealthZone
    educationType: EducationType
    psychologicalType: PsychologicalType
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
        psychologicalType: PsychologicalType.MOTIVATION
    },
    {
        title: 'Низкая',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.MOTIVATION
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
        psychologicalType: PsychologicalType.ADAPTATION
    },
    {
        title: 'Дезадаптация',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.ADAPTATION
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
        psychologicalType: PsychologicalType.SOCIOMETRY
    },
    {
        title: 'Аутсайдер',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.SOCIOMETRY
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
        psychologicalType: PsychologicalType.SELF_ASSESSMENT
    },
    {
        title: 'Заниженная/завышенная',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.SELF_ASSESSMENT
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
        psychologicalType: PsychologicalType.ANXIETY
    },
    {
        title: 'Высокий уровень – от 75% или ее отсутствие',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.ANXIETY
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
        psychologicalType: PsychologicalType.AGGRESSIVITY
    },
    {
        title: 'Выраженная',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.AGGRESSIVITY
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
        psychologicalType: PsychologicalType.EXTRACURRICULAR_ABILITIES
    },
    {
        title: 'Отсутствуют',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.EXTRACURRICULAR_ABILITIES
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
        psychologicalType: PsychologicalType.BULLYING
    },
    {
        title: 'Да',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.BULLYING
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
        psychologicalType: PsychologicalType.CONFLICTUALITY
    },
    {
        title: 'Выраженная конфликтная позиция',
        healthZone: HealthZone.RED,
        educationType: EducationType.PRIMARY,
        psychologicalType: PsychologicalType.CONFLICTUALITY
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
        psychologicalType: PsychologicalType.MOTIVATION
    },
    {
        title: 'Низкая',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.MOTIVATION
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
        psychologicalType: PsychologicalType.ADAPTATION
    },
    {
        title: 'Дезадаптация',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.ADAPTATION
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
        psychologicalType: PsychologicalType.SOCIOMETRY
    },
    {
        title: 'Аутсайдер',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.SOCIOMETRY
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
        psychologicalType: PsychologicalType.SELF_ASSESSMENT
    },
    {
        title: 'Заниженная/завышенная',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.SELF_ASSESSMENT
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
        psychologicalType: PsychologicalType.PERSONAL_ANXIETY
    },
    {
        title: 'Высокая – от 46%',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.PERSONAL_ANXIETY
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
        psychologicalType: PsychologicalType.AGGRESSIVITY
    },
    {
        title: 'Выраженная',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.AGGRESSIVITY
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
        psychologicalType: PsychologicalType.EXTRACURRICULAR_ABILITIES
    },
    {
        title: 'Отсутствуют',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.EXTRACURRICULAR_ABILITIES
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
        psychologicalType: PsychologicalType.DEVIANT_BEHAVIOR
    },
    {
        title: 'СОП – социально обусловленное поведение',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.DEVIANT_BEHAVIOR
    },
    {
        title: 'ДП – делинквентное поведение',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.DEVIANT_BEHAVIOR
    },
    {
        title: 'ЗП – зависимое (аддиктивное) поведение',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.DEVIANT_BEHAVIOR
    },
    {
        title: 'АП – агрессивное поведение',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.DEVIANT_BEHAVIOR
    },
    {
        title: 'СП – суицидальное (аутоагрессивное) поведение',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.DEVIANT_BEHAVIOR
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
        psychologicalType: PsychologicalType.PROFESSIONAL_INTERESTS
    },
    {
        title: 'Нет',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.PROFESSIONAL_INTERESTS
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
        psychologicalType: PsychologicalType.BULLYING
    },
    {
        title: 'Да',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.BULLYING
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
        psychologicalType: PsychologicalType.CONFLICTUALITY
    },
    {
        title: 'Выраженная конфликтная позиция',
        healthZone: HealthZone.RED,
        educationType: EducationType.BASIC,
        psychologicalType: PsychologicalType.CONFLICTUALITY
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
        psychologicalType: PsychologicalType.CULTURAL_VALUES
    },
    {
        title: 'Низкий',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.CULTURAL_VALUES
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
        psychologicalType: PsychologicalType.ADAPTATION
    },
    {
        title: 'Дезадаптация',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.ADAPTATION
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
        psychologicalType: PsychologicalType.SOCIOMETRY
    },
    {
        title: 'Аутсайдер',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.SOCIOMETRY
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
        psychologicalType: PsychologicalType.SELF_ASSESSMENT
    },
    {
        title: 'Заниженная/завышенная',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.SELF_ASSESSMENT
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
        psychologicalType: PsychologicalType.AGGRESSIVITY
    },
    {
        title: 'Выраженная',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.AGGRESSIVITY
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
        psychologicalType: PsychologicalType.PERSONAL_ANXIETY
    },
    {
        title: 'Высокая – от 46%',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.PERSONAL_ANXIETY
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
        psychologicalType: PsychologicalType.BULLYING
    },
    {
        title: 'Да',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.BULLYING
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
        psychologicalType: PsychologicalType.CONFLICTUALITY
    },
    {
        title: 'Выраженная конфликтная позиция',
        healthZone: HealthZone.RED,
        educationType: EducationType.MIDDLE,
        psychologicalType: PsychologicalType.CONFLICTUALITY
    }
]

export const conclusions: { title: string; conclusionType: ConclusionType; healthZone: HealthZone }[] = [
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
        title: 'Впециальная группа для занятий физической культурой',
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
