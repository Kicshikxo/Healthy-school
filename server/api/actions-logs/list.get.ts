import { Role } from '@prisma/client'

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const query = getQuery(event) as { organizationId?: string }

    return await prisma.actionLog.findMany({
        where: {
            createdBy: {
                organization: {
                    organizationId: query.organizationId ?? readTokenData(event)?.organizationId
                }
            }
        },
        include: {
            createdBy: {
                include: {
                    organization: {
                        select: {
                            organization: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
})
