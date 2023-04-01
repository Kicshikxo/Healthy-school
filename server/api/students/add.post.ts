import { PrismaClient, Role, Student } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR, Role.CLASS_TEACHER] })) return

    const body: Student = await readBody(event)

    if (
        !body.snils ||
        !body.secondName ||
        !body.firstName ||
        !body.middleName ||
        !body.gender ||
        !body.birthdate ||
        !body.classId
    )
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'snils, secondName, firstName, middleName, gender, birthdate or classId is not provided'
            })
        )

    return await prisma.student.create({
        data: {
            snils: body.snils,

            secondName: body.secondName,
            firstName: body.firstName,
            middleName: body.middleName,

            gender: body.gender,
            birthdate: body.birthdate,
            classId: body.classId,

            physicalHealth: { create: {} },
            medicalHealth: { create: {} },
            socialHealth: { create: {} },
            pedagogueHealth: { create: {} },
            psychologicalHealth: { create: {} }
        }
    })
})
