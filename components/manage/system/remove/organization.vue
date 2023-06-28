<template>
    <manage-form
        success-submit-summary="Успешное удаление"
        error-submit-summary="Ошибка удаления"
        submit-label="Удалить"
        :on-submit="submit"
        :on-cancel="resetForm"
    >
        <template #title> Удаление школы </template>
        <template #form>
            <form-select-municipality
                label="Муниципалитет"
                placeholder="Выберите муниципалитет"
                v-model="selectedMunicipality"
                :error-message="selectedMunicipalityError"
            />
            <form-select-organization
                label="Школа"
                placeholder="Выберите школу для удаления"
                v-model="selectedOrganization"
                :error-message="selectedOrganizationError"
                :municipality-id="selectedMunicipality?.id"
            />
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { EducationalOrganization, Municipality } from '@prisma/client'
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

async function submit() {
    const { valid } = await validate()
    if (!valid) {
        throw new Error('Форма имеет ошибки заполнения')
    }

    return await new Promise<string>((resolve, reject) =>
        confirm.require({
            header: 'Подтвердите действие',
            message: 'Вы действительно хотите удалить школу?',
            acceptClass: 'p-button-danger',
            accept: async () => {
                const { error } = useFetch('/api/organizations/remove', {
                    method: 'DELETE',
                    body: { organizationId: selectedOrganization.value.id }
                })
                if (error.value) return reject(new Error('Произошла ошибка удаления'))
                resolve('Школа успешно удалена')
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
