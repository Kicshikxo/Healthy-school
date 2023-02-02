import { PrismaClient } from '@prisma/client'
import checkTokenData from '~~/server/utils/checkTokenData'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const tokenData = checkTokenData(event)
    if (!tokenData) return

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
                    specialistNotes: true
                }
            },
            socialHealth: {
                select: {
                    indicators: true,
                    recommendations: true
                }
            },
            pedagogueHealth: {
                select: {
                    options: true
                }
            },
            psychologicalHealth: {
                select: {
                    options: true
                }
            }
        }
    })
    return data
})
