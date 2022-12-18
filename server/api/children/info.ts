import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    return await prisma.child.findFirst({
        where: { id: Number(query.id) }
    })
})
