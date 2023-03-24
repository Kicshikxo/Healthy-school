import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * @openapi
 * /api/municipalities/list:
 *   get:
 *     tags:
 *       - Municipalities
 *     security:
 *       - BearerAuth: []
 *     description: "Список муниципальных образований"
 *     responses:
 *       200:
 *         description: "Municipalities list"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/MunicipalityWithCount"
 *       401:
 *         description: "Unable to read token data"
 */
export default defineEventHandler(async (event) => {
    const tokenData = readTokenData(event)
    if (!tokenData) return

    return prisma.municipality.findMany({
        include: {
            _count: {
                select: {
                    organizations: true
                }
            },
            organizations: {
                select: {
                    _count: {
                        select: {
                            classes: true
                        }
                    },
                    classes: {
                        select: {
                            _count: {
                                select: {
                                    students: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
})
