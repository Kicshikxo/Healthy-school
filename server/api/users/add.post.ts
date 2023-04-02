import { ActionType, Class, PrismaClient, Role, User } from '@prisma/client'
import { hashSync } from 'bcrypt'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const body: User & { organizationId: string; assignedClasses?: Class[] } = await readBody(event)

    if (
        !body.role ||
        !body.username ||
        !body.password ||
        !body.secondName ||
        !body.firstName ||
        !body.middleName ||
        !body.organizationId
    )
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'role, username, password, secondName, firstName, middleName or organizationId is not provided'
            })
        )
    if (body.role === Role.CLASS_TEACHER && (!body.assignedClasses || isEmpty(body.assignedClasses)))
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'assignedClasses is not provided'
            })
        )

    return await prisma.user
        .create({
            data: {
                role: body.role,
                username: body.username,
                password: hashSync(body.password, 8),

                secondName: body.secondName,
                firstName: body.firstName,
                middleName: body.middleName,
                organization: {
                    create: {
                        organizationId: body.organizationId
                    }
                },
                classes: {
                    createMany: {
                        data: body.assignedClasses?.map((currentClass) => ({ classId: currentClass.id })) ?? []
                    }
                }
            }
        })
        .then(() =>
            prisma.actionLog.create({
                data: {
                    createdById: readTokenData(event)!.id,
                    actionType: ActionType.ADD,
                    details: {
                        action: 'addUser',
                        data: {
                            role: body.role,
                            username: body.username,
                            secondName: body.secondName,
                            firstName: body.firstName,
                            middleName: body.middleName,
                            organizationId: body.organizationId,
                            assignedClasses: body.assignedClasses?.map((currentClass) => ({ id: currentClass.id }))
                        }
                    }
                }
            })
        )
})
