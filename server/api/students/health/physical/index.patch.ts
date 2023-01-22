import { PhysicalHealth, PhysicalHealthRecommendation, PrismaClient, Role } from '@prisma/client'
import checkRole from '~~/server/utils/checkRole'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.PHYSICAL_EDUCATION_TEACHER })) return

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
