export default defineEventHandler(async (event) => {
    return await prisma.pedagogueHealthOption.findMany()
})
