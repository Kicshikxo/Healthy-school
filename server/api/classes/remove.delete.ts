import { ActionType, Role } from '@prisma/client'

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
        .then((data) =>
            prisma.actionLog.create({
                data: {
                    createdById: readTokenData(event)!.id,
                    actionType: ActionType.DELETE,
                    details: JSON.parse(
                        JSON.stringify({
                            action: 'removeClass',
                            data
                        })
                    )
                }
            })
        )
})
