import { PrismaClient, Role } from '@prisma/client'
import { hashSync } from 'bcrypt'
import prompts from 'prompts'
import { localizeRole } from '../../utils/localizeRole.js'
import {
    conclusions,
    medicalHealthOptions,
    pedagogueHealthOptions,
    physicalHealthOptions,
    psychologicalHealthOptions,
    socialHealthOptions
} from './data/index.js'
import { proceedWithSpinner } from './utils.js'

const prisma = new PrismaClient()

async function main() {
    while (true) {
        const { selection } = await prompts({
            type: 'select',
            name: 'selection',
            message: 'Выберите действие',
            hint: ' ',
            choices: [
                {
                    title: 'Сидировать базу данных',
                    value: 'seed'
                },
                {
                    title: 'Добавить данные',
                    value: 'create'
                },
                {
                    title: 'Изменить данные',
                    value: 'change'
                },
                {
                    title: 'Удалить данные',
                    value: 'delete'
                },
                {
                    title: 'Выйти',
                    value: 'exit'
                }
            ]
        })

        if (selection === 'seed') {
            await seedDatabase()
        }
        if (selection === 'create') {
            await createData()
        }
        if (selection === 'change') {
            await changeData()
        }
        if (selection === 'delete') {
            await deleteData()
        }
        if (selection === 'exit' || selection === undefined) {
            return
        }
    }
}

async function seedDatabase() {
    const { selections } = await prompts({
        type: 'multiselect',
        name: 'selections',
        message: 'Выберите данные для сидирования',
        instructions: false,
        choices: [
            {
                value: 'medical-health-options',
                title: 'Опции медицинского здоровья'
            },
            {
                value: 'pedagogue-health-options',
                title: 'Опции педагогического здоровья'
            },
            {
                value: 'physical-health-options',
                title: 'Опции физического здоровья'
            },
            {
                value: 'psychological-health-options',
                title: 'Опции психологического здоровья'
            },
            {
                value: 'social-health-options',
                title: 'Опции социального здоровья'
            },
            {
                value: 'conclusions',
                title: 'Выводы по здоровью'
            }
        ]
    })
    if (selections === undefined) return

    if (selections.includes('medical-health-options')) await seedMedicalOptions()
    if (selections.includes('pedagogue-health-options')) await seedPedagogueOptions()
    if (selections.includes('physical-health-options')) await seedPhysicalOptions()
    if (selections.includes('psychological-health-options')) await seedPsychologicalOptions()
    if (selections.includes('social-health-options')) await seedSocialOptions()
    if (selections.includes('conclusions')) await seedConclusions()
}

async function seedMedicalOptions() {
    const optionsCount = await proceedWithSpinner(prisma.medicalHealthOption.count, {
        text: 'Загрузка опций медицинского здоровья'
    })
    if (optionsCount === undefined) return

    if (optionsCount > 0) {
        const { confirm } = await prompts({
            type: 'toggle',
            name: 'confirm',
            message: `В базе данных уже хранится ${optionsCount} опций медицинского здоровья\nВы уверены что хотите удалить их?`,
            inactive: 'Нет',
            active: 'Да'
        })

        if (confirm !== true) return

        await proceedWithSpinner(prisma.medicalHealthOption.deleteMany, {
            text: 'Удаление опций медицинского здоровья',
            color: 'red'
        })
    }

    await proceedWithSpinner(
        async () => {
            for (const option of medicalHealthOptions) {
                await prisma.medicalHealthOption.create({
                    data: {
                        ...option,
                        recommendations: {
                            create: option.recommendations
                        }
                    }
                })
            }
        },
        {
            text: 'Создание опций медицинского здоровья',
            succeedText: `Создано ${medicalHealthOptions.length} опций медицинского здоровья`
        }
    )
}

async function seedPedagogueOptions() {
    const optionsCount = await proceedWithSpinner(prisma.pedagogueHealthOption.count, {
        text: 'Загрузка опций педагогического здоровья'
    })
    if (optionsCount === undefined) return

    if (optionsCount > 0) {
        const { confirm } = await prompts({
            type: 'toggle',
            name: 'confirm',
            message: `В базе данных уже хранится ${optionsCount} опций педагогического здоровья\nВы уверены что хотите удалить их?`,
            inactive: 'Нет',
            active: 'Да'
        })
        if (confirm !== true) return

        await proceedWithSpinner(prisma.pedagogueHealthOption.deleteMany, {
            text: 'Удаление опций педагогического здоровья',
            color: 'red'
        })
    }

    await proceedWithSpinner(
        async () => {
            for (const option of pedagogueHealthOptions) {
                await prisma.pedagogueHealthOption.create({
                    data: {
                        ...option,
                        recommendations: {
                            create: option.recommendations
                        }
                    }
                })
            }
        },
        {
            text: 'Создание опций педагогического здоровья',
            succeedText: `Создано ${pedagogueHealthOptions.length} опций педагогического здоровья`
        }
    )
}

