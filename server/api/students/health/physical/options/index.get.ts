export default defineEventHandler(async (event) => {
    return await prisma.physicalHealthOption.findMany()
})
