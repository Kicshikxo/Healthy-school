<template>
    <manage-form
        success-submit-summary="Успешное изменение"
        error-submit-summary="Ошибка изменения"
        submit-label="Изменить"
        :on-submit="submit"
        :on-cancel="resetForm"
    >
        <template #title> Изменение пароля пользователя </template>
        <template #form>
            <form-select-user
                label="Пользователь"
                placeholder="Выберите пользователя для изменения его пароля"
                v-model="selectedUser"
                :errorMessage="selectedUserError"
                :organization-id="data?.organizationId"
            />
            <p-divider class="mt-1" />
            <div class="formgrid grid">
                <form-input-password
                    label="Новый пароль"
                    placeholder="Введите новый пароль"
                    v-model="newPassword"
                    :errorMessage="newPasswordError"
                    class="col"
                /><form-input-password
                    label="Повтор нового пароля"
                    placeholder="Повторите новый пароль"
                    v-model="repeatNewPassword"
                    :errorMessage="repeatNewPasswordError"
                    class="col"
                />
            </div>
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { User } from '@prisma/client'
import { useField, useForm } from 'vee-validate'

const { data } = useAuthState()
const { resetForm, validate } = useForm()

const { value: selectedUser, errorMessage: selectedUserError } = useField<User>('user', (value) => {
    if (!value) return 'Выберите пользователя'
    return true
})
const { value: newPassword, errorMessage: newPasswordError } = useField('newPassword', validatePassword)
const { value: repeatNewPassword, errorMessage: repeatNewPasswordError } = useField('repeatPassword', (value?: string) => {
    if (!value?.trim()) return 'Повторите пароль'
    if (value !== newPassword.value) return 'Пароли не совпадают'
    if (value.length > 50) return 'Слишком длинный пароль'
    return true
})

async function submit() {
    const { valid } = await validate()
    if (!valid) {
        throw new Error('Форма имеет ошибки заполнения')
    }

    const { error } = await useFetch('/api/users/change-password', {
        method: 'POST',
        body: {
            userId: selectedUser.value.id,
            newPassword: newPassword.value
        } as { userId: string; newPassword: string }
    })
    if (error.value) {
        throw new Error(error.value.message)
    }

    resetForm()
    return 'Пароль успешно изменён'
}
</script>
