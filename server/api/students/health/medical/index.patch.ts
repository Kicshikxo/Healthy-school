import { MedicalHealth, MedicalHealthOption, MedicalHealthRecommendation, PrismaClient, Role } from '@prisma/client'
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

    if (tokenData.role !== Role.HEALTH_WORKER) {
        return sendError(
            event,
            createError({
                statusCode: 403,
                statusMessage: 'Role access is forbidden'
            })
        )
    }

    const body: MedicalHealth & { options: MedicalHealthOption[]; recommendations: MedicalHealthRecommendation[] } =
        await readBody(event)

    return await prisma.medicalHealth.update({
        where: {
            studentId: body.studentId
        },
        data: {
            options: {
                set: body.options.map((option) => ({ id: option.id }))
            },
            recommendations: {
                set: body.recommendations.map((recommendation) => ({ id: recommendation.id }))
            },
            specialistNotes: body.specialistNotes
        }
    })
})
