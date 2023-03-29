import { PrismaClient, Role, Class } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const classData: Class & { organizationId: string } = (await readBody(event)).classData

    if (!classData)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'classData is not provided'
            })
        )

    return await prisma.class.create({
        data: {
            number: classData.number,
            liter: classData.liter,
            academicYear: classData.academicYear,
            organizationId: classData.organizationId
        }
    })
})
