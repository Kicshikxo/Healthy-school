import { ActionType, PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const body: { id: string; number: number; liter?: string; academicYear: string } = await readBody(event)

    if (!body.id || !body.number || !body.academicYear)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'id, number or academicYear is not provided'
            })
        )

    return await prisma.class
        .update({
            where: {
                id: body.id
            },
            data: {
                number: body.number,
                liter: body.liter,
                academicYear: body.academicYear
            }
        })
        .then((data) =>
            prisma.actionLog.create({
                data: {
                    createdById: readTokenData(event)!.id,
                    actionType: ActionType.UPDATE,
                    details: JSON.parse(
                        JSON.stringify({
                            action: 'editClass',
                            data
                        })
                    )
                }
            })
        )
})
