import { HealthZone, Role } from '@prisma/client'

export const userData = {
    username: 'admin',
    password: 'admin',
    role: Role.OPERATOR
}

export const socialHealthIndicators = [
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
    },
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
    }
]
