import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const tokenData = event.context.authTokenData as AuthTokenData
    if (!tokenData) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: 'Unable to read token data'
            })
        )
    }

    const query = getQuery(event) as { classId: string }

    return await prisma.student.findMany({
        where: {
            AND: [{ classId: query.classId }, { class: { organizationId: tokenData.organizationId } }]
        },
        orderBy: { secondName: 'asc' },
        include: {
            class: true
        }
    })
})
