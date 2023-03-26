<template>
    <p-dialog
        :modal="true"
        :visible="visible"
        @update:visible="$emit('update:visible', $event)"
        header="Добавить учащегося"
        class="w-30rem"
    >
        <manage-form
            success-submit-summary="Успешное добавление"
            error-submit-summary="Ошибка добавления"
            submit-label="Добавить"
            :on-submit="submit"
            :on-cancel="resetForm"
        >
            <template #title> Добавление учащегося </template>
            <template #form>
                <manage-form-input-mask
                    label="СНИЛС"
                    placeholder="Введите СНИЛС"
                    v-model="snils"
                    :error="snilsError"
                    mask="999-999-999 99"
                />
                <manage-form-input-text
                    label="Фамилия"
                    placeholder="Введите фамилию"
                    v-model="secondName"
                    :error="secondNameError"
                />
                <manage-form-input-text label="Имя" placeholder="Введите имя" v-model="firstName" :error="firstNameError" />
                <manage-form-input-text
                    label="Отчество"
                    placeholder="Введите отчество"
                    v-model="middleName"
                    :error="middleNameError"
                />
                <div class="formgrid grid">
                    <manage-form-input-calendar
                        label="Дата рождения"
                        placeholder="Введите дату рождения"
                        v-model="birthdate"
                        :error="birthdateError"
                        class="col"
                    />
                    <manage-form-input-dropdown
                        label="Пол"
                        placeholder="Выберите пол"
                        v-model="gender"
                        :error="genderError"
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
    </p-dialog>
</template>

<script setup lang="ts">
import { Gender, Student } from '@prisma/client'
import { useField, useForm } from 'vee-validate'
import { useClassStore } from '~~/store/class'

const props = withDefaults(
    defineProps<{
        visible?: boolean
    }>(),
    {
        visible: false
    }
)

const emit = defineEmits<{
    (event: 'update:visible', value: boolean): void
    (event: 'cancel'): void
    (event: 'added'): void
}>()

const currentClass = useClassStore()
const { resetForm, validate, setFieldError } = useForm()

const { value: snils, errorMessage: snilsError } = useField('snils', (value: string) => {
    if (!validateSnils(value)) return 'Неверный формат снилса'
    return true
})
const { value: secondName, errorMessage: secondNameError } = useField('secondName', (value?: string) => {
    if (!value?.trim()) return 'Введите фамилию'
    if (!/^[А-ЯЁ][а-яё]+$/.test(value)) return 'Неверный формат фамилии'
    return true
})
const { value: firstName, errorMessage: firstNameError } = useField('firstName', (value?: string) => {
    if (!value?.trim()) return 'Введите имя'
    if (!/^[А-ЯЁ][а-яё]+$/.test(value)) return 'Неверный формат имени'
    return true
})
const { value: middleName, errorMessage: middleNameError } = useField('middleName', (value?: string) => {
    if (!value?.trim()) return 'Введите отчество'
    if (!/^[А-ЯЁ][а-яё]+$/.test(value)) return 'Неверный формат отчества'
    return true
})
const { value: gender, errorMessage: genderError } = useField('gender', (value: Gender) => {
    if (!value) return 'Выберите пол'
    if (![Gender.MALE, Gender.FEMALE].includes(value)) return 'Неверный пол'
    return true
})
const { value: birthdate, errorMessage: birthdateError } = useField('birthdate', (value: Date) => {
    if (!value) return 'Выберите дату рождения'
    if (value > new Date()) return 'Дата рождения не может быть в будущем'
    return true
})
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
                classId: currentClass.id
            } as Student
        }
    })
    if (error.value) {
        throw new Error(error.value.message)
    }

    return 'Учащийся успешно добавлен'
}
</script>
