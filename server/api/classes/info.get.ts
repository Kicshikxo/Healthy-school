import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const tokenData = readTokenData(event)
    if (!tokenData) return

    const query = getQuery(event) as { classId: string }

    if (!query.classId) return

    return await prisma.class.findFirst({
        where: {
            AND: [{ id: query.classId }, { organizationId: tokenData.organizationId }]
        }
    })
})
