import { PhysicalHealth, PhysicalHealthOption, PrismaClient, Role } from '@prisma/client'
import checkRole from '~~/server/utils/checkRole'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.PHYSICAL_EDUCATION_TEACHER })) return

    const body: PhysicalHealth & { options: PhysicalHealthOption[] } = await readBody(event)

    const studentOptions = await prisma.pedagogueHealth.findUnique({
        where: {
            studentId: body.studentId
        },
        select: {
            options: true
        }
    })

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
            },
            logs: {
                createMany: {
                    data: body.options
                        .filter((option) => !studentOptions?.options.map((option) => option.id).includes(option.id))
                        .map((option) => ({ optionId: option.id }))
                }
            }
        }
    })
})
