import { ActionType, Class, PrismaClient, Role, User } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const body: User & { assignedClasses?: Class[] } = await readBody(event)

    if (!body.id || !body.role || !body.secondName || !body.firstName || !body.middleName)
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'id, role, secondName, firstName or middleName is not provided'
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
        .update({
            where: {
                id: body.id
            },
            data: {
                role: body.role,
                secondName: body.secondName,
                firstName: body.firstName,
                middleName: body.middleName,
                classes: {
                    connectOrCreate: body.assignedClasses?.map((currentClass) => ({
                        where: {
                            userId_classId: {
                                userId: body.id,
                                classId: currentClass.id
                            }
                        },
                        create: {
                            classId: currentClass.id
                        }
                    }))
                }
            }
        })
        .then((data) =>
            prisma.actionLog.create({
                data: {
                    createdById: readTokenData(event)!.id,
                    actionType: ActionType.UPDATE,
                    details: JSON.parse(
                        JSON.stringify({
                            action: 'editUser',
                            data: Object.assign(data, {
                                assignedClasses: body.assignedClasses?.map((currentClass) => ({ id: currentClass.id }))
                            })
                        })
                    )
                }
            })
        )
})
