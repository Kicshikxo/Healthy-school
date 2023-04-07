/**
 * @openapi
 * /api/organizations/list:
 *   get:
 *     tags:
 *       - Educational Organizations
 *     security:
 *       - BearerAuth: []
 *     description: "Список образовательных организаций"
 *     parameters:
 *       - in: query
 *         name: municipalityId
 *     responses:
 *       200:
 *         description: "Educational organizations list"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/EducationalOrganizationWithCount"
 *       401:
 *         description: "Unable to read token data"
 */
export default defineEventHandler(async (event) => {
    const tokenData = readTokenData(event)
    if (!tokenData) return

    const query = getQuery(event) as { municipalityId?: string }

    if (!query.municipalityId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'municipalityId is not provided'
            })
        )

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
