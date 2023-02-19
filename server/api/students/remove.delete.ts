import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.CLASS_TEACHER })) return

    const body: { studentId: string } = await readBody(event)

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
