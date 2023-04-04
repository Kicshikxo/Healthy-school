import { ActionType, PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * @openapi
 * /api/students/remove:
 *   delete:
 *     tags:
 *       - Students
 *     security:
 *       - BearerAuth: []
 *     description: "Удалить учащегося"
 *     parameters:
 *       - in: query
 *         name: studentId
 *     responses:
 *       200:
 *         description: "Student deleted"
 *       403:
 *         description: "Role access is forbidden"
 */
export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR, Role.CLASS_TEACHER] })) return

    const body: { studentId: string } = await readBody(event)

    if (!body.studentId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'studentId is not provided'
            })
        )

    return await prisma.student
        .delete({
            where: {
                id: body.studentId
            }
        })
        .then((data) =>
            prisma.actionLog.create({
                data: {
                    createdById: readTokenData(event)!.id,
                    actionType: ActionType.REMOVE,
                    details: JSON.parse(
                        JSON.stringify({
                            action: 'removeStudent',
                            data
                        })
                    )
                }
            })
        )
})
