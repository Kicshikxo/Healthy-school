<template>
    <p-dialog
        :modal="true"
        :visible="visible"
        @update:visible="$emit('update:visible', $event)"
        header="Добавить учащегося"
        class="p-fluid w-30rem"
    >
        <form @submit="onSubmit">
            <div class="field mb-1">
                <label for="snils">СНИЛС</label>
                <p-input-mask
                    id="snils"
                    v-model="snils"
                    mask="999-999-999 99"
                    required="true"
                    placeholder="Введите СНИЛС"
                    autofocus
                    :class="{ 'p-invalid': snilsError }"
                />
                <small class="p-error" id="text-error">{{ snilsError || '&nbsp;' }}</small>
            </div>
            <div class="field mb-1">
                <label for="secondName">Фамилия</label>
                <p-input-text
                    id="secondName"
                    v-model="secondName"
                    required="true"
                    placeholder="Введите фамилию"
                    :class="{ 'p-invalid': secondNameError }"
                />
                <small class="p-error" id="text-error">{{ secondNameError || '&nbsp;' }}</small>
            </div>
            <div class="field mb-1">
                <label for="firstName">Имя</label>
                <p-input-text
                    id="firstName"
                    v-model="firstName"
                    required="true"
                    placeholder="Введите имя"
                    :class="{ 'p-invalid': firstNameError }"
                />
                <small class="p-error" id="text-error">{{ firstNameError || '&nbsp;' }}</small>
            </div>
            <div class="field mb-1">
                <label for="middleName">Отчество</label>
                <p-input-text
                    id="middleName"
                    v-model="middleName"
                    required="true"
                    placeholder="Введите отчество"
                    :class="{ 'p-invalid': middleNameError }"
                />
                <small class="p-error" id="text-error">{{ middleNameError || '&nbsp;' }}</small>
            </div>
            <div class="formgrid grid">
                <div class="field col mb-1">
                    <label for="birthdate">Дата рождения</label>
                    <p-calendar
                        inputId="birthdate"
                        v-model="birthdate"
                        placeholder="Введите дату рождения"
                        :class="{ 'p-invalid': birthdateError }"
                    />
                    <small class="p-error" id="text-error">{{ birthdateError || '&nbsp;' }}</small>
                </div>
                <div class="field col w-15rem mb-1">
                    <label>Пол</label>
                    <p-dropdown
                        v-model="gender"
                        :options="[
                            { label: 'Мужской', value: 'MALE' },
                            { label: 'Женский', value: 'FEMALE' }
                        ]"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Выберите пол"
                        panelClass="border-1 surface-border"
                        :class="{ 'p-invalid': genderError }"
                    />
                    <small class="p-error" id="text-error">{{ genderError || '&nbsp;' }}</small>
                </div>
            </div>
        </form>
        <template #footer>
            <p-button
                label="Отмена"
                icon="pi pi-times"
                class="p-button-text p-button-danger"
                @click="cancel"
                :disabled="loading"
            />
            <p-button label="Добавить" icon="pi pi-check" class="p-button-text" @click="onSubmit" :loading="loading" />
        </template>
    </p-dialog>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

import { useField, useForm } from 'vee-validate'
import { Gender } from '@prisma/client'
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

const toast = useToast()
const { handleSubmit, resetForm } = useForm()

const { value: snils, errorMessage: snilsError } = useField('snils', (value: string) =>
    /^\d{3}-\d{3}-\d{3} \d{2}$/.test(value) ? true : 'Неверный формат снилса'
)
const { value: secondName, errorMessage: secondNameError } = useField('secondName', (value: string) =>
    /^[А-ЯЁ][а-яё]+$/.test(value) ? true : 'Невалидная фамилия'
)
const { value: firstName, errorMessage: firstNameError } = useField('firstName', (value: string) =>
    /^[А-ЯЁ][а-яё]+$/.test(value) ? true : 'Невалидное имя'
)
const { value: middleName, errorMessage: middleNameError } = useField('middleName', (value: string) =>
    /^[А-ЯЁ][а-яё]+$/.test(value) ? true : 'Невалидное отчество'
)
const { value: gender, errorMessage: genderError } = useField('gender', (value: Gender) =>
    [Gender.MALE, Gender.FEMALE].includes(value) ? true : 'Невалидный пол'
)
const currentDate = new Date()
const possibleStudentBirthdate = new Date()
possibleStudentBirthdate.setFullYear(currentDate.getFullYear() - (currentClass.data?.number ?? 0) - 7)
const { value: birthdate, errorMessage: birthdateError } = useField(
    'birthdate',
    (value: Date) => (value < new Date() ? true : 'Невалидная дата рождения'),
    { initialValue: possibleStudentBirthdate }
)

const loading = ref(false)

async function cancel() {
    emit('update:visible', false)
    emit('cancel')
    resetForm()
}

const onSubmit = handleSubmit(async (values) => {
    loading.value = true
    const { error } = await useFetch('/api/students/add', {
        method: 'POST',
        body: {
            studentData: {
                ...values,
                classId: currentClass.id
            }
        }
    })
    if (error.value) {
        return toast.add({
            severity: 'error',
            summary: 'Ошибка добавления',
            detail: 'Учащийся не был добавлен',
            life: 3000
        })
    }

    toast.add({
        severity: 'success',
        summary: 'Успешное добавление',
        detail: 'Учащийся успешно добавлен',
        life: 3000
    })

    loading.value = false
    emit('update:visible', false)
    emit('added')
    resetForm()
})
</script>
