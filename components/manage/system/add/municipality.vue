<template>
    <manage-form
        success-submit-summary="Успешное добавление"
        error-submit-summary="Ошибка добавления"
        submit-label="Добавить"
        :on-submit="submit"
        :on-cancel="resetForm"
    >
        <template #title> Добавление муниципалитета </template>
        <template #form>
            <form-input-text
                label="Название муниципалитета"
                placeholder="Введите название муниципалитета"
                v-model="name"
                :error-message="nameError"
            />
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'

const { resetForm, validate } = useForm()

const { value: name, errorMessage: nameError } = useField<string>('name', (value) => {
    if (!value) return 'Введите название муниципалитета'
    return true
})

async function submit() {
    const { valid } = await validate()
    if (!valid) {
        throw new Error('Форма имеет ошибки заполнения')
    }

    const { data: check } = await useFetch('/api/municipalities/check-available', {
        query: {
            name: name.value
        } as { name: string }
    })
    if (!check.value?.available) {
        throw new Error('Муниципалитет уже существует')
    }

    const { error } = await useFetch('/api/municipalities/add', {
        method: 'POST',
        body: {
            name: name.value
        } as { name: string }
    })
    if (error.value) {
        throw new Error(error.value.message)
    }

    resetForm()
    return 'Муниципалитет успешно добавлен'
}
</script>
