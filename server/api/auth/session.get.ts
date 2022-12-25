import { PrismaClient, Role } from '@prisma/client'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

interface TokenData {
    id: number
    role: Role
    password: string
}

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

    try {
        const tokenData = jwt.verify(
            authToken!,
            process.env.SECRET_KEY!
        ) as TokenData
        return prisma.user.findUnique({
            where: { id: tokenData.id },
            select: {
                id: true,
                role: true,
                firstName: true,
                secondName: true,
                middleName: true
            }
        })
    } catch (e) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: 'Invalid auth token'
            })
        )
    }
})
