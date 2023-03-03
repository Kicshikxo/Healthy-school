import { HealthZone, PedagogueTab, PedagogueType, SelectionType } from '@prisma/client'

export const pedagogueHealthOptions: {
    title: string
    healthZone: HealthZone
    pedagogueTab: PedagogueTab
    pedagogueType: PedagogueType
    selectionType: SelectionType
    recommendations?: {
        title: string
    }[]
}[] = [
    {
        title: 'Понимает',
        healthZone: HealthZone.GREEN,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.UNDERSTANDING_INSTRUCTIONS,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Частично понимает',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.UNDERSTANDING_INSTRUCTIONS,
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        pedagogueType: PedagogueType.MASTERING_EDUCATION,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Освоено не в полном объёме',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.MASTERING_EDUCATION,
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        pedagogueType: PedagogueType.WORK_PACE,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Средний',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.WORK_PACE,
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        pedagogueType: PedagogueType.ACTIVITY_SPECIFICS,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Действует с незначительной помощью',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.ACTIVITY_SPECIFICS,
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        pedagogueType: PedagogueType.WORKABILITY,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Средняя',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.WORKABILITY,
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        pedagogueType: PedagogueType.HEALTH_LIMITATIONS,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Да, рекомендации реализуются',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.HEALTH_LIMITATIONS,
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        pedagogueType: PedagogueType.DISABILITY,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Да, мероприятия реализуются',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.PEDAGOGUE,
        pedagogueType: PedagogueType.DISABILITY,
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        pedagogueType: PedagogueType.VOICE_DISORDERS,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Незначительные нарушения',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.VOICE_DISORDERS,
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        pedagogueType: PedagogueType.TEMPO_RHYTHMIC_DISORDERS,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Незначительные нарушения',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.TEMPO_RHYTHMIC_DISORDERS,
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        pedagogueType: PedagogueType.SPELLING_DISORDERS,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Мономорфная дислалия (ФН, ФФН, ОНР (III уровень речевого развития), НВОНР)',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.SPELLING_DISORDERS,
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        pedagogueType: PedagogueType.ANATOMO_PHYSIOLOGICAL_DEFECTS,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Нарушения, не влияющие на произносительную сторону речи',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.ANATOMO_PHYSIOLOGICAL_DEFECTS,
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        pedagogueType: PedagogueType.INNERVATION_DISORDERS,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Стертая дизартрия',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.INNERVATION_DISORDERS,
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        pedagogueType: PedagogueType.STRUCTURAL_SEMANTIC_DISORDERS,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Незначительные нарушения',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.STRUCTURAL_SEMANTIC_DISORDERS,
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        pedagogueType: PedagogueType.WRITING_DISORDERS,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Незначительные проявления',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.WRITING_DISORDERS,
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
        pedagogueType: PedagogueType.READING_DISORDERS,
        selectionType: SelectionType.SINGLE
    },
    {
        title: 'Незначительные проявления',
        healthZone: HealthZone.YELLOW,
        pedagogueTab: PedagogueTab.SPEECH_THERAPIST,
        pedagogueType: PedagogueType.READING_DISORDERS,
        selectionType: SelectionType.SINGLE,
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
        selectionType: SelectionType.SINGLE,
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
