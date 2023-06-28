<template>
    <manage-form
        success-submit-summary="Успешное изменение"
        error-submit-summary="Ошибка изменение"
        submit-label="Изменить"
        :on-submit="submit"
        :on-cancel="resetForm"
    >
        <template #title> Изменение школы </template>
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
            <p-divider class="mt-1" />
            <form-input-text
                label="Название школы"
                placeholder="Введите название школы"
                v-model="name"
                :error-message="nameError"
                :disabled="!selectedOrganization"
            />
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { EducationalOrganization, Municipality } from '@prisma/client'
import { useField, useForm } from 'vee-validate'

const { resetForm, validate } = useForm()

const { value: selectedMunicipality, errorMessage: selectedMunicipalityError } = useField<Municipality>(
    'municipality',
    (value) => validateMunicipality(value)
)
const { value: selectedOrganization, errorMessage: selectedOrganizationError } = useField<EducationalOrganization>(
    'organizationId',
    (value) => validateOrganization(value)
)
const { value: name, errorMessage: nameError } = useField<string>('name', (value) => {
    if (!value) return 'Введите название школы'
    return true
})

watch(selectedOrganization, (value) => {
    if (!value) return
    name.value = value.name
})

async function submit() {
    const { valid } = await validate()
    if (!valid) {
        throw new Error('Форма имеет ошибки заполнения')
    }

    const { data: check } = await useFetch('/api/organizations/check-available', {
        query: {
            name: name.value,
            skipId: selectedOrganization.value.id
        } as { name: string; skipId: string }
    })
    if (!check.value?.available) {
        throw new Error('Школа уже существует')
    }

    const { error } = await useFetch('/api/organizations/edit', {
        method: 'PATCH',
        body: {
            organizationId: selectedOrganization.value.id,
            name: name.value
        } as { organizationId: string; name: string }
    })
    if (error.value) {
        throw new Error(error.value.message)
    }

    resetForm()
    return 'Школа успешно изменёна'
}
</script>
