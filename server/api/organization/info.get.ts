import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const query = getQuery(event) as { organizationId: string }

    return await prisma.educationalOrganization.findUnique({
        where: {
            id: query.organizationId
        }
    })
})
