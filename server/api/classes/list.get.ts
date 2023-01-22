import { PrismaClient } from '@prisma/client'
import checkTokenData from '~~/server/utils/checkTokenData'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const tokenData = checkTokenData(event)
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
        }
    })
})
