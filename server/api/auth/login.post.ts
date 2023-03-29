import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'
import crc32 from 'crc/crc32'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     description: "Вход в систему"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               token:
 *                 type: string
 *                 example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
 *                 description: 'Токен для доступа к системе'
 *     responses:
 *       200:
 *         description: "Returns users list"
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 username:
 *                   type: string
 *                   example: 'test'
 *                   description: 'Имя пользователя (логин)'
 *                 password:
 *                   type: string
 *                   example: 'test'
 *                   description: 'Пароль пользователя'
 *       400:
 *         description: "Invalid login params"
 *       401:
 *         description: "Incorrect login credentials"
 */
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
        where: { username: loginData.username },
        include: { organization: true }
    })
    if (user && (await compare(loginData.password, user!.password))) {
        const token = jwt.sign(
            {
                id: user.id,
                organizationId: user.organization?.organizationId,
                role: user.role,
                password: crc32(user.password).toString(16)
            } as AuthTokenData,
            process.env.SECRET_KEY ?? ' '
        )
        setCookie(event, 'auth-token', token, {
            maxAge: 30 * 24 * 60 * 60,
            httpOnly: true,
            sameSite: true
        })
        return { token }
    }

    return sendError(
        event,
        createError({
            statusCode: 401,
            statusMessage: 'Incorrect login credentials'
        })
    )
})
