const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
]

export const monthName = (monthIndex?: number) =>
    typeof monthIndex !== 'undefined' ? monthNames[monthIndex < 0 ? 12 + (monthIndex % 12) : monthIndex] : undefined
