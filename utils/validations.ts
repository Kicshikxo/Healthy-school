import { EducationalOrganization, Gender, Municipality, Role } from '@prisma/client'

export const validateUsername = (username?: string) => {
    if (!username?.trim()) return 'Введите имя пользователя'
    if (!/^[a-zA-Z0-9]+$/.test(username)) return 'Неверный формат имени пользователя'
    return true
}

export const validatePassword = (password?: string) => {
    if (!password?.trim()) return 'Введите пароль'
    if (!/^[0-9a-zA-Z!@#$%^&*]{8,}$/.test(password)) return 'Неверный формат пароля'
    if (password.length > 50) return 'Слишком длинный пароль'
    return true
}

export const validateRole = (role?: Role) => {
    if (!role) return 'Выберите роль'
    if (
        !Object.keys(Role)
            .filter((role) => role !== Role.OPERATOR)
            .includes(role)
    )
        return 'Неверная роль'
    return true
}

export const validateSecondName = (secondName?: string) => {
    if (!secondName?.trim()) return 'Введите фамилию'
    if (!/^[А-ЯЁ][а-яё]+$/.test(secondName)) return 'Неверный формат фамилии'
    return true
}

export const validateFirstName = (firstName?: string) => {
    if (!firstName?.trim()) return 'Введите имя'
    if (!/^[А-ЯЁ][а-яё]+$/.test(firstName)) return 'Неверный формат имени'
    return true
}

export const validateMiddleName = (middleName?: string) => {
    if (!middleName?.trim()) return 'Введите отчество'
    if (!/^[А-ЯЁ][а-яё]+$/.test(middleName)) return 'Неверный формат отчества'
    return true
}

export const validateClassNumber = (number?: number) => {
    if (!number) return 'Введите номер класса'
    if (number < 1 || number > 11) return 'Номер класса должен находится в диапазоне от 1 до 11'
    return true
}

export const validateClassLiter = (liter?: string) => {
    if (!liter?.trim()) return true
    if (liter.length > 1) return 'Длина литера не может быть больше одного символа'
    if (!/^[А-ЯЁ]$/.test(liter)) return 'Неверный формат литера'
    return true
}

export const validateSnils = (snils?: string) => {
    if (!snils || !/^\d{3}-\d{3}-\d{3}\s\d{2}$/.test(snils)) return 'Неверный формат СНИЛСа'

    const [value, checksum] = snils.split(' ').map((part) => parseInt(part.replace(/\D/g, '')))
    const sum = `${value}`.split('').reduce((acc, value, index) => acc + parseInt(value) * (9 - index), 0)

    const valid =
        (sum < 100 && sum === checksum) ||
        ((sum === 100 || sum === 101) && checksum === 0) ||
        (sum > 101 && (sum % 101 === checksum || (sum % 101 === 100 && checksum === 0)))

    if (!valid) return 'Недействительный СНИЛС'
    return true
}

export const validateGender = (gender?: Gender) => {
    if (!gender) return 'Выберите пол'
    if (![Gender.MALE, Gender.FEMALE].includes(gender)) return 'Неверный пол'
    return true
}

export const validateBirthdate = (birthdate?: Date) => {
    if (!birthdate) return 'Выберите дату рождения'
    if (birthdate > new Date()) return 'Дата рождения не может быть в будущем'
    return true
}

export const validateMunicipality = (municipality?: Municipality) => {
    if (!municipality) return 'Выберите муниципалитет'
    return true
}

export const validateOrganization = (organization?: EducationalOrganization) => {
    if (!organization) return 'Выберите школу'
    return true
}
