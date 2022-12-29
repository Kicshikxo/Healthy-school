import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    return await prisma.student.findUnique({
        where: { id: query.id as string },
        include: {
            physicalHealth: {
                select: {
                    healthGroup: true,
                    individualRecommendations: true,
                    specialistRecommendations: true
                }
            },
            medicalHealth: {
                select: {
                    studentId: true
                }
            },
            socialHealth: {
                select: {
                    indicators: true,
                    individualRecommendations: true
                }
            }
        }
    })
})
