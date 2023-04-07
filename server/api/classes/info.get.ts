/**
 * @openapi
 * /api/classes/info:
 *   get:
 *     tags:
 *       - Classes
 *     security:
 *       - BearerAuth: []
 *     description: "Информация о классе"
 *     parameters:
 *       - in: query
 *         name: classId
 *     responses:
 *       200:
 *         description: "Class info"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Class"
 *       400:
 *         description: "Invalid parameters"
 *       401:
 *         description: "Unable to read token data"
 */
export default defineEventHandler(async (event) => {
    const tokenData = readTokenData(event)
    if (!tokenData) return

    const query = getQuery(event) as { classId: string }

    if (!query.classId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'classId is not provided'
            })
        )

    return await prisma.class.findFirst({
        where: {
            AND: [{ id: query.classId }, { organizationId: tokenData.organizationId }]
        }
    })
})
