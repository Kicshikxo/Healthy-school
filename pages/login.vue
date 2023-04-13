<template>
    <div class="flex justify-content-center align-items-center h-screen w-screen surface-ground">
        <div class="surface-card p-4 m-4 border-1 surface-border border-round shadow-2 w-full sm:w-24rem">
            <div class="flex flex-column justify-content-center align-items-center mb-3">
                <nuxt-img src="images/logo.png" alt="logo" width="64" height="64" class="mb-3" />
                <div class="text-900 text-4xl font-bold pb-1">Добро пожаловать</div>
            </div>

            <div class="p-fluid flex flex-column">
                <form-input-text
                    ref="usernameInput"
                    placeholder="Введите логин"
                    v-model="username"
                    :errorMessage="usernameError"
                    @keyup.down="focusPassword"
                    @keyup.enter="focusPassword"
                />

                <form-input-password
                    ref="passwordInput"
                    placeholder="Введите пароль"
                    v-model="password"
                    :errorMessage="passwordError"
                    @keyup.up="focusUsername"
                    @keyup.enter="tryLogin"
                />

                <div class="flex justify-content-center">
                    <p-button label="Войти" icon="pi pi-user " class="w-10rem" :loading="loading" @click="tryLogin" />
                </div>
            </div>
        </div>

        <p-toast />
    </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useField, useForm } from 'vee-validate'

const { validate } = useForm()

definePageMeta({
    title: 'Логин',
    layout: false,
    middleware: 'unauth'
})

const route = useRoute()
const toast = useToast()
const { signIn } = useAuth()

const usernameInput = ref()
const passwordInput = ref()

const loading = ref(false)

const { value: username, errorMessage: usernameError } = useField('username', (value?: string) => {
    if (!value?.trim()) return 'Введите имя пользователя'
    if (!/^[a-zA-Z0-9]+$/.test(value)) return 'Неверный формат имени пользователя'
    if (value.length > 50) return 'Слишком длинное имя пользователя'
    return true
})
const { value: password, errorMessage: passwordError } = useField('password', (value?: string) => {
    if (!value?.trim()) return 'Введите пароль'
    if (!/^[0-9a-zA-Z!@#$%^&*]+$/.test(value)) return 'Неверный формат пароля'
    if (value.length > 50) return 'Слишком длинный пароль'
    return true
})

function focusUsername() {
    usernameInput?.value.$el.querySelector('input').focus()
}

function focusPassword() {
    passwordInput?.value.$el.querySelector('input').focus()
}

async function tryLogin() {
    loading.value = true

    const { valid } = await validate()
    if (!valid) {
        toast.add({
            severity: 'error',
            summary: 'Ошибка авторизации',
            detail: 'Форма имеет ошибки заполнения',
            life: 3000
        })
        loading.value = false
        return
    }

    const { error, data } = await signIn({
        username: username.value,
        password: password.value,
        redirectTo: (route.query.redirectTo as string) ?? '/'
    })

    if (error || !data) {
        toast.add({
            severity: 'error',
            summary: 'Ошибка авторизации',
            detail: 'Неверный логин или пароль',
            life: 3000
        })
    }

    loading.value = false
}

onMounted(focusUsername)
</script>
