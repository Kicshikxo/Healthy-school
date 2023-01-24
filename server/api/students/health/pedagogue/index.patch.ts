import { PedagogueHealth, PedagogueHealthOption, PrismaClient, Role } from '@prisma/client'
import checkRole from '~~/server/utils/checkRole'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.PEDAGOGUE, Role.CLASS_TEACHER] })) return

    const body: PedagogueHealth & { options: PedagogueHealthOption[] } = await readBody(event)

    return await prisma.pedagogueHealth.upsert({
        where: {
            studentId: body.studentId
        },
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
