import { hashSync } from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import {
    municipality,
    educationalOrganization,
    usersData,
    socialHealthIndicators,
    physicalHealthRecommendations,
    socialHealthRecommendations,
    medicalHealthOptions,
    pedagogueHealthOptions,
    psychologicalHealthOptions,
    conclusions
} from './data'
const prisma = new PrismaClient()

async function main() {
    let municipalityId: string
    try {
        municipalityId = (
            await prisma.municipality.create({
                data: {
                    name: municipality.name
                }
            })
        ).id
        console.log('Создано базовое муниципальное образование')
    } catch (e) {
        municipalityId = (await prisma.municipality.findUnique({
            where: {
                name: municipality.name
            }
        }))!.id
        console.log('Базовое муниципальное образование уже добавлено')
    }

    let organizationId: string
    try {
        organizationId = (
            await prisma.educationalOrganization.create({
                data: {
                    name: educationalOrganization.name,
                    municipality: {
                        connect: {
                            id: municipalityId
                        }
                    }
                }
            })
        ).id
        console.log('Создана базовая образовательная организация')
    } catch (e) {
        organizationId = (await prisma.educationalOrganization.findUnique({
            where: {
                name: educationalOrganization.name
            }
        }))!.id
        console.log('Базовая образовательая организаця уже создана')
    }

    try {
        await prisma.user.createMany({
            data: usersData.map((user) => ({
                username: user.username,
                password: hashSync(user.password, 8),
                role: user.role,

                organizationId: organizationId,

                secondName: 'Иванов',
                firstName: 'Иван',
                middleName: 'Иванович'
            }))
        })

        console.log('Созданы базовые пользователи для работы с системой')
    } catch (e) {
        console.log('Базовые пользователи для работы с системой уже созданы')
    }

    const socialHealthIndicatorsCount = await prisma.socialHealthIndicator.count()
    if (socialHealthIndicatorsCount === 0) {
        await prisma.socialHealthIndicator.createMany({
            data: socialHealthIndicators
        })

        console.log(`Создано ${socialHealthIndicators.length} индикаторов социального здоровья`)
    } else {
        console.log(`В БД уже хранится ${socialHealthIndicatorsCount} социальных индикаторов здоровья`)
    }

    const physicalHealthRecommendationsCount = await prisma.physicalHealthRecommendation.count()
    if (physicalHealthRecommendationsCount === 0) {
        await prisma.physicalHealthRecommendation.createMany({
            data: physicalHealthRecommendations
        })

        console.log(`Создано ${physicalHealthRecommendations.length} рекомендаций по физическому здоровью`)
    } else {
        console.log(`В БД уже хранится ${physicalHealthRecommendationsCount} рекомендаций по физическому здоровью`)
    }

    const socialHealthRecommendationsCount = await prisma.socialHealthRecommendation.count()
    if (socialHealthRecommendationsCount === 0) {
        await prisma.socialHealthRecommendation.createMany({
            data: socialHealthRecommendations
        })

        console.log(`Создано ${socialHealthRecommendations.length} рекомендаций по социальному здоровью`)
    } else {
        console.log(`В БД уже хранится ${socialHealthRecommendationsCount} рекомендаций по социальному здоровью`)
    }

    const medicalHealthOptionsCount = await prisma.medicalHealthOption.count()
    if (medicalHealthOptionsCount === 0) {
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

        console.log(`Создано ${medicalHealthOptions.length} опций медицинского здоровья`)
    } else {
        console.log(`В БД уже хранится ${medicalHealthOptionsCount} опций медицинского здоровья`)
    }

    const pedagogueHealthOptionsCount = await prisma.pedagogueHealthOption.count()
    if (pedagogueHealthOptionsCount === 0) {
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

        console.log(`Создано ${pedagogueHealthOptions.length} опций педагогического здоровья`)
    } else {
        console.log(`В БД уже хранится ${pedagogueHealthOptionsCount} опций педагогического здоровья`)
    }

    const psychologicalHealthOptionsCount = await prisma.psychologicalHealthOption.count()
    if (psychologicalHealthOptionsCount === 0) {
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

        console.log(`Создано ${psychologicalHealthOptions.length} опций психологического здоровья`)
    } else {
        console.log(`В БД уже хранится ${psychologicalHealthOptionsCount} опций психологического здоровья`)
    }

    const conclusionsCount = await prisma.conclusion.count()
    if (conclusionsCount === 0) {
        await prisma.conclusion.createMany({
            data: conclusions
        })

        console.log(`Создано ${conclusions.length} медицинских заключений`)
    } else {
        console.log(`В БД уже хранится ${conclusionsCount} медицинских заключений`)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
