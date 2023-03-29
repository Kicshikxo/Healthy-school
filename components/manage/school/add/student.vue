<template>
    <manage-form
        success-submit-summary="Успешное добавление"
        error-submit-summary="Ошибка добавления"
        submit-label="Добавить"
        :on-submit="submit"
        :on-cancel="resetForm"
    >
        <template #title> Добавление учащегося </template>
        <template #form>
            <form-select-class
                label="Класс"
                placeholder="Выберите класс"
                v-model="selectedClass"
                :errorMessage="selectedClassError"
                :organization-id="data?.organizationId"
            />
            <form-input-mask
                label="СНИЛС"
                placeholder="Введите СНИЛС"
                v-model="snils"
                :errorMessage="snilsError"
                mask="999-999-999 99"
            />
            <form-input-text
                label="Фамилия"
                placeholder="Введите фамилию"
                v-model="secondName"
                :errorMessage="secondNameError"
            />
            <form-input-text label="Имя" placeholder="Введите имя" v-model="firstName" :errorMessage="firstNameError" />
            <form-input-text
                label="Отчество"
                placeholder="Введите отчество"
                v-model="middleName"
                :errorMessage="middleNameError"
            />
            <div class="formgrid grid">
                <form-input-calendar
                    label="Дата рождения"
                    placeholder="Введите дату рождения"
                    v-model="birthdate"
                    :errorMessage="birthdateError"
                    class="col"
                />
                <form-input-dropdown
                    label="Пол"
                    placeholder="Выберите пол"
                    v-model="gender"
                    :errorMessage="genderError"
                    :options="[
                        { label: 'Мужской', value: 'MALE' },
                        { label: 'Женский', value: 'FEMALE' }
                    ]"
                    optionLabel="label"
                    optionValue="value"
                    class="col"
                />
            </div>
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { Class, Student } from '@prisma/client'
import { useField, useForm } from 'vee-validate'

const { data } = useAuthState()
const { resetForm, validate, setFieldError } = useForm()

const { value: selectedClass, errorMessage: selectedClassError } = useField<Class>('class', (value) => {
    if (!value) return 'Выберите класс'
    return true
})
const { value: snils, errorMessage: snilsError } = useField('snils', validateSnils)
const { value: secondName, errorMessage: secondNameError } = useField('secondName', validateSecondName)
const { value: firstName, errorMessage: firstNameError } = useField('firstName', validateFirstName)
const { value: middleName, errorMessage: middleNameError } = useField('middleName', validateMiddleName)
const { value: gender, errorMessage: genderError } = useField('gender', validateGender)
const { value: birthdate, errorMessage: birthdateError } = useField('birthdate', validateBirthdate)

async function submit() {
    const { valid } = await validate()
    if (!valid) {
        throw new Error('Форма имеет ошибки заполнения')
    }

    const { data: check } = await useFetch('/api/students/check-available', {
        query: {
            snils: snils.value
        }
    })
    if (!check.value?.available) {
        setFieldError('snils', 'Учащийся с таким СНИЛСом уже существует')
        throw new Error('Учащийся с таким СНИЛСом уже существует')
    }

    const { error } = await useFetch('/api/students/add', {
        method: 'POST',
        body: {
            studentData: {
                snils: snils.value,
                secondName: secondName.value,
                firstName: firstName.value,
                middleName: middleName.value,
                gender: gender.value,
                birthdate: birthdate.value,
                classId: selectedClass.value.id
            } as Student
        }
    })
    if (error.value) {
        throw new Error(error.value.message)
    }

    resetForm()
    return 'Учащийся успешно добавлен'
}
</script>
