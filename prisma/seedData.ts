import { Role, HealthZone, HealthGroup, MedicalType } from '@prisma/client'

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
