import { PrismaClient, Role, SocialHealth, SocialHealthIndicator, SocialHealthRecommendation } from '@prisma/client'
import checkRole from '~~/server/utils/checkRole'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.SOCIAL_PEDAGOGUE })) return

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
