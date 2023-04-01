<template>
    <manage-form
        success-submit-summary="Успешное добавление"
        error-submit-summary="Ошибка добавления"
        submit-label="Добавить"
        :on-submit="submit"
        :on-cancel="resetForm"
    >
        <template #title> Добавление класса </template>
        <template #form>
            <div class="formgrid grid">
                <form-input-number
                    label="Номер класса"
                    placeholder="Введите номер класса"
                    v-model="number"
                    :errorMessage="numberError"
                    :min="1"
                    :max="11"
                    class="col"
                />
                <form-input-text
                    label="Литер класса"
                    placeholder="Введите литер класса"
                    v-model.trim="liter"
                    :errorMessage="literError"
                    class="col"
                />
            </div>
            <div class="formgrid grid">
                <form-wrapper
                    label="Год начала учёбы"
                    inputId="add-class-start-year"
                    :errorMessage="startYearError"
                    class="col"
                >
                    <p-calendar
                        inputId="add-class-start-year"
                        v-model="startYear"
                        view="year"
                        dateFormat="yy"
                        placeholder="Введите год начала учёбы"
                        :class="{ 'p-invalid': startYearError }"
                        @hide="validateField('end-year')"
                    />
                </form-wrapper>
                <form-wrapper
                    label="Год окончания учёбы"
                    inputId="add-class-end-year"
                    :errorMessage="startYearError"
                    class="col"
                >
                    <p-calendar
                        inputId="add-class-end-year"
                        v-model="endYear"
                        view="year"
                        dateFormat="yy"
                        placeholder="Введите год окончания учёбы"
                        :class="{ 'p-invalid': endYearError }"
                        @hide="validateField('start-year')"
                    />
                </form-wrapper>
            </div>
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { Class } from '@prisma/client'
import { useField, useForm } from 'vee-validate'

const { data } = useAuthState()
const { resetForm, validate, validateField } = useForm()

const { value: number, errorMessage: numberError } = useField('number', validateClassNumber)
const { value: liter, errorMessage: literError } = useField('liter', validateClassLiter)
const { value: startYear, errorMessage: startYearError } = useField<Date>('start-year', (value) => {
    if (!value) return 'Введите год начала обучения'
    if (value > endYear.value) return 'Год начала обучения не может быть позже года конца обучения'
    return true
})
const { value: endYear, errorMessage: endYearError } = useField<Date>('end-year', (value) => {
    if (!value) return 'Введите год конца обучения'
    if (value < startYear.value) return 'Год конца обучения не может быть раньше года начала обучения'
    return true
})

async function submit() {
    const { valid } = await validate()
    if (!valid) {
        throw new Error('Форма имеет ошибки заполнения')
    }

    const { data: check } = await useFetch('/api/classes/check-available', {
        query: {
            number: number.value,
            liter: liter.value,
            academicYear: `${startYear.value.getFullYear()}-${endYear.value.getFullYear()}`,
            organizationId: data.value?.organizationId
        }
    })
    if (!check.value?.available) {
        throw new Error('Класс уже существует')
    }

    const { error } = await useFetch('/api/classes/add', {
        method: 'POST',
        body: {
            number: number.value,
            liter: liter.value,
            academicYear: `${startYear.value.getFullYear()}-${endYear.value.getFullYear()}`,
            organizationId: data.value?.organizationId
        } as Class & { organizationId: string }
    })
    if (error.value) {
        throw new Error(error.value.message)
    }

    resetForm()
    return 'Класс успешно добавлен'
}
</script>
