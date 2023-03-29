<template>
    <manage-form
        success-submit-summary="Успешное удаление"
        error-submit-summary="Ошибка удаления"
        submit-label="Удалить"
        :on-submit="submit"
        :on-cancel="resetForm"
    >
        <template #title> Удаление класса </template>
        <template #form>
            <form-select-class
                label="Класс"
                placeholder="Выберите класс для удаления"
                v-model="selectedClass"
                :errorMessage="selectedClassError"
                :organization-id="data?.organizationId"
            />
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { Class } from '@prisma/client'
import { useField, useForm } from 'vee-validate'
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()
const { data } = useAuthState()
const { resetForm, validate } = useForm()

const { value: selectedClass, errorMessage: selectedClassError } = useField<Class>('user', (value) => {
    if (!value) return 'Выберите класс'
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
            message: 'Вы действительно хотите удалить класс?',
            acceptClass: 'p-button-danger',
            accept: async () => {
                const { error } = useFetch('/api/classes/remove', {
                    method: 'DELETE',
                    body: { classId: selectedClass.value.id }
                })
                if (error.value) reject(new Error('Произошла ошибка удаления'))
                resolve('Класс успешно удалён')
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
