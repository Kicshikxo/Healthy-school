import { PrismaClient, PsychologicalHealth, PsychologicalHealthOption, Role } from '@prisma/client'
import checkRole from '~~/server/utils/checkRole'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.PSYCHOLOGIST })) return

    const body: PsychologicalHealth & { options: PsychologicalHealthOption[] } = await readBody(event)

    return await prisma.psychologicalHealth.upsert({
        where: { studentId: body.studentId },
        create: {
            studentId: body.studentId
        },
        update: {
            options: {
                set: body.options.map((option) => ({ id: option.id }))
            }
        }
    })
})
