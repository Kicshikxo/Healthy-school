import { PrismaClient } from '@prisma/client'
import readTokenData from '~~/server/utils/readTokenData'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const tokenData = readTokenData(event)
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