async function seedPhysicalOptions() {
    const optionsCount = await proceedWithSpinner(prisma.physicalHealthOption.count, {
        text: 'Загрузка опций физического здоровья'
    })
    if (optionsCount === undefined) return

    if (optionsCount > 0) {
        const { confirm } = await prompts({
            type: 'toggle',
            name: 'confirm',
            message: `В базе данных уже хранится ${optionsCount} опций физического здоровья\nВы уверены что хотите удалить их?`,
            inactive: 'Нет',
            active: 'Да'
        })
        if (confirm !== true) return

        await proceedWithSpinner(prisma.physicalHealthOption.deleteMany, {
            text: 'Удаление опций физического здоровья',
            color: 'red'
        })
    }

    await proceedWithSpinner(
        async () => {
            for (const option of physicalHealthOptions) {
                await prisma.physicalHealthOption.create({
                    data: {
                        ...option,
                        recommendations: {
                            create: option.recommendations
                        }
                    }
                })
            }
        },
        {
            text: 'Создание опций физического здоровья',
            succeedText: `Создано ${physicalHealthOptions.length} опций физического здоровья`
        }
    )
}

async function seedPsychologicalOptions() {
    const optionsCount = await proceedWithSpinner(prisma.psychologicalHealthOption.count, {
        text: 'Загрузка опций психологического здоровья'
    })
    if (optionsCount === undefined) return

    if (optionsCount > 0) {
        const { confirm } = await prompts({
            type: 'toggle',
            name: 'confirm',
            message: `В базе данных уже хранится ${optionsCount} опций психологического здоровья\nВы уверены что хотите удалить их?`,
            inactive: 'Нет',
            active: 'Да'
        })
        if (confirm !== true) return

        await proceedWithSpinner(prisma.psychologicalHealthOption.deleteMany, {
            text: 'Удаление опций психологического здоровья',
            color: 'red'
        })
    }

    await proceedWithSpinner(
        async () => {
            for (const option of psychologicalHealthOptions) {
                await prisma.psychologicalHealthOption.create({
                    data: {
                        ...option,
                        recommendations: {
                            create: option.recommendations
                        }
                    }
                })
            }
        },
        {
            text: 'Создание опций психологического здоровья',
            succeedText: `Создано ${psychologicalHealthOptions.length} опций психологического здоровья`
        }
    )
}

async function seedSocialOptions() {
    const optionsCount = await proceedWithSpinner(prisma.socialHealthOption.count, {
        text: 'Загрузка опций социального здоровья'
    })
    if (optionsCount === undefined) return

    if (optionsCount > 0) {
        const { confirm } = await prompts({
            type: 'toggle',
            name: 'confirm',
            message: `В базе данных уже хранится ${optionsCount} опций социального здоровья\nВы уверены что хотите удалить их?`,
            inactive: 'Нет',
            active: 'Да'
        })
        if (confirm !== true) return

        await proceedWithSpinner(prisma.socialHealthOption.deleteMany, {
            text: 'Удаление опций социального здоровья',
            color: 'red'
        })
    }

    await proceedWithSpinner(
        async () => {
            for (const option of socialHealthOptions) {
                await prisma.socialHealthOption.create({
                    data: {
                        ...option,
                        recommendations: {
                            create: option.recommendations
                        }
                    }
                })
            }
        },
        {
            text: 'Создание опций социального здоровья',
            succeedText: `Создано ${socialHealthOptions.length} опций социального здоровья`
        }
    )
}

