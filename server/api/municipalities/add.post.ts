import { ActionType, Role } from '@prisma/client'

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR] })) return

    const body: { name: string } = await readBody(event)

    if (!body.name)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'name is not provided'
            })
        )

    return await prisma.municipality
        .create({
            data: {
                name: body.name
            }
        })
        .then((data) =>
            prisma.actionLog.create({
                data: {
                    createdById: readTokenData(event)!.id,
                    actionType: ActionType.CREATE,
                    details: JSON.parse(
                        JSON.stringify({
                            action: 'createMunicipality',
                            data
                        })
                    )
                }
            })
        )
})
