<template>
    <manage-form
        success-submit-summary="Успешное добавление"
        error-submit-summary="Ошибка добавления"
        submit-label="Добавить"
        :on-submit="submit"
        :on-cancel="resetForm"
    >
        <template #title> Добавление пользователя </template>
        <template #form>
            <div class="formgrid grid">
                <form-input-text
                    label="Имя пользователя"
                    placeholder="Введите имя пользователя (логин)"
                    v-model="username"
                    :errorMessage="usernameError"
                    class="col"
                />
                <form-input-password
                    label="Пароль"
                    placeholder="Введите пароль"
                    v-model="password"
                    :errorMessage="passwordError"
                    class="col"
                />
            </div>
            <div class="formgrid grid">
                <form-input-dropdown
                    label="Роль"
                    placeholder="Выберите роль"
                    v-model="role"
                    :errorMessage="roleError"
                    :options="Object.keys(Role).filter(role => role !== Role.OPERATOR).map((role) => ({ label: localizeRole(role as Role), value: role }))"
                    optionLabel="label"
                    optionValue="value"
                    class="col"
                />
                <form-input-password
                    label="Повтор пароля"
                    placeholder="Повторите пароль"
                    v-model="repeatPassword"
                    :errorMessage="repeatPasswordError"
                    class="col"
                />
            </div>
            <form-input-text
                label="Фамилия"
                placeholder="Введите фамилию"
                v-model="secondName"
                :errorMessage="secondNameError"
            />
            <form-input-text label="Имя" placeholder="Введите имя" v-model="firstName" :errorMessage="firstNameError" />
            <form-input-text
                label="Отчество"
                placeholder="Введите отчество"
                v-model="middleName"
                :errorMessage="middleNameError"
            />
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { Role } from '@prisma/client'
import { useField, useForm } from 'vee-validate'

const { resetForm, validate, setFieldError } = useForm()

const { value: role, errorMessage: roleError } = useField('role', validateRole)
const { value: username, errorMessage: usernameError } = useField('username', validateUsername)
const { value: password, errorMessage: passwordError } = useField('password', validatePassword)
const { value: repeatPassword, errorMessage: repeatPasswordError } = useField('repeat-password', (value?: string) => {
    if (!value?.trim()) return 'Повторите пароль'
    if (value !== password.value) return 'Пароли не совпадают'
    if (value.length > 50) return 'Слишком длинный пароль'
    return true
})
const { value: secondName, errorMessage: secondNameError } = useField('secondName', validateSecondName)
const { value: firstName, errorMessage: firstNameError } = useField('firstName', validateFirstName)
const { value: middleName, errorMessage: middleNameError } = useField('middleName', validateMiddleName)

const { data } = useAuthState()

async function submit() {
    const { valid } = await validate()
    if (!valid) {
        throw new Error('Форма имеет ошибки заполнения')
    }

    const { data: checkUsername } = await useFetch('/api/users/check-username', {
        query: { username: username.value }
    })
    if (!checkUsername.value?.available) {
        setFieldError('username', 'Имя пользователя уже используется')
        throw new Error('Имя пользователя уже используется')
    }

    const { error } = await useFetch('/api/users/add', {
        method: 'POST',
        body: {
            userData: {
                role: role.value,
                username: username.value,
                password: password.value,
                secondName: secondName.value,
                firstName: firstName.value,
                middleName: middleName.value,
                organizationId: data.value?.organizationId
            }
        }
    })
    if (error.value) {
        throw new Error(error.value.message)
    }

    return 'Пользователь успешно добавлен'
    resetForm()
}
</script>
