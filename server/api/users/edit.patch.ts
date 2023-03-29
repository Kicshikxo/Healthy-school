import { Class, PrismaClient, Role, User } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const userData: User & { assignedClasses?: Class[] } = (await readBody(event)).userData

    if (!userData)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'userData is not provided'
            })
        )

    return await prisma.user.update({
        where: {
            id: userData.id
        },
        data: {
            role: userData.role,
            secondName: userData.secondName,
            firstName: userData.firstName,
            middleName: userData.middleName,
            classes: {
                connectOrCreate: userData.assignedClasses?.map((currentClass) => ({
                    where: {
                        userId_classId: {
                            userId: userData.id,
                            classId: currentClass.id
                        }
                    },
                    create: {
                        classId: currentClass.id
                    }
                }))
            }
        }
    })
})
