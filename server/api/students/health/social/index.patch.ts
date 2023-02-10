import { PrismaClient, Role, SocialHealth, SocialHealthOption } from '@prisma/client'
import checkRole from '~~/server/utils/checkRole'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.SOCIAL_PEDAGOGUE })) return

    const body: SocialHealth & { options: SocialHealthOption[] } = await readBody(event)

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
            }
        }
    })
})
