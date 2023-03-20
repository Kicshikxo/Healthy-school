import { Role } from '@prisma/client'

export const roleLocalization: { [key in Role]: string } = {
    OPERATOR: 'Оператор',
    SCHOOL_OPERATOR: 'Оператор школы',
    CLASS_TEACHER: 'Классный руководитель',
    HEALTH_WORKER: 'Медицинский работник',
    PEDAGOGUE: 'Педагог',
    SOCIAL_PEDAGOGUE: 'Социальный педагог',
    PSYCHOLOGIST: 'Психолог',
    PHYSICAL_EDUCATION_TEACHER: 'Учитель физической культуры'
}

export const localizeRole = (role: Role) => roleLocalization[role]
