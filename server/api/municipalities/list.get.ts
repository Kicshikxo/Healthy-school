import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    return prisma.municipality.findMany({
        include: {
            _count: {
                select: {
                    organizations: true
                }
            },
            organizations: {
                select: {
                    _count: {
                        select: {
                            classes: true
                        }
                    },
                    classes: {
                        select: {
                            _count: {
                                select: {
                                    students: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
})
