import { PrismaClient, Role, Student } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR, Role.CLASS_TEACHER] })) return

    const studentData: Student = (await readBody(event)).studentData
    return await prisma.student.create({
        data: {
            snils: studentData.snils,

            secondName: studentData.secondName,
            firstName: studentData.firstName,
            middleName: studentData.middleName,

            gender: studentData.gender,
            birthdate: studentData.birthdate,
            classId: studentData.classId,

            physicalHealth: { create: {} },
            medicalHealth: { create: {} },
            socialHealth: { create: {} },
            pedagogueHealth: { create: {} },
            psychologicalHealth: { create: {} }
        }
    })
})
