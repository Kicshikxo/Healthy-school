import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const body: { userId: string } = await readBody(event)

    if (!body.userId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'userId is not provided'
            })
        )

    return await prisma.user.delete({
        where: {
            id: body.userId
        }
    })
})
