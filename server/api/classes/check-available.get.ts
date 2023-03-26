import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const query = getQuery(event) as { number: string; liter: string; academicYear: string; organizationId: string }

    if (!query.number || !query.liter || !query.academicYear || !query.organizationId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'number, liter, academicYear or organizationId is not provided'
            })
        )

    return {
        available: !(await prisma.class.findUnique({
            where: {
                organizationId_number_liter_academicYear: {
                    number: parseInt(query.number),
                    liter: query.liter,
                    academicYear: query.academicYear,
                    organizationId: query.organizationId
                }
            }
        }))
    }
})
