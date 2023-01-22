import crc32 from 'crc/crc32'
import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const loginData: LoginData = await readBody(event)

    if (!loginData.username || !loginData.password) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'Invalid login params'
            })
        )
    }

    const user = await prisma.user.findFirst({
        where: {
            username: loginData.username
        }
    })
    if (user && (await compare(loginData.password, user!.password))) {
        setCookie(
            event,
            'auth-token',
            jwt.sign(
                {
                    id: user.id,
                    organizationId: user.organizationId,
                    role: user.role,
                    password: crc32(user.password).toString(16)
                } as AuthTokenData,
                process.env.SECRET_KEY ?? ' '
            ),
            {
                maxAge: 30 * 24 * 60 * 60,
                httpOnly: true,
                sameSite: true
            }
        )
        return user
    }

    return sendError(
        event,
        createError({
            statusCode: 401,
            statusMessage: 'Incorrect login credentials'
        })
    )
})
