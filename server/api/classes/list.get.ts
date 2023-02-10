import { PrismaClient } from '@prisma/client'
import readTokenData from '~~/server/utils/readTokenData'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const tokenData = readTokenData(event)
    if (!tokenData) return

    return await prisma.class.findMany({
        where: {
            organizationId: tokenData.organizationId
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
