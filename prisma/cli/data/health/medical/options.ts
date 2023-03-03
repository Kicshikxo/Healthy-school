import { HealthZone, MedicalType, SelectionType } from '@prisma/client'

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
                title: 'Профилактика артериальной гипо- и гипертензии, нарушений сна, других форм неврозов'
            },
            {
                title: 'Физиофункциональное лечение вегетососудистой дистонии, неврозов (ЛФК, массаж, электрофорез, электросон, лазер, магнит и др.)'
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