async function seedConclusions() {
    const conclusionsCount = await proceedWithSpinner(prisma.conclusion.count, {
        text: 'Загрузка выводов по здоровью'
    })
    if (conclusionsCount === undefined) return

    if (conclusionsCount > 0) {
        const { confirm } = await prompts({
            type: 'toggle',
            name: 'confirm',
            message: `В базе данных уже хранится ${conclusionsCount} выводов по здоровью\nВы уверены что хотите удалить их?`,
            inactive: 'Нет',
            active: 'Да'
        })
        if (confirm !== true) return

        await proceedWithSpinner(prisma.conclusion.deleteMany, {
            text: 'Удаление выводов по здоровью',
            color: 'red'
        })
    }

    await proceedWithSpinner(
        async () => {
            for (const option of conclusions) {
                await prisma.conclusion.create({
                    data: {
                        ...option,
                        recommendations: {
                            create: option.recommendations
                        }
                    }
                })
            }
        },
        {
            text: 'Создание выводов по здоровью',
            succeedText: `Создано ${conclusions.length} выводов по здоровью`
        }
    )
}

async function createData() {
    const { selection } = await prompts({
        type: 'select',
        name: 'selection',
        message: 'Выберите вариант добавления',
        hint: ' ',
        choices: [
            {
                value: 'municipality',
                title: 'Создать муниципальное образование'
            },
            {
                value: 'organization',
                title: 'Создать образовательную организацию'
            },
            {
                value: 'user',
                title: 'Создать пользователя'
            },
            {
                value: 'class',
                title: 'Создать класс'
            },
            {
                value: 'student',
                title: 'Создать учащегося'
            }
        ]
    })
    if (selection === undefined) return

    if (selection === 'municipality') await createMunicipality()
    if (selection === 'organization') await createOrganization()
    if (selection === 'user') await createUser()
    if (selection === 'class') await createClass()
    if (selection === 'student') await createStudent()
}

async function createMunicipality() {
    const municipalities = await proceedWithSpinner(prisma.municipality.findMany, {
        text: 'Загрузка муниципальных образований'
    })
    if (municipalities === undefined) return

    const { municipalityName } = await prompts({
        type: 'text',
        name: 'municipalityName',
        message: 'Введите название муниципального образования',
        validate: (value: string) =>
            municipalities.find((municipality) => municipality.name === value)
                ? 'Муниципальное образование с таким названием уже существует'
                : true
    })
    if (municipalityName === undefined) return

    await proceedWithSpinner(
        () =>
            prisma.municipality.create({
                data: { name: municipalityName }
            }),
        { text: 'Создание муниципального образования' }
    )
}

async function createOrganization() {
    const municipalities = await proceedWithSpinner(
        () =>
            prisma.municipality.findMany({
                orderBy: { name: 'asc' }
            }),
        {
            text: 'Загрузка муниципальных образований'
        }
    )
    if (municipalities === undefined) return

    if (municipalities.length === 0) {
        console.log('Сначала создайте муниципальное образование')
        return
    }

    const { municipalityId } = await prompts({
        type: 'select',
        name: 'municipalityId',
        message: 'Выберите муниципальное образование для добавление в него образовательной организации',
        hint: ' ',
        choices: municipalities.map((municipality) => ({
            title: municipality.name,
            value: municipality.id
        }))
    })
    if (municipalityId === undefined) return

    const organizations = await proceedWithSpinner(
        () =>
            prisma.educationalOrganization.findMany({
                where: { municipalityId: municipalityId }
            }),
        {
            text: 'Загрузка образовательных организаций'
        }
    )
    if (organizations === undefined) return

    const { organizationName } = await prompts({
        type: 'text',
        name: 'organizationName',
        message: 'Введите название образовательной организации',
        validate: (value: string) =>
            organizations.find((organization) => organization.name === value)
                ? 'Образовательная организация с таким названием уже существует'
                : true
    })
    if (organizationName === undefined) return

    await proceedWithSpinner(
        () =>
            prisma.educationalOrganization.create({
                data: {
                    name: organizationName,
                    municipalityId: municipalityId
                }
            }),
        { text: 'Создание образовательной организации' }
    )
}

