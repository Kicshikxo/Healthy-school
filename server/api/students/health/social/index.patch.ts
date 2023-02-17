import { PrismaClient, Role, SocialHealth, SocialHealthOption } from '@prisma/client'
import checkRole from '~~/server/utils/checkRole'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.SOCIAL_PEDAGOGUE })) return

    const body: SocialHealth & { options: SocialHealthOption[] } = await readBody(event)

    const studentOptions = await prisma.pedagogueHealth.findUnique({
        where: {
            studentId: body.studentId
        },
        select: {
            options: true
        }
    })

    return await prisma.socialHealth.upsert({
        where: {
            studentId: body.studentId
        },
        create: {
            studentId: body.studentId
        },
        update: {
            options: {
                set: body.options.map((indicator) => ({ id: indicator.id }))
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
