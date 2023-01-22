import crc32 from 'crc/crc32'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const authToken = getCookie(event, 'auth-token')
    if (!authToken) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: 'Unable to read auth token'
            })
        )
    }

    let tokenData: AuthTokenData

    try {
        tokenData = jwt.verify(authToken!, process.env.SECRET_KEY!) as AuthTokenData
    } catch (e) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: 'Invalid auth token'
            })
        )
    }

    const user = await prisma.user.findUnique({
        where: { id: tokenData.id }
    })

    if (!user) {
        return sendError(
            event,
            createError({
                statusCode: 401,
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
        organizationId: user.organizationId,
        role: user.role,
        firstName: user.firstName,
        secondName: user.secondName,
        middleName: user.middleName
    } as SessionData
})
