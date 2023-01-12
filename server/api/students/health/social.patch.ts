import { PrismaClient, SocialHealth, SocialHealthIndicator } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body: SocialHealth & { indicators: SocialHealthIndicator[] } = await readBody(event)

    return await prisma.socialHealth.update({
        where: {
            studentId: body.studentId
        },
        data: {
            indicators: {
                set: body.indicators.map((indicator) => ({ id: indicator.id }))
            },
            individualRecommendations: body.individualRecommendations
        },
        include: {
            indicators: true
        }
    })
})