async function createUser() {
    const municipalities = await proceedWithSpinner(
        () =>
            prisma.municipality.findMany({
                orderBy: { name: 'asc' }
            }),
        {
            text: 'Загрузка муниципальных образований'
        }
    )
    if (municipalities === undefined) return

    if (municipalities.length === 0) {
        console.log('Сначала создайте муниципальное образование')
        return
    }

    const { municipalityId } = await prompts({
        type: 'select',
        name: 'municipalityId',
        message: 'Выберите муниципальное образование',
        hint: ' ',
        choices: municipalities.map((municipality) => ({
            title: municipality.name,
            value: municipality.id
        }))
    })
    if (municipalityId === undefined) return

    const organizations = await proceedWithSpinner(
        () =>
            prisma.educationalOrganization.findMany({
                where: { municipalityId: municipalityId },
                orderBy: { name: 'asc' }
            }),
        { text: 'Загрузка образовательных организаций' }
    )
    if (organizations === undefined) return

    if (organizations.length === 0) {
        console.log('Сначала создайте образовательную организацию в выбранном муниципальном образовании')
        return
    }

    const { organizationId } = await prompts({
        type: 'select',
        name: 'organizationId',
        message: 'Выберите образовательную организацию для добавления в неё пользователя',
        hint: ' ',
        choices: organizations
            .map((organization) => ({
                title: organization.name,
                value: organization.id
            }))
            .concat({ title: 'Не указана (только для оператора)', value: 'none' })
    })
    if (organizationId === undefined) return

    const users = await proceedWithSpinner(prisma.user.findMany, { text: 'Загрузка пользователей' })
    if (users === undefined) return

    const userData = await prompts([
        {
            type: 'text',
            name: 'username',
            message: 'Введите имя пользователя (логин)',
            validate: (value: string) => {
                if (!/^[a-zA-Z0-9]+$/.test(value)) return 'Неверный формат логина'
                if (users.find((user) => user.username === value)) return 'Имя пользователя уже используется'

                return true
            }
        },
        {
            type: 'password',
            name: 'password',
            message: 'Введите пароль',
            validate: (value: string) => (value.length < 6 ? 'Слишком короткий пароль' : true)
        },
        {
            type: 'select',
            name: 'role',
            message: 'Выберите роль пользователя',
            hint: ' ',
            choices: (Object.keys(Role) as Role[])
                .filter((role) => !(organizationId === 'none' && role !== Role.OPERATOR))
                .map((role) => ({ title: localizeRole(role), value: role }))
        },
        {
            type: 'text',
            name: 'secondName',
            message: 'Введите фамилию',
            validate: (value: string) => (/^[А-ЯЁ][а-яё]+$/.test(value) ? true : 'Невалидная фамилия')
        },
        {
            type: 'text',
            name: 'firstName',
            message: 'Введите имя',
            validate: (value: string) => (/^[А-ЯЁ][а-яё]+$/.test(value) ? true : 'Невалидное имя')
        },
        {
            type: 'text',
            name: 'middleName',
            message: 'Введите отчество',
            validate: (value: string) => (/^[А-ЯЁ][а-яё]+$/.test(value) ? true : 'Невалидное отчество')
        }
    ])
    if (
        userData.username === undefined ||
        userData.password === undefined ||
        userData.role === undefined ||
        userData.secondName === undefined ||
        userData.firstName === undefined ||
        userData.middleName === undefined
    ) {
        return
    }

    await proceedWithSpinner(
        () =>
            prisma.user.create({
                data: {
                    username: userData.username,
                    password: hashSync(userData.password, 8),

                    firstName: userData.firstName,
                    secondName: userData.secondName,
                    middleName: userData.middleName,

                    role: userData.role,
                    organization:
                        organizationId != 'none'
                            ? {
                                  create: {
                                      organizationId: organizationId
                                  }
                              }
                            : undefined
                }
            }),
        { text: 'Создание пользователя' }
    )
}

async function createClass() {
    const municipalities = await proceedWithSpinner(
        () =>
            prisma.municipality.findMany({
                orderBy: { name: 'asc' }
            }),
        {
            text: 'Загрузка муниципальных образований'
        }
    )
    if (municipalities === undefined) return

    if (municipalities.length === 0) {
        console.log('Сначала создайте муниципальное образование')
        return
    }

    const { municipalityId } = await prompts({
        type: 'select',
        name: 'municipalityId',
        message: 'Выберите муниципальное образование',
        hint: ' ',
        choices: municipalities.map((municipality) => ({
            title: municipality.name,
            value: municipality.id
        }))
    })
    if (municipalityId === undefined) return

    const organizations = await proceedWithSpinner(
        () =>
            prisma.educationalOrganization.findMany({
                where: { municipalityId: municipalityId },
                orderBy: { name: 'asc' }
            }),
        { text: 'Загрузка образовательных организаций' }
    )
    if (organizations === undefined) return

    if (organizations.length === 0) {
        console.log('Сначала создайте образовательную организацию в выбранном муниципальном образовании')
        return
    }

    const { organizationId } = await prompts({
        type: 'select',
        name: 'organizationId',
        message: 'Выберите образовательную организацию для добавления в неё класса',
        hint: ' ',
        choices: organizations.map((organization) => ({
            title: organization.name,
            value: organization.id
        }))
    })
    if (organizationId === undefined) return

    const classData = await prompts([
        {
            type: 'number',
            name: 'number',
            message: 'Введите номер класса',
            min: 1,
            max: 11
        },
        {
            type: 'text',
            name: 'liter',
            message: 'Введите литер класса',
            validate: (value: string) => {
                if (value.length === 0) return true
                if (value.length > 1) return 'Длина литера не может быть больше одного символа'
                if (!/^[А-ЯЁ]$/.test(value)) return 'Неверный формат литера'

                return true
            }
        },
        {
            type: 'date',
            mask: 'YYYY',
            name: 'academicYearStart',
            initial: new Date(),
            message: 'Введите начало учебного года'
        },
        {
            type: 'date',
            mask: 'YYYY',
            name: 'academicYearEnd',
            initial: new Date(),
            message: 'Введите конец учебного года'
        }
    ])
    if (
        classData.number === undefined ||
        classData.liter === undefined ||
        classData.academicYearStart === undefined ||
        classData.academicYearEnd === undefined
    ) {
        return
    }

    await proceedWithSpinner(
        () =>
            prisma.class.create({
                data: {
                    number: classData.number,
                    liter: classData.liter,
                    academicYear: `${classData.academicYearStart.getFullYear()}-${classData.academicYearEnd.getFullYear()}`,
                    organizationId: organizationId
                }
            }),
        { text: 'Создание класса' }
    )
}

