<template>
    <div>
        <section class="p-5 pb-0">
            <div class="flex justify-content-between gap-8">
                <div class="flex flex-auto gap-5 h-6rem">
                    <div class="flex flex-auto flex-column justify-content-between">
                        <div class="flex align-items-center text-3xl h-2rem">
                            <div class="text-800 font-bold">
                                {{ data?.secondName }}
                                {{ data?.firstName }}
                                {{ data?.middleName }}
                            </div>
                        </div>
                        <div class="flex gap-5">
                            <div class="flex flex-column">
                                <div class="text-500">Роль</div>
                                <div class="flex align-items-end mt-2 text-700">
                                    {{ localizeRole(data?.role!) }}
                                </div>
                            </div>
                            <div v-if="!errorOrganization" class="flex flex-column">
                                <div class="text-500">Организация</div>
                                <div class="flex align-items-end mt-2 text-700">
                                    {{ organization?.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p-button
                        label="Выйти"
                        icon="pi pi-sign-out"
                        class="p-button-danger p-button-text"
                        @click="signOut({ redirectTo: '/login' })"
                    />
                </div>
            </div>
        </section>
        <manage-form
            success-submit-summary="Успешное изменение"
            error-submit-summary="Ошибка изменения"
            submit-label="Изменить"
            :on-submit="submit"
            :on-cancel="resetForm"
        >
            <template #title> Изменение пароля </template>
            <template #form>
                <div class="formgrid grid">
                    <form-input-password
                        label="Текущий пароль"
                        placeholder="Введите текущий пароль"
                        v-model="currentPassword"
                        :errorMessage="currentPasswordError"
                        class="col"
                    />
                    <form-input-password
                        label="Новый пароль"
                        placeholder="Введите новый пароль"
                        v-model="newPassword"
                        :errorMessage="newPasswordError"
                        class="col"
                    />
                </div>
                <div class="formgrid grid">
                    <form-input-password
                        label="Повтор нового пароля"
                        placeholder="Повторите новый пароль"
                        v-model="repeatNewPassword"
                        :errorMessage="repeatNewPasswordError"
                        class="col col-offset-6"
                    />
                </div>
            </template>
        </manage-form>
    </div>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'

definePageMeta({
    title: 'Профиль'
})

const { data } = useAuthState()
const { signOut } = useAuth()
const { resetForm, validate, setFieldError } = useForm()

const { value: currentPassword, errorMessage: currentPasswordError } = useField('currentPassword', validatePassword)
const { value: newPassword, errorMessage: newPasswordError } = useField('newPassword', validatePassword)
const { value: repeatNewPassword, errorMessage: repeatNewPasswordError } = useField('repeatPassword', (value?: string) => {
    if (!value?.trim()) return 'Повторите пароль'
    if (value !== newPassword.value) return 'Пароли не совпадают'
    if (value.length > 50) return 'Слишком длинный пароль'
    return true
})

async function submit() {
    const { valid } = await validate()
    if (!valid) {
        throw new Error('Форма имеет ошибки заполнения')
    }

    const { error } = await useFetch('/api/users/change-password', {
        method: 'POST',
        body: {
            currentPassword: currentPassword.value,
            newPassword: newPassword.value
        }
    })
    if (error.value?.statusCode === 403) {
        setFieldError('currentPassword', 'Неверный текущий пароль')
        throw new Error('Неверный текущий пароль')
    }
    if (error.value) {
        throw new Error(error.value.message)
    }

    resetForm()
    return 'Пароль успешно изменён'
}

const { data: organization, error: errorOrganization } = useFetch('/api/organizations/info', {
    query: { organizationId: computed(() => data.value?.organizationId) },
    headers: useRequestHeaders() as HeadersInit
})
</script>
