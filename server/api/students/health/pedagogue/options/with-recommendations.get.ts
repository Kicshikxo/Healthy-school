export default defineEventHandler(async (event) => {
    return await prisma.pedagogueHealthOption.findMany({
        include: {
            recommendations: true
        }
    })
})
