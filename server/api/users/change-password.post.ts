import { ActionType, Role } from '@prisma/client'
import { compareSync, hashSync } from 'bcrypt'

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

    return await prisma.user
        .update({
            where: { id: userId },
            data: {
                password: hashSync(body.newPassword, 8)
            }
        })
        .then((data) =>
            prisma.actionLog.create({
                data: {
                    createdById: readTokenData(event)!.id,
                    actionType: ActionType.CHANGE_PASSWORD,
                    details: JSON.parse(
                        JSON.stringify({
                            action: 'changePassword',
                            data
                        })
                    )
                }
            })
        )
})
