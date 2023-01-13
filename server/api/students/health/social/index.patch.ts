import { PrismaClient, Role, SocialHealth, SocialHealthIndicator, SocialHealthRecommendation } from '@prisma/client'
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

    if (tokenData.role !== Role.SOCIAL_PEDAGOGUE) {
        return sendError(
            event,
            createError({
                statusCode: 403,
                statusMessage: 'Role access is forbidden'
            })
        )
    }

    const body: SocialHealth & { indicators: SocialHealthIndicator[]; recommendations: SocialHealthRecommendation[] } =
        await readBody(event)

    return await prisma.socialHealth.update({
        where: {
            studentId: body.studentId
        },
        data: {
            indicators: {
                set: body.indicators.map((indicator) => ({ id: indicator.id }))
            },
            recommendations: {
                set: body.recommendations.map((recommandation) => ({ id: recommandation.id }))
            }
        }
    })
})
