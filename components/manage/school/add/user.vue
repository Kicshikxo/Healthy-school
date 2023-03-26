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
                <manage-form-input-text
                    label="Имя пользователя"
                    placeholder="Введите имя пользователя (логин)"
                    v-model="username"
                    :error="usernameError"
                    class="col"
                />
                <manage-form-input-password
                    label="Пароль"
                    placeholder="Введите пароль"
                    v-model="password"
                    :error="passwordError"
                    class="col"
                />
            </div>
            <div class="formgrid grid">
                <manage-form-input-dropdown
                    label="Роль"
                    placeholder="Выберите роль"
                    v-model="role"
                    :error="roleError"
                    :options="Object.keys(Role).filter(role => role !== Role.OPERATOR).map((role) => ({ label: localizeRole(role as Role), value: role }))"
                    optionLabel="label"
                    optionValue="value"
                    class="col"
                />
                <manage-form-input-password
                    label="Повтор пароля"
                    placeholder="Повторите пароль"
                    v-model="repeatPassword"
                    :error="repeatPasswordError"
                    class="col"
                />
            </div>
            <manage-form-input-text
                label="Фамилия"
                placeholder="Введите фамилию"
                v-model="secondName"
                :error="secondNameError"
            />
            <manage-form-input-text label="Имя" placeholder="Введите имя" v-model="firstName" :error="firstNameError" />
            <manage-form-input-text
                label="Отчество"
                placeholder="Введите отчество"
                v-model="middleName"
                :error="middleNameError"
            />
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { Role } from '@prisma/client'
import { useField, useForm } from 'vee-validate'

const { resetForm, validate, setFieldError } = useForm()

const { value: role, errorMessage: roleError } = useField('role', (value: Role) => {
    if (!value) return 'Выберите роль'
    if (
        !Object.keys(Role)
            .filter((role) => role !== Role.OPERATOR)
            .includes(value)
    )
        return 'Неверная роль'
    return true
})

const { value: username, errorMessage: usernameError } = useField('username', (value?: string) => {
    if (!value?.trim()) return 'Введите имя пользователя'
    if (!/^[a-zA-Z0-9]+$/.test(value)) return 'Неверный формат имени пользователя'
    return true
})
const { value: password, errorMessage: passwordError } = useField('password', (value?: string) => {
    if (!value?.trim()) return 'Введите пароль'
    if (!/^[0-9a-zA-Z!@#$%^&*]{8,}$/.test(value)) return 'Неверный формат пароля'
    return true
})
const { value: repeatPassword, errorMessage: repeatPasswordError } = useField('repeat-password', (value?: string) => {
    if (!value?.trim()) return 'Повторите пароль'
    if (value !== password.value) return 'Пароли не совпадают'
    return true
})
const { value: secondName, errorMessage: secondNameError } = useField('secondName', (value?: string) => {
    if (!value?.trim()) return 'Введите фамилию'
    if (!/^[А-ЯЁ][а-яё]+$/.test(value)) return 'Неверный формат фамилии'
    return true
})
const { value: firstName, errorMessage: firstNameError } = useField('firstName', (value?: string) => {
    if (!value?.trim()) return 'Введите имя'
    if (!/^[А-ЯЁ][а-яё]+$/.test(value)) return 'Неверный формат имени'
    return true
})
const { value: middleName, errorMessage: middleNameError } = useField('middleName', (value?: string) => {
    if (!value?.trim()) return 'Введите отчество'
    if (!/^[А-ЯЁ][а-яё]+$/.test(value)) return 'Неверный формат отчества'
    return true
})

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
}
</script>
