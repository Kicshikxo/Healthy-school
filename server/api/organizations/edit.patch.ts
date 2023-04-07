import { ActionType, PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR] })) return

    const body: { organizationId: string; name: string } = await readBody(event)

    if (!body.organizationId || !body.name)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'organizationId or name is not provided'
            })
        )

    return await prisma.educationalOrganization
        .update({
            where: {
                id: body.organizationId
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
                            action: 'editOrganization',
                            data
                        })
                    )
                }
            })
        )
})
