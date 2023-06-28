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
            <form-select-municipality
                label="Муниципалитет"
                placeholder="Выберите муниципалитет"
                v-model="selectedMunicipality"
                :error-message="selectedMunicipalityError"
            />
            <form-select-organization
                label="Школа"
                placeholder="Выберите школу"
                v-model="selectedOrganization"
                :error-message="selectedOrganizationError"
                :municipality-id="selectedMunicipality?.id"
            />
            <form-select-user
                label="Пользователь"
                placeholder="Выберите пользователя для удаления"
                v-model="selectedUser"
                :error-message="selectedUserError"
                :organization-id="selectedOrganization?.id"
            />
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { EducationalOrganization, Municipality, User } from '@prisma/client'
import { useConfirm } from 'primevue/useconfirm'
import { useField, useForm } from 'vee-validate'

const confirm = useConfirm()
const { resetForm, validate } = useForm()

const { value: selectedMunicipality, errorMessage: selectedMunicipalityError } = useField<Municipality>(
    'municipality',
    (value) => validateMunicipality(value)
)
const { value: selectedOrganization, errorMessage: selectedOrganizationError } = useField<EducationalOrganization>(
    'organizationId',
    (value) => validateOrganization(value)
)
const { value: selectedUser, errorMessage: selectedUserError } = useField<User>('user', (value) => {
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
