import { PrismaClient, PsychologicalHealth, PsychologicalHealthOption, Role } from '@prisma/client'
import checkRole from '~~/server/utils/checkRole'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.PSYCHOLOGIST })) return

    const body: PsychologicalHealth & { options: PsychologicalHealthOption[] } = await readBody(event)

    const studentOptions = await prisma.pedagogueHealth.findUnique({
        where: {
            studentId: body.studentId
        },
        select: {
            options: true
        }
    })

    return await prisma.psychologicalHealth.upsert({
        where: {
            studentId: body.studentId
        },
        create: {
            studentId: body.studentId
        },
        update: {
            options: {
                set: body.options.map((option) => ({ id: option.id }))
            },
            specialistNotes: body.specialistNotes,
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
