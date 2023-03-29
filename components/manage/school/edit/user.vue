<template>
    <manage-form
        success-submit-summary="Успешное изменение"
        error-submit-summary="Ошибка изменения"
        submit-label="Изменить"
        :on-submit="submit"
        :on-cancel="resetForm"
    >
        <template #title> Редактирование пользователя </template>
        <template #form>
            <form-select-user
                label="Пользователь"
                placeholder="Выберите пользователя для редактирования"
                v-model="selectedUser"
                :errorMessage="selectedUserError"
                :organization-id="data?.organizationId"
            />
            <form-input-dropdown
                label="Роль"
                placeholder="Выберите роль"
                v-model="role"
                :disabled="!selectedUser"
                :errorMessage="roleError"
                :options="Object.keys(Role).filter(role => role !== Role.OPERATOR).map((role) => ({ label: localizeRole(role as Role), value: role }))"
                optionLabel="label"
                optionValue="value"
            />
            <form-multiselect-class
                v-if="role === Role.CLASS_TEACHER"
                label="Закреплённые классы"
                placeholder="Выберите закреплённые классы"
                v-model="assignedClasses"
                :errorMessage="assignedClassesError"
                :organizationId="data?.organizationId"
            />
            <form-input-text
                label="Фамилия"
                placeholder="Введите фамилию"
                v-model="secondName"
                :disabled="!selectedUser"
                :errorMessage="secondNameError"
            />
            <form-input-text
                label="Имя"
                placeholder="Введите имя"
                v-model="firstName"
                :disabled="!selectedUser"
                :errorMessage="firstNameError"
            />
            <form-input-text
                label="Отчество"
                placeholder="Введите отчество"
                v-model="middleName"
                :disabled="!selectedUser"
                :errorMessage="middleNameError"
            />
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { Role, User, Class, ClassTeacher } from '@prisma/client'
import { useField, useForm } from 'vee-validate'

const { data } = useAuthState()
const { resetForm, validate } = useForm()

const { value: selectedUser, errorMessage: selectedUserError } = useField<
    User & {
        classes?: (ClassTeacher & {
            class: Class
        })[]
    }
>('user', (value) => {
    if (!value) return 'Выберите пользователя'
    return true
})
const { value: assignedClasses, errorMessage: assignedClassesError } = useField<Class[]>('assigned-classes', (value) => {
    if (!value?.length) return 'Выберите закреплённые классы'
    return true
})
const { value: role, errorMessage: roleError } = useField('role', validateRole)
const { value: secondName, errorMessage: secondNameError } = useField('secondName', validateSecondName)
const { value: firstName, errorMessage: firstNameError } = useField('firstName', validateFirstName)
const { value: middleName, errorMessage: middleNameError } = useField('middleName', validateMiddleName)

watch(selectedUser, (value) => {
    if (!value) return
    role.value = value.role
    assignedClasses.value = value.classes?.map((classes) => classes.class) ?? []
    secondName.value = value.secondName
    firstName.value = value.firstName
    middleName.value = value.middleName
})

async function submit() {
    const { valid } = await validate()
    if (!valid) {
        throw new Error('Форма имеет ошибки заполнения')
    }

    const { error } = await useFetch('/api/users/edit', {
        method: 'PATCH',
        body: {
            userData: {
                id: selectedUser.value.id,
                role: role.value,
                secondName: secondName.value,
                firstName: firstName.value,
                middleName: middleName.value,
                assignedClasses: assignedClasses.value
            } as User & { assignedClasses?: Class[] }
        }
    })
    if (error.value) {
        throw new Error(error.value.message)
    }

    resetForm()
    return 'Пользователь успешно изменён'
}
</script>
