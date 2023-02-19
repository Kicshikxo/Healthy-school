import { PhysicalHealth, PhysicalHealthOption, PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.PHYSICAL_EDUCATION_TEACHER })) return

    const body: PhysicalHealth & { options: PhysicalHealthOption[] } = await readBody(event)

    const student = await prisma.physicalHealth.findUnique({
        where: {
            studentId: body.studentId
        },
        select: {
            options: true,
            healthGroup: true
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
            optionsLogs: {
                createMany: {
                    data: body.options
                        .filter((option) => !student?.options.map((option) => option.id).includes(option.id))
                        .map((option) => ({ optionId: option.id }))
                }
            },
            healthGroupLogs: {
                create:
                    student?.healthGroup !== body.healthGroup
                        ? {
                              healthGroup: body.healthGroup
                          }
                        : undefined
            }
        }
    })
})
