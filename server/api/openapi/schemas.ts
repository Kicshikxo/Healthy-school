import {
    Class,
    ClassTeacher,
    EducationalOrganization,
    Gender,
    Municipality,
    Role,
    Student,
    User,
    UserOrganization
} from '@prisma/client'

export type ApiSchemaProperty = {
    type: 'string' | 'number' | 'object' | 'array'
    example?: string | any
    description?: string
    enum?: string[]
    properties?: { [key in string]: ApiSchemaProperty }
    items?: ApiSchemaProperty
}

export type ApiSchema<T> = {
    properties: {
        [key in keyof T]: ApiSchemaProperty | ApiSchema<T | any>
    }
}

const createdAtProperty: ApiSchemaProperty = {
    type: 'string',
    example: '1970-01-01T00:00:00.000Z',
    description: 'Дата создания в формате ISO-8601'
}

const updatedAtProperty: ApiSchemaProperty = {
    type: 'string',
    example: '1970-01-01T00:00:00.000Z',
    description: 'Дата изменения в формате ISO-8601'
}

const municipalitySchema: ApiSchema<Municipality> = {
    properties: {
        id: {
            type: 'string',
            example: '00000000-0000-0000-0000-000000000000',
            description: 'UUID муниципалитета'
        },
        name: {
            type: 'string',
            example: 'город Курск',
            description: 'Название муниципалитета'
        }
    }
}

const municipalityWithCountSchema: ApiSchema<
    Municipality & {
        organizations: {
            classes: {
                _count: {
                    students: number
                }
            }[]
            _count: {
                classes: number
            }
        }[]
        _count: {
            organizations: number
        }
    }
> = {
    properties: {
        id: municipalitySchema.properties.id,
        name: municipalitySchema.properties.name,
        organizations: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    classes: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                students: {
                                    type: 'number',
                                    example: 0,
                                    description: 'Количество учащихся в классе'
                                }
                            }
                        }
                    },
                    _count: {
                        type: 'object',
                        properties: {
                            classes: {
                                type: 'number',
                                example: 0,
                                description: 'Количество классов в организации'
                            }
                        }
                    }
                }
            }
        },
        _count: {
            type: 'object',
            properties: {
                organizations: {
                    type: 'number',
                    example: 0,
                    description: 'Количество организаций в муниципалитете'
                }
            }
        }
    }
}

const userSchema: ApiSchema<User> = {
    properties: {
        id: {
            type: 'string',
            example: '00000000-0000-0000-0000-000000000000',
            description: 'UUID пользователя'
        },
        username: {
            type: 'string',
            example: 'test',
            description: 'Имя пользователя (логин)'
        },
        password: {
            type: 'string',
            example: '$2b$08$8h3FHf8GtnhlftpLIvKQcuGN3wp6tz3qm57pLOQ9uhOuB/Sr5GCv2',
            description: 'Пароль пользователя, хэшированный с помощью bcrypt'
        },
        secondName: {
            type: 'string',
            example: 'Иванов',
            description: 'Фамилия пользователя'
        },
        firstName: {
            type: 'string',
            example: 'Иван',
            description: 'Имя пользователя'
        },
        middleName: {
            type: 'string',
            example: 'Иванович',
            description: 'Отчество пользователя'
        },
        role: {
            type: 'string',
            description: 'Роль пользователя',
            enum: Object.keys(Role)
        },
        createdAt: createdAtProperty,
        updatedAt: updatedAtProperty
    }
}

const organizationSchema: ApiSchema<EducationalOrganization> = {
    properties: {
        id: {
            type: 'string',
            example: '00000000-0000-0000-0000-000000000000',
            description: 'UUID образовательной организации'
        },
        name: {
            type: 'string',
            example: 'Школа №1',
            description: 'Название образовательной организации'
        },
        municipalityId: municipalitySchema.properties.id
    }
}

const organizationWithCountSchema: ApiSchema<
    EducationalOrganization & {
        classes: {
            _count: {
                students: number
            }
        }[]
        _count: {
            classes: number
        }
    }
> = {
    properties: {
        ...organizationSchema.properties,
        classes: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    _count: {
                        type: 'object',
                        properties: {
                            students: {
                                type: 'number',
                                example: 0,
                                description: 'Количество учащихся в классе'
                            }
                        }
                    }
                }
            }
        },
        _count: {
            type: 'object',
            properties: {
                classes: {
                    type: 'number',
                    example: 0,
                    description: 'Количество классов в организации'
                }
            }
        }
    }
}

