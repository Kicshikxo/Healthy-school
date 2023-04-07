export default defineEventHandler(async (event) => {
    return await prisma.medicalHealthOption.findMany({
        orderBy: [{ medicalType: 'asc' }, { healthZone: 'asc' }, { title: 'asc' }]
    })
})
