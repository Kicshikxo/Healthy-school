import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    return await prisma.socialHealthIndicator.findMany({
        orderBy: [{ healthZone: 'desc' }, { title: 'asc' }]
    })
})
