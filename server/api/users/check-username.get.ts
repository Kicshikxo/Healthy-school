import { Role } from '@prisma/client'

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const { username } = getQuery(event) as { username: string }

    if (!username)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'username is not provided'
            })
        )

    return {
        available: !(await prisma.user.findUnique({
            where: {
                username: username
            }
        }))
    }
})
