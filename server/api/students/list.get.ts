import { PrismaClient } from '@prisma/client'
import checkTokenData from '~~/server/utils/checkTokenData'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const tokenData = checkTokenData(event)
    if (!tokenData) return

    const query = getQuery(event) as { classId: string }

    return await prisma.student.findMany({
        where: {
            AND: [{ classId: query.classId }, { class: { organizationId: tokenData.organizationId } }]
        },
        orderBy: { secondName: 'asc' },
        include: {
            class: true
        }
    })
})
