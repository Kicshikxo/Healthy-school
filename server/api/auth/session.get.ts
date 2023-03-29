import { PrismaClient } from '@prisma/client'
import crc32 from 'crc/crc32'

const prisma = new PrismaClient()

/**
 * @openapi
 * /api/auth/session:
 *   get:
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     description: "Информация о сессии"
 *     responses:
 *       200:
 *         description: "Session data"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SessionResponse"
 *       400:
 *         description: "User not found"
 *       401:
 *         description: "Invalid token credentials"
 */
export default defineEventHandler(async (event) => {
    const tokenData = readTokenData(event)
    if (!tokenData) return

    const user = await prisma.user.findUnique({
        where: { id: tokenData.id },
        include: { organization: true }
    })

    if (!user) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'User not found'
            })
        )
    }

    if (tokenData.password !== crc32(user.password).toString(16)) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: 'Invalid token credentials'
            })
        )
    }

    return {
        id: user.id,
        organizationId: user.organization?.organizationId,
        role: user.role,
        firstName: user.firstName,
        secondName: user.secondName,
        middleName: user.middleName
    } as SessionData
})
