export default defineEventHandler(async (event) => {
    return await prisma.psychologicalHealthOption.findMany()
})
