export default defineEventHandler(async (event) => {
    return await prisma.socialHealthOption.findMany({
        orderBy: [{ healthZone: 'desc' }, { title: 'asc' }]
    })
})
