import { MedicalHealth, MedicalHealthOption, PrismaClient, Role } from '@prisma/client'
import checkRole from '~~/server/utils/checkRole'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.HEALTH_WORKER })) return

    const body: MedicalHealth & { options: MedicalHealthOption[] } = await readBody(event)

    const studentOptions = await prisma.medicalHealth.findUnique({
        where: {
            studentId: body.studentId
        },
        select: {
            options: true
        }
    })

    return await prisma.medicalHealth.upsert({
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
