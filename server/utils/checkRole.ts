import { H3Event, sendError } from 'h3'
import { Role } from '@prisma/client'
import readTokenData from '~~/server/utils/readTokenData'

export default function (event: H3Event, roleData: XOR<{ role: Role }, { roles: Role[] }>): boolean {
    const tokenData = readTokenData(event)

    if (tokenData && !(roleData.roles?.includes(tokenData.role) || tokenData.role === roleData.role)) {
        sendError(
            event,
            createError({
                statusCode: 403,
                statusMessage: 'Role access is forbidden'
            })
        )
        return false
    }
    return Boolean(tokenData)
}
