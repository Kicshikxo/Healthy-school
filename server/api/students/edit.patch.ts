import { PrismaClient, Role, Student } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const studentData: Student = (await readBody(event)).studentData

    if (!studentData)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'studentData is not provided'
            })
        )

    return await prisma.student.update({
        where: {
            id: studentData.id
        },
        data: {
            snils: studentData.snils,

            secondName: studentData.secondName,
            firstName: studentData.firstName,
            middleName: studentData.middleName,

            gender: studentData.gender,
            birthdate: studentData.birthdate,
            classId: studentData.classId
        }
    })
})
