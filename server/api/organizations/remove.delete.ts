import { ActionType, PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR] })) return

    const body: { organizationId: string } = await readBody(event)

    if (!body.organizationId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'organizationId is not provided'
            })
        )

    return await prisma.educationalOrganization
        .delete({
            where: {
                id: body.organizationId
            }
        })
        .then((data) =>
            prisma.actionLog.create({
                data: {
                    createdById: readTokenData(event)!.id,
                    actionType: ActionType.DELETE,
                    details: JSON.parse(
                        JSON.stringify({
                            action: 'removeOrganization',
                            data
                        })
                    )
                }
            })
        )
})
