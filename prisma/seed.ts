import crc32 from 'crc/crc32'
import { hashSync } from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { socialHealthIndicators, userData } from './seedData'
const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.user.create({
            data: {
                id: crc32(userData.username).toString(16),
                username: userData.username,
                password: hashSync(userData.password, 8),
                role: userData.role,

                secondName: 'Иванов',
                firstName: 'Иван',
                middleName: 'Иванович'
            }
        })

        console.log(
            `Создан базовый пользователь для работы с системой:\n\tЛогин: ${userData.username}\n\tПароль: ${userData.password}\n\tРоль: ${userData.role}`
        )
    } catch (e) {
        console.log(
            `Базовый пользователь для работы с системой уже создан (${userData.username}:${userData.password}) или произошла ошибка добавления`
        )
    }

    const socialHealthIndicatorsCount = await prisma.socialHealthIndicator.count()

    if (socialHealthIndicatorsCount === 0) {
        await prisma.socialHealthIndicator.createMany({
            data: socialHealthIndicators as any
        })

        console.log(`Создано ${socialHealthIndicators.length} социальных индикаторов здоровья`)
    } else {
        console.log(`В БД уже хранится ${socialHealthIndicatorsCount} социальных индикаторов здоровья`)
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
