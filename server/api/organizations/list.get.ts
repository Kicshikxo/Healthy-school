import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const query = getQuery(event) as { municipalityId?: string }

    return prisma.educationalOrganization.findMany({
        where: {
            municipality: {
                id: query.municipalityId
            }
        },
        include: {
            _count: {
                select: {
                    classes: true
                }
            },
            classes: {
                select: {
                    id: true,
                    _count: {
                        select: {
                            students: true
                        }
                    }
                }
            }
        }
    })
})