async function createStudent() {
    const municipalities = await proceedWithSpinner(
        () =>
            prisma.municipality.findMany({
                orderBy: { name: 'asc' }
            }),
        {
            text: 'Загрузка муниципальных образований'
        }
    )
    if (municipalities === undefined) return

    if (municipalities.length === 0) {
        console.log('Сначала создайте муниципальное образование')
        return
    }

    const { municipalityId } = await prompts({
        type: 'select',
        name: 'municipalityId',
        message: 'Выберите муниципальное образование',
        hint: ' ',
        choices: municipalities.map((municipality) => ({
            title: municipality.name,
            value: municipality.id
        }))
    })
    if (municipalityId === undefined) return

    const organizations = await proceedWithSpinner(
        () =>
            prisma.educationalOrganization.findMany({
                where: { municipalityId: municipalityId },
                orderBy: { name: 'asc' }
            }),
        { text: 'Загрузка образовательных организаций' }
    )
    if (organizations === undefined) return

    if (organizations.length === 0) {
        console.log('Сначала создайте образовательную организацию в выбранном муниципальном образовании')
        return
    }

    const { organizationId } = await prompts({
        type: 'select',
        name: 'organizationId',
        message: 'Выберите образовательную организацию для добавления в неё класса',
        hint: ' ',
        choices: organizations.map((organization) => ({
            title: organization.name,
            value: organization.id
        }))
    })
    if (organizationId === undefined) return

    const classes = await proceedWithSpinner(
        () =>
            prisma.class.findMany({
                where: { organizationId: organizationId },
                orderBy: [{ number: 'asc' }, { liter: 'asc' }]
            }),
        {
            text: 'Загрузка классов'
        }
    )
    if (classes === undefined) return

    if (classes.length === 0) {
        console.log('Классы в выбранной образовательной организации не найдены')
        return
    }

    const { classId } = await prompts({
        type: 'select',
        name: 'classId',
        message: 'Выберите класс для добавление в него учащегося',
        hint: ' ',
        choices: classes.map((_class) => ({
            title: `${_class.number}${_class.liter} - ${_class.academicYear}`,
            value: _class.id
        }))
    })
    if (classId === undefined) return

    const studentData = await prompts([
        {
            type: 'text',
            name: 'snils',
            message: 'Введите СНИЛС',
            validate: (value: string) => (/^\d{3}-\d{3}-\d{3} \d{2}$/.test(value) ? true : 'Неверный формат снилса')
        },
        {
            type: 'text',
            name: 'secondName',
            message: 'Введите фамилию',
            validate: (value: string) => (/^[А-ЯЁ][а-яё]+$/.test(value) ? true : 'Невалидная фамилия')
        },
        {
            type: 'text',
            name: 'firstName',
            message: 'Введите имя',
            validate: (value: string) => (/^[А-ЯЁ][а-яё]+$/.test(value) ? true : 'Невалидное имя')
        },
        {
            type: 'text',
            name: 'middleName',
            message: 'Введите отчество',
            validate: (value: string) => (/^[А-ЯЁ][а-яё]+$/.test(value) ? true : 'Невалидное отчество')
        },
        {
            type: 'toggle',
            name: 'gender',
            message: 'Выберите пол',
            inactive: 'Мужской',
            active: 'Женский'
        },
        {
            type: 'date',
            name: 'birthdate',
            message: 'Введите дату рождения',
            mask: 'DD.MM.YYYY',
            initial: new Date()
        }
    ])
    if (
        studentData.snils === undefined ||
        studentData.secondName === undefined ||
        studentData.firstName === undefined ||
        studentData.middleName === undefined ||
        studentData.gender === undefined ||
        studentData.birthdate === undefined
    ) {
        return
    }

    await proceedWithSpinner(
        () =>
            prisma.student.create({
                data: {
                    snils: studentData.snils,

                    secondName: studentData.secondName,
                    firstName: studentData.firstName,
                    middleName: studentData.middleName,

                    gender: studentData.gender ? 'FEMALE' : 'MALE',
                    birthdate: studentData.birthdate,
                    classId: classId
                }
            }),
        { text: 'Создание учащегося' }
    )
}

