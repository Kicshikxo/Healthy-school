import { PrismaClient, Role, User } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const userData: User = (await readBody(event)).userData

    return await prisma.user.update({
        where: {
            id: userData.id
        },
        data: {
            role: userData.role,
            secondName: userData.secondName,
            firstName: userData.firstName,
            middleName: userData.middleName
        }
    })
})
