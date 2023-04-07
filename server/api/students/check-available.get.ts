import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const query = getQuery(event) as { snils: string; skipId?: string }

    if (!query.snils)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'snils is not provided'
            })
        )

    return {
        available: !(await prisma.student.findFirst({
            where: {
                id: { not: query.skipId },
                snils: query.snils
            }
        }))
    }
})
