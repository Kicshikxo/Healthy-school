import { ConclusionType } from '@prisma/client'

export default defineEventHandler(async (event) => {
    const query = getQuery(event) as { type?: ConclusionType }

    return await prisma.conclusion.findMany({
        where: {
            conclusionType: query.type
        },
        include: {
            recommendations: true
        }
    })
})