async function changeData() {}

async function deleteData() {
    const { selection } = await prompts({
        type: 'select',
        name: 'selection',
        message: 'Выберите вариант удаления',
        hint: ' ',
        choices: [
            {
                value: 'municipality',
                title: 'Удалить муниципальное образование'
            },
            {
                value: 'organization',
                title: 'Удалить образовательную организацию'
            },
            {
                value: 'user',
                title: 'Удалить пользователя'
            },
            {
                value: 'class',
                title: 'Удалить класс'
            },
            {
                value: 'student',
                title: 'Удалить учащегося'
            }
        ]
    })
    if (selection === undefined) return

    if (selection === 'municipality') await deleteMunicipality()
    if (selection === 'organization') await deleteOrganization()
    if (selection === 'user') await deleteUser()
    if (selection === 'class') await deleteClass()
    if (selection === 'student') await deleteStudent()
}

async function deleteMunicipality() {
    const municipalities = await proceedWithSpinner(
        () =>
            prisma.municipality.findMany({
                orderBy: { name: 'asc' }
            }),
        {
            text: 'Загрузка муниципальных образований'
        }
    )
    if (municipalities === undefined) return

    if (municipalities.length === 0) {
        console.log('Муниципальные образования не найдены')
        return
    }

    const { municipalityId } = await prompts({
        type: 'select',
        name: 'municipalityId',
        message: 'Выберите муниципальное образование для удаления',
        hint: ' ',
        choices: municipalities.map((municipality) => ({
            title: municipality.name,
            value: municipality.id
        }))
    })
    if (municipalityId === undefined) return

    const { confirm } = await prompts({
        type: 'toggle',
        name: 'confirm',
        message: `Вы действительно хотите удалить выбранное муниципальное образование?`,
        inactive: 'Нет',
        active: 'Да'
    })
    if (confirm !== true) return

    await proceedWithSpinner(
        () =>
            prisma.municipality.delete({
                where: { id: municipalityId }
            }),
        { text: 'Удаление муниципального образования', color: 'red' }
    )
}

async function deleteOrganization() {
    const municipalities = await proceedWithSpinner(
        () =>
            prisma.municipality.findMany({
                orderBy: { name: 'asc' }
            }),
        {
            text: 'Загрузка муниципальных образований'
        }
    )
    if (municipalities === undefined) return

    if (municipalities.length === 0) {
        console.log('Муниципальные образования не найдены')
        return
    }

    const { municipalityId } = await prompts({
        type: 'select',
        name: 'municipalityId',
        message: 'Выберите муниципальное образование',
        hint: ' ',
        choices: municipalities.map((municipality) => ({
            title: municipality.name,
            value: municipality.id
        }))
    })
    if (municipalityId === undefined) return

    const organizations = await proceedWithSpinner(
        () =>
            prisma.educationalOrganization.findMany({
                where: { municipalityId: municipalityId },
                orderBy: { name: 'asc' }
            }),
        { text: 'Загрузка образовательных организаций' }
    )
    if (organizations === undefined) return

    if (organizations.length === 0) {
        console.log('Образовательные организации в выбранном муниципальном образовании не найдены')
        return
    }

    const { organizationId } = await prompts({
        type: 'select',
        name: 'organizationId',
        message: 'Выберите образовательную организацию для удаления',
        hint: ' ',
        choices: organizations.map((organization) => ({
            title: organization.name,
            value: organization.id
        }))
    })
    if (organizationId === undefined) return

    const { confirm } = await prompts({
        type: 'toggle',
        name: 'confirm',
        message: `Вы действительно хотите удалить выбранную образовательную организацию?`,
        inactive: 'Нет',
        active: 'Да'
    })
    if (confirm !== true) return

    await proceedWithSpinner(
        () =>
            prisma.educationalOrganization.delete({
                where: { id: organizationId }
            }),
        { text: 'Удаление образовательной организации', color: 'red' }
    )
}

