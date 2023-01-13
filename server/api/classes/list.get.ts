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

    return await prisma.class.findMany({
        where: {
            organizationId: tokenData.organizationId
        },
        include: {
            _count: {
                select: {
                    students: true
                }
            }
        }
    })
})
