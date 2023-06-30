export default defineEventHandler(async (event) => {
    return await prisma.socialHealthOption.findMany({
        include: {
            recommendations: true
        },
        orderBy: [{ healthZone: 'desc' }, { title: 'asc' }]
    })
})
