import { Class, PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const body: Class = await readBody(event)

    if (!body.id || !body.number || !body.liter || !body.academicYear)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'id, number, liter or academicYear is not provided'
            })
        )

    return await prisma.class.update({
        where: {
            id: body.id
        },
        data: {
            number: body.number,
            liter: body.liter,
            academicYear: body.academicYear
        }
    })
})
