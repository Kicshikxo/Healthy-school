import { HealthGroup, HealthZone, PhysicalType, SelectionType } from '@prisma/client'

export const physicalHealthOptions: {
    title: string
    healthZone: HealthZone
    healthGroup: HealthGroup
    physicalType: PhysicalType
    selectionType: SelectionType
    recommendations?: { title: string }[]
}[] = [
    {
        title: 'Соответствует нормативам',
        healthZone: HealthZone.GREEN,
        healthGroup: HealthGroup.BASIC,
        physicalType: PhysicalType.PHYSICAL_TRAINING,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Не соответствует нормативам',
        healthZone: HealthZone.GREEN,
        healthGroup: HealthGroup.BASIC,
        physicalType: PhysicalType.PHYSICAL_TRAINING,
        selectionType: SelectionType.SINGLE,
        recommendations: [
            {
                title: 'Выполнение комплексов специальных упражнений для улучшения показателей конкретного двигательного качества или физической подготовки в целом (по рекомендации учителя физической культуры)'
            }
        ]
    },

    {
        title: 'Соответствуют',
        healthZone: HealthZone.YELLOW,
        healthGroup: HealthGroup.PREPARATORY,
        physicalType: PhysicalType.FUNCTIONAL_INDICATORS,
        selectionType: SelectionType.SINGLE,
        recommendations: [
            {
                title: 'Проведение физических упражнений, дозированных по интенсивности и продолжительности'
            },
            {
                title: 'Циклические виды упражнений, а также регулярные физические нагрузки высокой и субмаксимальной интенсивности в тренировочном режиме без ограничений уровня повседневной физической активности'
            }
        ]
    },
    {
        title: 'Не соответствуют',
        healthZone: HealthZone.YELLOW,
        healthGroup: HealthGroup.PREPARATORY,
        physicalType: PhysicalType.FUNCTIONAL_INDICATORS,
        selectionType: SelectionType.SINGLE,
        recommendations: [
            {
                title: 'Проведение физических упражнений, дозированных по интенсивности и продолжительности'
            },
            {
                title: 'Оздоровительный бег, ходьба, плавание, пеший туризм, а также регулярное выполнение дыхательной гимнастики на уроках физической культуры и самостоятельно по методике А.Н. Стрельниковой'
            }
        ]
    },

    {
        title: 'Соответствует возрасту',
        healthZone: HealthZone.YELLOW,
        healthGroup: HealthGroup.PREPARATORY,
        physicalType: PhysicalType.PHYSICAL_DEVELOPMENT,
        selectionType: SelectionType.SINGLE,
        recommendations: [
            {
                title: 'Соблюдение здорового образа жизни, режима сбалансированного питания и высокого уровня повседневной двигательной активности'
            }
        ]
    },
    {
        title: 'Не соответствует возрасту',
        healthZone: HealthZone.YELLOW,
        healthGroup: HealthGroup.PREPARATORY,
        physicalType: PhysicalType.PHYSICAL_DEVELOPMENT,
        selectionType: SelectionType.SINGLE,
        recommendations: [
            {
                title: 'Консультирование врачом-эндокринологом, диетологом, соблюдение рекомендаций'
            },
            {
                title: 'Исключение психологической причины лишнего веса (еда от скуки, от стресса, от одиночества)'
            },
            {
                title: 'Обеспечение ежедневной физической активности не менее 60 минут в день умеренной интенсивности, выполнение комплекса утренней гигиенической гимнастики, увеличение привычной дозы физической двигательной активности'
            }
        ]
    },

    {
        title: 'Соответствует нормативам',
        healthZone: HealthZone.YELLOW,
        healthGroup: HealthGroup.PREPARATORY,
        physicalType: PhysicalType.PHYSICAL_TRAINING,
        selectionType: SelectionType.SINGLE,
        recommendations: [
            {
                title: 'Развитие двигательных качеств с целью повышения функциональных возможностей организма, обогащение и расширение двигательного опыта посредством овладения новыми более сложными двигательными действиями, сдача учебных нормативов и норм Всероссийского физкультурно-спортивного комплекса «Готов к труду и обороне» (ГТО)'
            }
        ]
    },
    {
        title: 'Не соответствует нормативам',
        healthZone: HealthZone.YELLOW,
        healthGroup: HealthGroup.PREPARATORY,
        physicalType: PhysicalType.PHYSICAL_TRAINING,
        selectionType: SelectionType.SINGLE,
        recommendations: [
            {
                title: 'Повышение уровня физической подготовленности в ходе уроков физической культуры, секционных занятий, а также дополнительных занятий в группах ОФП, выполнение комплексов специальных упражнений для улучшения показателей конкретного двигательного качества или физической подготовки в целом (по рекомендации учителя физической культуры)'
            }
        ]
    },

    {
        title: 'Не соответствуют',
        healthZone: HealthZone.RED,
        healthGroup: HealthGroup.SPECIAL,
        physicalType: PhysicalType.FUNCTIONAL_INDICATORS,
        selectionType: SelectionType.SINGLE,
        recommendations: [
            {
                title: 'Расширение диапазона функциональных возможностей физиологических систем организма'
            },
            {
                title: 'Обучение самоконтролю здоровья при выполнении физических упражнений'
            },
            {
                title: 'Овладение комплексами упражнений, благоприятно воздействующими на состояние организма с учетом имеющегося заболевания'
            },
            {
                title: 'Укрепление сердечно-сосудистой и дыхательной систем'
            },
            {
                title: 'Использование дыхательных, корригирующих и общеразвивающих упражнений'
            }
        ]
    },
    {
        title: 'Не соответвует возрасту',
        healthZone: HealthZone.RED,
        healthGroup: HealthGroup.SPECIAL,
        physicalType: PhysicalType.PHYSICAL_DEVELOPMENT,
        selectionType: SelectionType.SINGLE,
        recommendations: [
            {
                title: 'Профилактика соматических нарушений: формирование и коррекция осанки, профилактика плоскостопия, коррекция массы тела и др.'
            },
            {
                title: 'Адаптация организма к воздействию физических нагрузок'
            },
            {
                title: 'Коррекция показателей физического развития и способностей'
            }
        ]
    },
    {
        title: 'Не соответствует нормативам',
        healthZone: HealthZone.RED,
        healthGroup: HealthGroup.SPECIAL,
        physicalType: PhysicalType.PHYSICAL_TRAINING,
        selectionType: SelectionType.SINGLE,
        recommendations: [
            {
                title: 'Организация физкультурных занятий по индивидуальной программе'
            },
            {
                title: 'Строгое дозирование физической нагрузки'
            },
            {
                title: 'Обучение основам техники движений и навыков'
            },
            {
                title: 'Коррекция и развитие координационных способностей, физической подготовленности'
            },
            {
                title: 'Воспитание умения самостоятельно заниматься физическими упражнениями, сознательно применять их в целях отдыха, тренировки, повышения работоспособности'
            }
        ]
    }
]
