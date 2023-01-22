import { MedicalHealth, MedicalHealthOption, MedicalHealthRecommendation, PrismaClient, Role } from '@prisma/client'
import checkRole from '~~/server/utils/checkRole'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.HEALTH_WORKER })) return

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
