import { Class, PrismaClient, Role, User } from '@prisma/client'
import { hashSync } from 'bcrypt'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const userData: User & { organizationId: string; assignedClasses?: Class[] } = (await readBody(event)).userData

    if (!userData)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'userData is not provided'
            })
        )

    return await prisma.user.create({
        data: {
            role: userData.role,
            username: userData.username,
            password: hashSync(userData.password, 8),

            secondName: userData.secondName,
            firstName: userData.firstName,
            middleName: userData.middleName,
            organization: {
                create: {
                    organizationId: userData.organizationId
                }
            },
            classes: {
                createMany: {
                    data: userData.assignedClasses?.map((currentClass) => ({ classId: currentClass.id })) ?? []
                }
            }
        }
    })
})
