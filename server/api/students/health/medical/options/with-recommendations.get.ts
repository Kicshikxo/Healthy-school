export default defineEventHandler(async (event) => {
    return await prisma.medicalHealthOption.findMany({
        include: {
            recommendations: true
        },
        orderBy: [{ medicalType: 'asc' }, { healthZone: 'asc' }, { title: 'asc' }]
    })
})
