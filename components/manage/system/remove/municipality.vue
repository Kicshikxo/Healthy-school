<template>
    <manage-form
        success-submit-summary="Успешное удаление"
        error-submit-summary="Ошибка удаления"
        submit-label="Удалить"
        :on-submit="submit"
        :on-cancel="resetForm"
    >
        <template #title> Удаление муниципалитета </template>
        <template #form>
            <form-select-municipality
                label="Муниципалитет"
                placeholder="Выберите муниципалитет для удаления"
                v-model="selectedMunicipality"
                :error-message="selectedMunicipalityError"
            />
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { Municipality } from '@prisma/client'
import { useConfirm } from 'primevue/useconfirm'
import { useField, useForm } from 'vee-validate'

const confirm = useConfirm()
const { resetForm, validate } = useForm()

const { value: selectedMunicipality, errorMessage: selectedMunicipalityError } = useField<Municipality>(
    'municipality',
    (value) => validateMunicipality(value)
)

async function submit() {
    const { valid } = await validate()
    if (!valid) {
        throw new Error('Форма имеет ошибки заполнения')
    }

    return await new Promise<string>((resolve, reject) =>
        confirm.require({
            header: 'Подтвердите действие',
            message: 'Вы действительно хотите удалить муниципалитет?',
            acceptClass: 'p-button-danger',
            accept: async () => {
                const { error } = useFetch('/api/municipalities/remove', {
                    method: 'DELETE',
                    body: { municipalityId: selectedMunicipality.value.id }
                })
                if (error.value) return reject(new Error('Произошла ошибка удаления'))
                resolve('Муниципалитет успешно удалён')
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
