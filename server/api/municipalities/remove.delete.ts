import { ActionType, PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const body: { municipalityId: string } = await readBody(event)

    if (!body.municipalityId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'municipalityId is not provided'
            })
        )

    return await prisma.municipality
        .delete({
            where: {
                id: body.municipalityId
            }
        })
        .then((data) =>
            prisma.actionLog.create({
                data: {
                    createdById: readTokenData(event)!.id,
                    actionType: ActionType.DELETE,
                    details: JSON.parse(
                        JSON.stringify({
                            action: 'removeMunicipality',
                            data
                        })
                    )
                }
            })
        )
})
