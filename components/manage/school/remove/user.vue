<template>
    <manage-form
        success-submit-summary="Успешное удаление"
        error-submit-summary="Ошибка удаления"
        submit-label="Удалить"
        :on-submit="submit"
        :on-cancel="resetForm"
    >
        <template #title> Удаление пользователя </template>
        <template #form>
            <form-select-user
                label="Пользователь"
                placeholder="Выберите пользователя для удаления"
                v-model="selectedUser"
                :errorMessage="selectedUserError"
                :organization-id="data?.organizationId"
            />
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { User } from '@prisma/client'
import { useField, useForm } from 'vee-validate'
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()
const { data } = useAuthState()
const { resetForm, validate } = useForm()

const { value: selectedUser, errorMessage: selectedUserError } = useField<User>('user', (value: User) => {
    if (!value) return 'Выберите пользователя'
    return true
})

async function submit() {
    const { valid } = await validate()
    if (!valid) {
        throw new Error('Форма имеет ошибки заполнения')
    }

    return await new Promise<string>((resolve, reject) =>
        confirm.require({
            header: 'Подтвердите действие',
            message: 'Вы действительно хотите удалить пользователя?',
            acceptClass: 'p-button-danger',
            accept: async () => {
                const { error } = useFetch('/api/users/remove', {
                    method: 'DELETE',
                    body: { userId: selectedUser.value.id }
                })
                if (error.value) reject(new Error('Произошла ошибка удаления'))
                resolve('Пользователь успешно удалён')
                resetForm()
            },
            reject: () => {
                reject(new Error('Удаление не было подтверждено'))
            },
            onHide: () => {
                reject(new Error('Удаление не было подтверждено'))
            }
        })
    )
}
</script>
