import { PrismaClient, Student } from '@prisma/client'
const prisma = new PrismaClient()
import crc32 from 'crc/crc32'

export default defineEventHandler(async (event) => {
    const studentData: Student = (await readBody(event)).studentData
    return await prisma.student.create({
        data: {
            ...studentData,
            id: crc32(studentData.snils).toString(16)
        }
    })
})
