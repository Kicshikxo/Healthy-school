import { PrismaClient } from '@prisma/client'
import readTokenData from '~~/server/utils/readTokenData'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const tokenData = readTokenData(event)
    if (!tokenData) return

    const query = getQuery(event) as { organizationId?: string }

    return await prisma.class.findMany({
        where: {
            organizationId: query.organizationId ?? tokenData.organizationId
        },
        include: {
            _count: {
                select: {
                    students: true
                }
            }
        },
        orderBy: [
            {
                number: 'asc'
            },
            {
                liter: 'asc'
            }
        ]
    })
})
