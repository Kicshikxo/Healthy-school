import { PedagogueHealth, PedagogueHealthOption, PrismaClient, Role } from '@prisma/client'
import checkRole from '~~/server/utils/checkRole'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.PEDAGOGUE })) return

    const body: PedagogueHealth & { options: PedagogueHealthOption[] } = await readBody(event)

    return await prisma.pedagogueHealth.update({
        where: { studentId: body.studentId },
        data: {
            options: {
                set: body.options.map((option) => ({ id: option.id }))
            }
        }
    })
})
