import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    return await prisma.student.delete({
        where: {
            id: body.studentId
        },
        include: {
            physicalHealth: true,
            medicalHealth: true,
            socialHealth: true
        }
    })
})
