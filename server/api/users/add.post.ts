import { ActionType, Class, Role, User } from '@prisma/client'
import { hashSync } from 'bcrypt'

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
    if (body.role === Role.CLASS_TEACHER && (!body.assignedClasses || !body.assignedClasses.length))
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
        .then((data) =>
            prisma.actionLog.create({
                data: {
                    createdById: readTokenData(event)!.id,
                    actionType: ActionType.CREATE,
                    details: JSON.parse(
                        JSON.stringify({
                            action: 'addUser',
                            data: Object.assign(data, {
                                assignedClasses: body.assignedClasses?.map((currentClass) => ({ id: currentClass.id }))
                            })
                        })
                    )
                }
            })
        )
})
