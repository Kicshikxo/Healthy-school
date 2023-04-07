<template>
    <manage-form
        success-submit-summary="Успешное добавление"
        error-submit-summary="Ошибка добавления"
        submit-label="Добавить"
        :on-submit="submit"
        :on-cancel="resetForm"
    >
        <template #title> Добавление школы </template>
        <template #form>
            <form-select-municipality
                label="Муниципалитет"
                placeholder="Выберите муниципалитет"
                v-model="selectedMunicipality"
                :error-message="selectedMunicipalityError"
            />
            <p-divider class="mt-1" />
            <form-input-text
                label="Название школы"
                placeholder="Введите название школы"
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
    if (!value) return 'Введите название школы'
    return true
})

async function submit() {
    const { valid } = await validate()
    if (!valid) {
        throw new Error('Форма имеет ошибки заполнения')
    }

    const { data: check } = await useFetch('/api/organizations/check-available', {
        query: {
            name: name.value
        } as { name: string }
    })
    if (!check.value?.available) {
        throw new Error('Школа уже существует')
    }

    const { error } = await useFetch('/api/organizations/add', {
        method: 'POST',
        body: {
            municipalityId: selectedMunicipality.value.id,
            name: name.value
        } as { municipalityId: string; name: string }
    })
    if (error.value) {
        throw new Error(error.value.message)
    }

    resetForm()
    return 'Школа успешно добавлена'
}
</script>
