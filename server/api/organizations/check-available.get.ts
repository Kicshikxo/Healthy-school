import { Role } from '@prisma/client'

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR] })) return

    const query = getQuery(event) as {
        name: string
        skipId?: string
    }

    if (!query.name)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'name is not provided'
            })
        )

    return {
        available: !(await prisma.educationalOrganization.findFirst({
            where: {
                id: { not: query.skipId },
                name: {
                    equals: query.name,
                    mode: 'insensitive'
                }
            }
        }))
    }
})
