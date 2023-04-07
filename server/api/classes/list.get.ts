import { Role } from '@prisma/client'

/**
 * @openapi
 * /api/classes/list:
 *   get:
 *     tags:
 *       - Classes
 *     security:
 *       - BearerAuth: []
 *     description: "Список классов"
 *     parameters:
 *       - in: query
 *         name: organizationId
 *     responses:
 *       200:
 *         description: "Classes list"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/ClassWithCount"
 *       401:
 *         description: "Unable to read token data"
 */
export default defineEventHandler(async (event) => {
    const tokenData = readTokenData(event)
    if (!tokenData) return

    const query = getQuery(event) as { organizationId?: string }

    if (!query.organizationId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'organizationId is not provided'
            })
        )

    return await prisma.class.findMany({
        where: {
            AND: [
                { organizationId: query.organizationId },
                { teachers: tokenData.role === Role.CLASS_TEACHER ? { some: { userId: tokenData.id } } : undefined }
            ]
        },
        include: {
            _count: {
                select: {
                    students: true
                }
            }
        },
        orderBy: [
            {
                number: 'asc'
            },
            {
                liter: 'asc'
            }
        ]
    })
})