const userOrganizationSchema: ApiSchema<UserOrganization> = {
    properties: {
        userId: userSchema.properties.id,
        organizationId: organizationSchema.properties.id,
        createdAt: createdAtProperty
    }
}

const classSchema: ApiSchema<Class> = {
    properties: {
        id: {
            type: 'string',
            example: '00000000-0000-0000-0000-000000000000',
            description: 'UUID класса'
        },
        organizationId: organizationSchema.properties.id,
        number: {
            type: 'string',
            example: '1',
            description: 'Номер класса'
        },
        liter: {
            type: 'string',
            example: 'А',
            description: 'Литер класса'
        },
        academicYear: {
            type: 'string',
            example: '2000-2001',
            description: 'Учебный год'
        }
    }
}

const classWithCountSchema: ApiSchema<
    Class & {
        _count: {
            students: number
        }
    }
> = {
    properties: {
        ...classSchema.properties,
        _count: {
            type: 'object',
            properties: {
                students: {
                    type: 'number',
                    example: 0,
                    description: 'Количество учеников в классе'
                }
            }
        }
    }
}

const classTeacherSchema: ApiSchema<ClassTeacher> = {
    properties: {
        userId: userSchema.properties.id,
        classId: classSchema.properties.id,
        createdAt: createdAtProperty
    }
}

const studentSchema: ApiSchema<Student> = {
    properties: {
        id: {
            type: 'string',
            example: '00000000-0000-0000-0000-000000000000',
            description: 'UUID учащегося'
        },
        classId: classSchema.properties.id,
        snils: {
            type: 'string',
            example: '000-000-000 00',
            description: 'СНИЛС учащегося'
        },
        secondName: {
            type: 'string',
            example: 'Иванов',
            description: 'Фамилия учащегося'
        },
        firstName: {
            type: 'string',
            example: 'Иван',
            description: 'Имя учащегося'
        },
        middleName: {
            type: 'string',
            example: 'Иванович',
            description: 'Отчество учащегося'
        },
        gender: {
            type: 'string',
            description: 'Пол учащегося',
            enum: Object.keys(Gender)
        },
        birthdate: {
            type: 'string',
            example: '1970-01-01T00:00:00.000Z',
            description: 'Дата рождения учащегося'
        },
        createdAt: createdAtProperty,
        updatedAt: updatedAtProperty
    }
}

const studentWithClassSchema: ApiSchema<Student & { class: Class }> = {
    properties: {
        ...studentSchema.properties,
        class: classSchema
    }
}

// const loginRequestSchema: ApiSchema<LoginData> = {
//     properties: {
//         username: {
//             type: 'string',
//             example: 'test',
//             description: 'Имя пользователя (логин)'
//         },
//         password: {
//             type: 'string',
//             example: 'test',
//             description: 'Пароль пользователя'
//         }
//     }
// }

// const loginResponseSchema: ApiSchema<{ token: string }> = {
//     properties: {
//         token: {
//             type: 'string',
//             example:
//                 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
//             description: 'Токен для доступа к системе'
//         }
//     }
// }

const sessionResponseSchema: ApiSchema<SessionData> = {
    properties: {
        id: userSchema.properties.id,
        organizationId: organizationSchema.properties.id,
        role: userSchema.properties.role,
        secondName: userSchema.properties.secondName,
        firstName: userSchema.properties.firstName,
        middleName: userSchema.properties.middleName
    }
}

export const schemas: { [key in string]: ApiSchema<any> } = {
    Municipality: municipalitySchema,
    MunicipalityWithCount: municipalityWithCountSchema,
    EducationalOrganization: organizationSchema,
    EducationalOrganizationWithCount: organizationWithCountSchema,
    User: userSchema,
    UserOrganization: userOrganizationSchema,
    Class: classSchema,
    ClassWithCount: classWithCountSchema,
    ClassTeacher: classTeacherSchema,
    Student: studentSchema,
    StudentWithClass: studentWithClassSchema,
    // LoginRequest: loginRequestSchema,
    // LoginResponse: loginResponseSchema,
    SessionResponse: sessionResponseSchema
}
