import { ActionType, Class, PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const body: Class & { organizationId: string } = await readBody(event)

    if (!body.number || !body.academicYear || !body.organizationId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'number, academicYear or organizationId is not provided'
            })
        )

    return await prisma.class
        .create({
            data: {
                number: body.number,
                liter: body.liter,
                academicYear: body.academicYear,
                organizationId: body.organizationId
            }
        })
        .then((data) =>
            prisma.actionLog.create({
                data: {
                    createdById: readTokenData(event)!.id,
                    actionType: ActionType.ADD,
                    details: JSON.parse(
                        JSON.stringify({
                            action: 'createClass',
                            data
                        })
                    )
                }
            })
        )
})