async function deleteUser() {
    const municipalities = await proceedWithSpinner(
        () =>
            prisma.municipality.findMany({
                orderBy: { name: 'asc' }
            }),
        {
            text: 'Загрузка муниципальных образований'
        }
    )
    if (municipalities === undefined) return

    if (municipalities.length === 0) {
        console.log('Муниципальные образования не найдены')
        return
    }

    const { municipalityId } = await prompts({
        type: 'select',
        name: 'municipalityId',
        message: 'Выберите муниципальное образование',
        hint: ' ',
        choices: municipalities.map((municipality) => ({
            title: municipality.name,
            value: municipality.id
        }))
    })
    if (municipalityId === undefined) return

    const organizations = await proceedWithSpinner(
        () =>
            prisma.educationalOrganization.findMany({
                where: { municipalityId: municipalityId },
                orderBy: { name: 'asc' }
            }),
        { text: 'Загрузка образовательных организаций' }
    )
    if (organizations === undefined) return

    if (organizations.length === 0) {
        console.log('Образовательные организации в выбранном муниципальном образовании не найдены')
        return
    }

    const { organizationId } = await prompts({
        type: 'select',
        name: 'organizationId',
        message: 'Выберите образовательную организацию для удаления в ней пользователя',
        hint: ' ',
        choices: organizations.map((organization) => ({
            title: organization.name,
            value: organization.id
        }))
    })
    if (organizationId === undefined) return

    const users = await proceedWithSpinner(
        () => prisma.user.findMany({ where: { organization: { organizationId: organizationId } } }),
        {
            text: 'Загрузка пользователей'
        }
    )
    if (users === undefined) return

    if (users.length === 0) {
        console.log('Пользователи в выбранной образовательной организации не найдены')
        return
    }

    const { userId } = await prompts({
        type: 'select',
        name: 'userId',
        message: 'Выберите пользователя для удаления',
        hint: ' ',
        choices: users.map((user) => ({
            title: `${user.username}: ${user.secondName} ${user.firstName} ${user.middleName} - ${localizeRole(user.role)}`,
            value: user.id
        }))
    })
    if (userId === undefined) return

    const { confirm } = await prompts({
        type: 'toggle',
        name: 'confirm',
        message: `Вы действительно хотите удалить выбранного пользователя?`,
        inactive: 'Нет',
        active: 'Да'
    })
    if (confirm !== true) return

    await proceedWithSpinner(
        () =>
            prisma.user.delete({
                where: { id: userId }
            }),
        { text: 'Удаление пользователя', color: 'red' }
    )
}

async function deleteClass() {
    const municipalities = await proceedWithSpinner(
        () =>
            prisma.municipality.findMany({
                orderBy: { name: 'asc' }
            }),
        {
            text: 'Загрузка муниципальных образований'
        }
    )
    if (municipalities === undefined) return

    if (municipalities.length === 0) {
        console.log('Муниципальные образования не найдены')
        return
    }

    const { municipalityId } = await prompts({
        type: 'select',
        name: 'municipalityId',
        message: 'Выберите муниципальное образование',
        hint: ' ',
        choices: municipalities.map((municipality) => ({
            title: municipality.name,
            value: municipality.id
        }))
    })
    if (municipalityId === undefined) return

    const organizations = await proceedWithSpinner(
        () =>
            prisma.educationalOrganization.findMany({
                where: { municipalityId: municipalityId },
                orderBy: { name: 'asc' }
            }),
        { text: 'Загрузка образовательных организаций' }
    )
    if (organizations === undefined) return

    if (organizations.length === 0) {
        console.log('Образовательные организации в выбранном муниципальном образовании не найдены')
        return
    }

    const { organizationId } = await prompts({
        type: 'select',
        name: 'organizationId',
        message: 'Выберите образовательную организацию для удаления в ней класса',
        hint: ' ',
        choices: organizations.map((organization) => ({
            title: organization.name,
            value: organization.id
        }))
    })
    if (organizationId === undefined) return

    const classes = await proceedWithSpinner(
        () =>
            prisma.class.findMany({
                where: { organizationId: organizationId },
                orderBy: [{ number: 'asc' }, { liter: 'asc' }]
            }),
        {
            text: 'Загрузка классов'
        }
    )
    if (classes === undefined) return

    if (classes.length === 0) {
        console.log('Классы в выбранной образовательной организации не найдены')
        return
    }

    const { classId } = await prompts({
        type: 'select',
        name: 'classId',
        message: 'Выберите класс для удаления',
        hint: ' ',
        choices: classes.map((_class) => ({
            title: `${_class.number}${_class.liter} - ${_class.academicYear}`,
            value: _class.id
        }))
    })
    if (classId === undefined) return

    const { confirm } = await prompts({
        type: 'toggle',
        name: 'confirm',
        message: `Вы действительно хотите удалить выбранный класс?`,
        inactive: 'Нет',
        active: 'Да'
    })
    if (confirm !== true) return

    await proceedWithSpinner(
        () =>
            prisma.class.delete({
                where: { id: classId }
            }),
        { text: 'Удаление класса', color: 'red' }
    )
}

