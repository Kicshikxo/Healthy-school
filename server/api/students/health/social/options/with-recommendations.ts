import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    return await prisma.socialHealthOption.findMany({
        include: {
            recommendations: true
        },
        orderBy: [{ healthZone: 'desc' }, { title: 'asc' }]
    })
})
