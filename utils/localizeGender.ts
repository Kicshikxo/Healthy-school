import { Gender } from '@prisma/client'

export const genderLocalization: { [key in Gender]: string } = {
    MALE: 'Мужской',
    FEMALE: 'Женский'
}

export const localizeGender = (gender: Gender) => genderLocalization[gender]
