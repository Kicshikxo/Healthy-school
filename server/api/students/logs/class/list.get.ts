import { PrismaClient, Role } from '@prisma/client'
import checkRole from '~~/server/utils/checkRole'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.OPERATOR })) return

    const query = getQuery(event) as { classId?: string; startDate?: string; endDate?: string }

    if (!query.classId) return sendError(event, createError({ statusCode: 400, statusMessage: 'Class ID is not provided' }))

    return await prisma.student.findMany({
        where: {
            class: {
                id: query.classId
            }
        },
        include: {
            medicalHealth: {
                select: {
                    options: true,
                    logs: {
                        where: {
                            createdAt: {
                                lt: query.endDate ? new Date(query.endDate) : undefined
                                // gt: query.startDate ? new Date(query.startDate) : undefined
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
                    logs: {
                        where: {
                            createdAt: {
                                lt: query.endDate ? new Date(query.endDate) : undefined
                                // gt: query.startDate ? new Date(query.startDate) : undefined
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
                    logs: {
                        where: {
                            createdAt: {
                                lt: query.endDate ? new Date(query.endDate) : undefined
                                // gt: query.startDate ? new Date(query.startDate) : undefined
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
            psychologicalHealth: {
                select: {
                    options: true,
                    logs: {
                        where: {
                            createdAt: {
                                lt: query.endDate ? new Date(query.endDate) : undefined
                                // gt: query.startDate ? new Date(query.startDate) : undefined
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
                    logs: {
                        where: {
                            createdAt: {
                                lt: query.endDate ? new Date(query.endDate) : undefined
                                // gt: query.startDate ? new Date(query.startDate) : undefined
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
