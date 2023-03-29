<template>
    <manage-form
        success-submit-summary="Успешное удаление"
        error-submit-summary="Ошибка удаления"
        submit-label="Удалить"
        :on-submit="submit"
        :on-cancel="resetForm"
    >
        <template #title> Удаление учащегося </template>
        <template #form>
            <form-select-class
                label="Класс"
                placeholder="Выберите класс"
                v-model="selectedClass"
                :errorMessage="selectedClassError"
                :organization-id="data?.organizationId"
            />
            <form-select-student
                label="Учащийся"
                placeholder="Выберите учащегося для удаления"
                v-model="selectedStudent"
                :errorMessage="selectedStudentError"
                :class-id="selectedClass?.id"
            />
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { Class, Student } from '@prisma/client'
import { useField, useForm } from 'vee-validate'
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()
const { data } = useAuthState()
const { resetForm, validate } = useForm()

const { value: selectedClass, errorMessage: selectedClassError } = useField<Class>('user', (value) => {
    if (!value) return 'Выберите класс'
    return true
})
const { value: selectedStudent, errorMessage: selectedStudentError } = useField<Student>('student', (value) => {
    if (!value) return 'Выберите учащегося'
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
            message: 'Вы действительно хотите удалить учащегося?',
            acceptClass: 'p-button-danger',
            accept: async () => {
                const { error } = useFetch('/api/students/remove', {
                    method: 'DELETE',
                    body: { studentId: selectedStudent.value.id }
                })
                if (error.value) reject(new Error('Произошла ошибка удаления'))
                resolve('Учащийся успешно удалён')
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
