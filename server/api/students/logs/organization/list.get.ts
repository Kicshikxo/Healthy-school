import {
    ConclusionType,
    HealthGroup,
    HealthZone,
    MedicalHealthOption,
    MedicalType,
    PedagogueHealthOption,
    PedagogueTab,
    PedagogueType,
    PrismaClient,
    PsychologicalHealthOption,
    PsychologicalType,
    Role,
    SocialHealthOption,
    SocialType,
    Student
} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { role: Role.OPERATOR })) return

    const query = getQuery(event) as { organizationId?: string; endDate?: string }

    if (!query.organizationId)
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Organization ID is not provided' }))

    const students = await prisma.student.findMany({
        where: {
            class: {
                organizationId: query.organizationId
            }
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

    const healthZones: HealthZone[] = [HealthZone.GREEN, HealthZone.YELLOW, HealthZone.RED]
    const healthGroups: HealthGroup[] = [HealthGroup.BASIC, HealthGroup.PREPARATORY, HealthGroup.SPECIAL]
    function healthGroupToHealthZone(healthGroup: HealthGroup) {
        return healthZones[healthGroups.indexOf(healthGroup)]
    }

    return students.map<Student & { healthZones: { [key in ConclusionType]?: HealthZone } }>((student) => {
        const medicalOptions = (Object.keys(MedicalType) as MedicalType[]).reduce((acc, type) => {
            acc[type] = student.medicalHealth?.optionsLogs
                .map((log) => log.option)
                .find((option) => option.medicalType === type)
            return acc
        }, {} as { [key in MedicalType]?: MedicalHealthOption })

        const pedagogueOptions = (Object.keys(PedagogueType) as PedagogueType[]).reduce((acc, type) => {
            acc[type] = student.pedagogueHealth?.optionsLogs
                .map((log) => log.option)
                .find((option) => option.pedagogueType === type)
            return acc
        }, {} as { [key in PedagogueType]?: PedagogueHealthOption })

        const psychologicalOptions = (Object.keys(PsychologicalType) as PsychologicalType[]).reduce((acc, type) => {
            acc[type] = student.psychologicalHealth?.optionsLogs
                .map((log) => log.option)
                .find((option) => option.psychologicalType === type)
            return acc
        }, {} as { [key in PsychologicalType]?: PsychologicalHealthOption })

        const socialOptions = (Object.keys(SocialType) as SocialType[]).reduce((acc, type) => {
            acc[type] = student.socialHealth?.optionsLogs.map((log) => log.option).find((option) => option.socialType === type)
            return acc
        }, {} as { [key in SocialType]?: SocialHealthOption })

        return {
            id: student.id,
            classId: student.classId,
            snils: student.snils,
            secondName: student.secondName,
            firstName: student.firstName,
            middleName: student.middleName,
            gender: student.gender,
            birthdate: student.birthdate,
            createdAt: student.createdAt,
            updatedAt: student.updatedAt,
            healthZones: {
                MEDICAL: medicalOptions.HEALTH_GROUP?.healthZone ?? HealthZone.GREEN,
                PEDAGOGUE: Object.values(pedagogueOptions)
                    .filter((option) => option && option?.pedagogueTab === PedagogueTab.PEDAGOGUE)
                    .reduce(
                        (acc, option) =>
                            healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
                        'GREEN' as HealthZone
                    ),
                SPEECH: Object.values(pedagogueOptions)
                    .filter((option) => option && option?.pedagogueTab === PedagogueTab.SPEECH_THERAPIST)
                    .reduce(
                        (acc, option) =>
                            healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
                        'GREEN' as HealthZone
                    ),
                PHYSICAL: healthGroupToHealthZone(
                    student.physicalHealth?.healthGroupLogs?.at(0)?.healthGroup ?? HealthGroup.BASIC
                ),
                PSYCHOLOGICAL: Object.values(psychologicalOptions)
                    .filter((option) => option)
                    .reduce(
                        (acc, option) =>
                            healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
                        'GREEN' as HealthZone
                    ),
                SOCIAL: Object.values(socialOptions)
                    .filter((option) => option)
                    .reduce(
                        (acc, option) =>
                            healthZones[Math.max(healthZones.indexOf(acc), healthZones.indexOf(option.healthZone))],
                        'GREEN' as HealthZone
                    )
            } as { [key in ConclusionType]: HealthZone }
        }
    })
})
