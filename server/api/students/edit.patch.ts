import { ActionType, Role, Student } from '@prisma/client'

export default defineEventHandler(async (event) => {
    if (!checkRole(event, { roles: [Role.OPERATOR, Role.SCHOOL_OPERATOR] })) return

    const body: Student = await readBody(event)

    if (
        !body.id ||
        !body.snils ||
        !body.secondName ||
        !body.firstName ||
        !body.middleName ||
        !body.gender ||
        !body.birthdate ||
        !body.classId
    )
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'id, snils, secondName, firstName, middleName, gender, birthdate or classId is not provided'
            })
        )

    return await prisma.student
        .update({
            where: {
                id: body.id
            },
            data: {
                snils: body.snils,

                secondName: body.secondName,
                firstName: body.firstName,
                middleName: body.middleName,

                gender: body.gender,
                birthdate: body.birthdate,
                classId: body.classId
            }
        })
        .then((data) =>
            prisma.actionLog.create({
                data: {
                    createdById: readTokenData(event)!.id,
                    actionType: ActionType.UPDATE,
                    details: JSON.parse(
                        JSON.stringify({
                            action: 'editStudent',
                            data
                        })
                    )
                }
            })
        )
})
