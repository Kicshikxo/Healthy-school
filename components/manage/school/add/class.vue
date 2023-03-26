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
                <manage-form-input-number
                    label="Номер класса"
                    placeholder="Введите номер класса"
                    v-model="number"
                    :error="numberError"
                    :min="1"
                    :max="11"
                    class="col"
                />
                <manage-form-input-text
                    label="Литер класса"
                    placeholder="Введите литер класса"
                    v-model="liter"
                    :error="literError"
                    class="col"
                />
            </div>
            <div class="formgrid grid">
                <manage-form-input-wrapper
                    label="Год начала учёбы"
                    inputId="add-class-start-year"
                    :error="startYearError"
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
                </manage-form-input-wrapper>
                <manage-form-input-wrapper
                    label="Год окончания учёбы"
                    inputId="add-class-end-year"
                    :error="startYearError"
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
                </manage-form-input-wrapper>
            </div>
        </template>
    </manage-form>
</template>

<script setup lang="ts">
import { Class } from '@prisma/client'
import { useField, useForm } from 'vee-validate'

const { resetForm, validate, validateField } = useForm()

const { value: number, errorMessage: numberError } = useField('number', (value?: number) => {
    if (!value) return 'Введите номер класса'
    if (value < 1 || value > 11) return 'Номер класса должен находится в диапазоне от 1 до 11'
    return true
})
const { value: liter, errorMessage: literError } = useField('liter', (value?: string) => {
    if (!value?.trim()) return true
    if (value.length > 1) return 'Длина литера не может быть больше одного символа'
    if (!/^[А-ЯЁ]$/.test(value)) return 'Неверный формат литера'
    return true
})
const { value: startYear, errorMessage: startYearError } = useField<Date>('start-year', (value?: Date) => {
    if (!value) return 'Введите год начала обучения'
    if (value > endYear.value) return 'Год начала обучения не может быть позже года конца обучения'
    return true
})
const { value: endYear, errorMessage: endYearError } = useField<Date>('end-year', (value?: Date) => {
    if (!value) return 'Введите год конца обучения'
    if (value < startYear.value) return 'Год конца обучения не может быть раньше года начала обучения'
    return true
})

const { data } = useAuthState()

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
            classData: {
                number: number.value,
                liter: liter.value,
                academicYear: `${startYear.value.getFullYear()}-${endYear.value.getFullYear()}`,
                organizationId: data.value?.organizationId
            } as Class & { organizationId: string }
        }
    })
    if (error.value) {
        throw new Error(error.value.message)
    }

    return 'Класс успешно добавлен'
}
</script>
