export default defineEventHandler(async (event) => {
    const tokenData = readTokenData(event)
    if (!tokenData) return

    const query = getQuery(event) as { organizationId: string }

    if (!query.organizationId)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'organizationId is not provided'
            })
        )

    return await prisma.educationalOrganization.findFirst({
        where: {
            id: query.organizationId
        }
    })
})
