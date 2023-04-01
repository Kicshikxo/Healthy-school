import { Class, PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const body: Class & { organizationId: string } = await readBody(event)

    if (!body.number || !body.liter || !body.academicYear || !body.organizationId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'number, liter, academicYear or organizationId is not provided'
            })
        )

    return await prisma.class.create({
        data: {
            number: body.number,
            liter: body.liter,
            academicYear: body.academicYear,
            organizationId: body.organizationId
        }
    })
})
