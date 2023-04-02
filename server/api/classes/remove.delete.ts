import { ActionType, PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const body: { classId: string } = await readBody(event)

    if (!body.classId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'classId is not provided'
            })
        )

    return await prisma.class
        .delete({
            where: {
                id: body.classId
            }
        })
        .then(() =>
            prisma.actionLog.create({
                data: {
                    createdById: readTokenData(event)!.id,
                    actionType: ActionType.REMOVE,
                    details: {
                        action: 'removeClass',
                        data: {
                            id: body.classId
                        }
                    }
                }
            })
        )
})
