import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.OPERATOR })) return

    const query = getQuery(event) as { classId?: string; endDate?: string }

    if (!query.classId) return sendError(event, createError({ statusCode: 400, statusMessage: 'Class ID is not provided' }))

    return await prisma.student.findMany({
        where: {
            classId: query.classId
        },
        include: {
            medicalHealth: {
                select: {
                    options: true,
                    optionsLogs: {
                        where: {
                            createdAt: {
                                lt: query.endDate ? new Date(query.endDate) : undefined
                            }
                        },
                        orderBy: {
                            createdAt: 'desc'
                        },
                        select: {
                            option: true
                        }
                    }
                }
            },
            pedagogueHealth: {
                select: {
                    options: true,
                    optionsLogs: {
                        where: {
                            createdAt: {
                                lt: query.endDate ? new Date(query.endDate) : undefined
                            }
                        },
                        orderBy: {
                            createdAt: 'desc'
                        },
                        select: {
                            option: true
                        }
                    }
                }
            },
            physicalHealth: {
                select: {
                    options: true,
                    optionsLogs: {
                        where: {
                            createdAt: {
                                lt: query.endDate ? new Date(query.endDate) : undefined
                            }
                        },
                        orderBy: {
                            createdAt: 'desc'
                        },
                        select: {
                            option: true
                        }
                    },
                    healthGroupLogs: {
                        where: {
                            createdAt: {
                                lt: query.endDate ? new Date(query.endDate) : undefined
                            }
                        },
                        orderBy: {
                            createdAt: 'desc'
                        },
                        take: 1
                    }
                }
            },
            psychologicalHealth: {
                select: {
                    options: true,
                    optionsLogs: {
                        where: {
                            createdAt: {
                                lt: query.endDate ? new Date(query.endDate) : undefined
                            }
                        },
                        orderBy: {
                            createdAt: 'desc'
                        },
                        select: {
                            option: true
                        }
                    }
                }
            },
            socialHealth: {
                select: {
                    options: true,
                    optionsLogs: {
                        where: {
                            createdAt: {
                                lt: query.endDate ? new Date(query.endDate) : undefined
                            }
                        },
                        orderBy: {
                            createdAt: 'desc'
                        },
                        select: {
                            option: true
                        }
                    }
                }
            }
        }
    })
})
