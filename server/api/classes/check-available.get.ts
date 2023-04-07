import { Role } from '@prisma/client'

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const query = getQuery(event) as {
        number: string
        liter: string
        academicYear: string
        organizationId: string
        skipId?: string
    }

    if (!query.number || !query.academicYear || !query.organizationId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'number, academicYear or organizationId is not provided'
            })
        )

    return {
        available: !(await prisma.class.findFirst({
            where: {
                id: { not: query.skipId },
                number: parseInt(query.number),
                liter: query.liter,
                academicYear: query.academicYear,
                organizationId: query.organizationId
            }
        }))
    }
})
