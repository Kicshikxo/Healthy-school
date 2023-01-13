import { PrismaClient, Role, PhysicalHealth, PhysicalHealthRecommendation } from '@prisma/client'
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

    if (tokenData.role !== Role.PHYSICAL_EDUCATION_TEACHER) {
        return sendError(
            event,
            createError({
                statusCode: 403,
                statusMessage: 'Role access is forbidden'
            })
        )
    }

    const body: PhysicalHealth & { recommendations: PhysicalHealthRecommendation[] } = await readBody(event)

    return prisma.physicalHealth.update({
        where: {
            studentId: body.studentId
        },
        data: {
            healthGroup: body.healthGroup,
            recommendations: {
                set: body.recommendations.map((recommendation) => ({ id: recommendation.id }))
            },
            specialistNotes: body.specialistNotes
        }
    })
})
