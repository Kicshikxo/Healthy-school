import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const tokenData = event.context.authTokenData as AuthTokenData
    if (!tokenData) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: 'Unable to read token data'
            })
        )
    }

    const query = getQuery(event) as { studentId: string }

    const data = await prisma.student.findFirst({
        where: {
            AND: [{ id: query.studentId as string }, { class: { organizationId: tokenData.organizationId } }]
        },
        include: {
            class: true,
            physicalHealth: {
                select: {
                    healthGroup: true,
                    recommendations: true,
                    specialistNotes: true
                }
            },
            medicalHealth: {
                select: {
                    options: true,
                    recommendations: true,
                    specialistNotes: true
                }
            },
            socialHealth: {
                select: {
                    indicators: true,
                    recommendations: true
                }
            }
        }
    })
    return data
})
