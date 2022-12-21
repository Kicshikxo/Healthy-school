import { PrismaClient, Role } from '@prisma/client'
import { hashSync } from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
    const userData = {
        login: 'admin',
        password: 'admin',
        role: Role.OPERATOR
    }

    const operator = await prisma.user.create({
        data: {
            login: userData.login,
            password: hashSync(userData.password, 8),
            role: userData.role,

            secondName: 'Иванов',
            firstName: 'Иван',
            middleName: 'Иванович'
        }
    })

    console.log(
        `Создан базовый пользователь для работы с системой:\n\tЛогин: ${userData.login}\n\tПароль: ${userData.password}\n\tРоль: ${userData.role}`
    )
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
