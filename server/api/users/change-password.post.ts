import { PrismaClient, Role } from '@prisma/client'
import { compareSync, hashSync } from 'bcrypt'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const tokenData = readTokenData(event)
    if (!tokenData) return

    const body: { userId: string; currentPassword: string; newPassword: string } = await readBody(event)

    if (!body.newPassword)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'newPassword is not provided'
            })
        )

    let userId: string
    if (body.userId && checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) {
        userId = body.userId
    } else {
        userId = tokenData.id
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (
        !(body.userId && checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) &&
        !compareSync(body.currentPassword, user?.password ?? '')
    )
        return sendError(
            event,
            createError({
                statusCode: 403,
                statusMessage: 'currentPassword does not match'
            })
        )

    return await prisma.user.update({
        where: { id: userId },
        data: {
            password: hashSync(body.newPassword, 8)
        }
    })
})
