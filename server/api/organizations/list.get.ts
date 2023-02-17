import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const query = getQuery(event) as { municipalityId?: string }

    return prisma.educationalOrganization.findMany({
        where: {
            municipality: {
                id: query.municipalityId
            }
        }
    })
})
