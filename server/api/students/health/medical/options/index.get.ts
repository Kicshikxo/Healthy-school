import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    return await prisma.medicalHealthOption.findMany({
        orderBy: [{ medicalType: 'asc' }, { healthZone: 'asc' }, { title: 'asc' }]
    })
})
