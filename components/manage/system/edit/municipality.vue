<template>
    <manage-form
        success-submit-summary="Успешное изменение"
        error-submit-summary="Ошибка изменение"
        submit-label="Изменить"
        :on-submit="submit"
        :on-cancel="resetForm"
    >
        <template #title> Изменение муниципалитета </template>
        <template #form>
            <form-select-municipality
                label="Муниципалитет"
                placeholder="Выберите муниципалитет для изменения"
                v-model="selectedMunicipality"
                :error-message="selectedMunicipalityError"
            />
            <p-divider class="mt-1" />
            <form-input-text
                label="Название муниципалитета"
                placeholder="Введите название муниципалитета"
                v-model="name"
                :error-message="nameError"
                :disabled="!selectedMunicipality"
            />
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { Municipality } from '@prisma/client'
import { useField, useForm } from 'vee-validate'

const { resetForm, validate } = useForm()

const { value: selectedMunicipality, errorMessage: selectedMunicipalityError } = useField<Municipality>(
    'municipality',
    validateMunicipality
)
const { value: name, errorMessage: nameError } = useField<string>('name', (value) => {
    if (!value) return 'Введите название муниципалитета'
    return true
})

watch(selectedMunicipality, (value) => {
    if (!value) return
    name.value = value.name
})

async function submit() {
    const { valid } = await validate()
    if (!valid) {
        throw new Error('Форма имеет ошибки заполнения')
    }

    const { data: check } = await useFetch('/api/municipalities/check-available', {
        query: {
            name: name.value,
            skipId: selectedMunicipality.value.id
        } as { name: string; skipId: string }
    })
    if (!check.value?.available) {
        throw new Error('Муниципалитет уже существует')
    }

    const { error } = await useFetch('/api/municipalities/edit', {
        method: 'PATCH',
        body: {
            municipalityId: selectedMunicipality.value.id,
            name: name.value
        } as { municipalityId: string; name: string }
    })
    if (error.value) {
        throw new Error(error.value.message)
    }

    resetForm()
    return 'Муниципалитет успешно изменён'
}
</script>
