import { PrismaClient, Student } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
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
            socialHealth: { create: {} }
        }
    })
})
