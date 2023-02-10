import { PhysicalHealth, PhysicalHealthOption, PrismaClient, Role } from '@prisma/client'
import checkRole from '~~/server/utils/checkRole'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.PHYSICAL_EDUCATION_TEACHER })) return

    const body: PhysicalHealth & { options: PhysicalHealthOption[] } = await readBody(event)

    return prisma.physicalHealth.upsert({
        where: {
            studentId: body.studentId
        },
        create: {
            studentId: body.studentId
        },
        update: {
            healthGroup: body.healthGroup,
            options: {
                set: body.options.map((recommendation) => ({ id: recommendation.id }))
            }
        }
    })
})
