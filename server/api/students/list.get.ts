import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

/**
 * @openapi
 * /api/students/list:
 *   get:
 *     tags:
 *       - Students
 *     security:
 *       - BearerAuth: []
 *     description: "Список студентов"
 *     parameters:
 *       - in: query
 *         name: classId
 *     responses:
 *       200:
 *         description: "Students list"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/StudentWithClass"
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

    return await prisma.student.findMany({
        where: {
            AND: [{ classId: query.classId }, { class: { organizationId: tokenData.organizationId } }]
        },
        orderBy: { secondName: 'asc' },
        include: {
            class: true
        }
    })
})