async function deleteStudent() {
    const municipalities = await proceedWithSpinner(
        () =>
            prisma.municipality.findMany({
                orderBy: { name: 'asc' }
            }),
        {
            text: 'Загрузка муниципальных образований'
        }
    )
    if (municipalities === undefined) return

    if (municipalities.length === 0) {
        console.log('Муниципальные образования не найдены')
        return
    }

    const { municipalityId } = await prompts({
        type: 'select',
        name: 'municipalityId',
        message: 'Выберите муниципальное образование',
        hint: ' ',
        choices: municipalities.map((municipality) => ({
            title: municipality.name,
            value: municipality.id
        }))
    })
    if (municipalityId === undefined) return

    const organizations = await proceedWithSpinner(
        () =>
            prisma.educationalOrganization.findMany({
                where: { municipalityId: municipalityId },
                orderBy: { name: 'asc' }
            }),
        { text: 'Загрузка образовательных организаций' }
    )
    if (organizations === undefined) return

    if (organizations.length === 0) {
        console.log('Образовательные организации в выбранном муниципальном образовании не найдены')
        return
    }

    const { organizationId } = await prompts({
        type: 'select',
        name: 'organizationId',
        message: 'Выберите образовательную организацию для удаления в ней класса',
        hint: ' ',
        choices: organizations.map((organization) => ({
            title: organization.name,
            value: organization.id
        }))
    })
    if (organizationId === undefined) return

    const classes = await proceedWithSpinner(
        () =>
            prisma.class.findMany({
                where: { organizationId: organizationId },
                orderBy: [{ number: 'asc' }, { liter: 'asc' }]
            }),
        {
            text: 'Загрузка классов'
        }
    )
    if (classes === undefined) return

    if (classes.length === 0) {
        console.log('Классы в выбранной образовательной организации не найдены')
        return
    }

    const { classId } = await prompts({
        type: 'select',
        name: 'classId',
        message: 'Выберите класс',
        hint: ' ',
        choices: classes.map((_class) => ({
            title: `${_class.number}${_class.liter} - ${_class.academicYear}`,
            value: _class.id
        }))
    })
    if (classId === undefined) return

    const students = await proceedWithSpinner(
        () =>
            prisma.student.findMany({
                where: { classId: classId },
                orderBy: [{ secondName: 'asc' }, { firstName: 'asc' }, { middleName: 'asc' }]
            }),
        {
            text: 'Загрузка учащихся'
        }
    )
    if (students === undefined) return

    if (students.length === 0) {
        console.log('Учащихся в выбранном классе не найдено')
        return
    }

    const { studentId } = await prompts({
        type: 'select',
        name: 'studentId',
        message: 'Выберите учащегося для удаления',
        hint: ' ',
        choices: students.map((student) => ({
            title: `${student.secondName} ${student.firstName} ${student.middleName} - ${student.snils}`,
            value: student.id
        }))
    })
    if (studentId === undefined) return

    const { confirm } = await prompts({
        type: 'toggle',
        name: 'confirm',
        message: `Вы действительно хотите удалить выбранного учащегося?`,
        inactive: 'Нет',
        active: 'Да'
    })
    if (confirm !== true) return

    await proceedWithSpinner(
        () =>
            prisma.student.delete({
                where: { id: studentId }
            }),
        { text: 'Удаление учащегося', color: 'red' }
    )
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
    })
