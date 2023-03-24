import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * @openapi
 * /api/students/remove:
 *   delete:
 *     tags:
 *       - Students
 *     security:
 *       - BearerAuth: []
 *     description: "Удалить учащегося"
 *     parameters:
 *       - in: query
 *         name: studentId
 *     responses:
 *       200:
 *         description: "Student deleted"
 *       403:
 *         description: "Role access is forbidden"
 */
export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.CLASS_TEACHER })) return

    const body: { studentId: string } = await readBody(event)

    return await prisma.student.delete({
        where: {
            id: body.studentId
        },
        include: {
            medicalHealth: true,
            pedagogueHealth: true,
            physicalHealth: true,
            psychologicalHealth: true,
            socialHealth: true
        }
    })
})
