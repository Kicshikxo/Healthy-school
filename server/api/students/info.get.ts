import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const tokenData = readTokenData(event)
    if (!tokenData) return

    const query = getQuery(event) as { studentId: string }

    if (!query.studentId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'studentId is not provided'
            })
        )

    return await prisma.student.findFirst({
        where: {
            AND: [{ id: query.studentId }, { class: { organizationId: tokenData.organizationId } }]
        },
        include: {
            class: true,
            physicalHealth: {
                select: {
                    healthGroup: true,
                    options: true
                }
            },
            medicalHealth: {
                select: {
                    options: true,
                    specialistNotes: true
                }
            },
            socialHealth: {
                select: {
                    options: true
                }
            },
            pedagogueHealth: {
                select: {
                    options: true
                }
            },
            psychologicalHealth: {
                select: {
                    options: true,
                    specialistNotes: true
                }
            }
        }
    })
})
