import { ActionType, PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR] })) return

    const body: { municipalityId: string; name: string } = await readBody(event)

    if (!body.municipalityId || !body.name)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'id or name is not provided'
            })
        )

    return await prisma.municipality
        .update({
            where: {
                id: body.municipalityId
            },
            data: {
                name: body.name
            }
        })
        .then((data) =>
            prisma.actionLog.create({
                data: {
                    createdById: readTokenData(event)!.id,
                    actionType: ActionType.UPDATE,
                    details: JSON.parse(
                        JSON.stringify({
                            action: 'editMunicipality',
                            data
                        })
                    )
                }
            })
        )
})
