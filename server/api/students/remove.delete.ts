import { PrismaClient, Role } from '@prisma/client'
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

    if (tokenData.role !== Role.CLASS_TEACHER) {
        return sendError(
            event,
            createError({
                statusCode: 403,
                statusMessage: 'Role access is forbidden'
            })
        )
    }

    const body: { studentId: string } = await readBody(event)

    return await prisma.student.delete({
        where: {
            id: body.studentId
        },
        include: {
            physicalHealth: true,
            medicalHealth: true,
            socialHealth: true
        }
    })
})
