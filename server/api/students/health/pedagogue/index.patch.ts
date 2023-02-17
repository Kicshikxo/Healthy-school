import { PedagogueHealth, PedagogueHealthOption, PrismaClient, Role } from '@prisma/client'
import checkRole from '~~/server/utils/checkRole'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.PEDAGOGUE, Role.CLASS_TEACHER] })) return

    const body: PedagogueHealth & { options: PedagogueHealthOption[] } = await readBody(event)

    const studentOptions = await prisma.pedagogueHealth.findUnique({
        where: {
            studentId: body.studentId
        },
        select: {
            options: true
        }
    })

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
