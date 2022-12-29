import { PrismaClient, SocialHealth } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body: SocialHealth = await readBody(event)

    return await prisma.socialHealth.update({
        where: {
            studentId: body.studentId
        },
        data: {
            indicators: body.indicators,
            individualRecommendations: body.individualRecommendations
        }
    })
})
