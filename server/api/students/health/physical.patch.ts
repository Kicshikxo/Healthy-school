import { PrismaClient, PhysicalHealth } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body: PhysicalHealth = await readBody(event)

    return prisma.physicalHealth.update({
        where: {
            studentId: body.studentId
        },
        data: {
            healthGroup: body.healthGroup,
            individualRecommendations: body.individualRecommendations!,
            specialistRecommendations: body.specialistRecommendations
        }
    })
})
