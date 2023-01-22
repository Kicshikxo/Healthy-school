import { H3Event, sendError } from 'h3'
import { Role } from '@prisma/client'
import checkTokenData from '~~/server/utils/checkTokenData'

export default function (event: H3Event, roleData: XOR<{ role: Role }, { roles: Role[] }>): boolean {
    const tokenData = checkTokenData(event)

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
