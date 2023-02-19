<template>
    <div class="flex justify-content-center align-items-center h-screen w-screen surface-ground">
        <div class="surface-card p-4 m-4 border-1 surface-border border-round shadow-2 w-full sm:w-24rem">
            <div class="flex flex-column justify-content-center align-items-center mb-3">
                <nuxt-img src="images/logo.png" alt="logo" width="64" height="64" class="mb-3" />
                <div class="text-900 text-3xl font-bold mb-3">Добро пожаловать</div>
            </div>

            <div class="flex flex-column justify-content-center align-items-center">
                <p-input-text
                    ref="usernameInput"
                    v-model="username"
                    type="text"
                    placeholder="Логин"
                    class="w-full mb-3"
                    @keyup.down="focusPassword"
                    @keyup.enter="focusPassword"
                />

                <p-password
                    ref="passwordInput"
                    v-model="password"
                    type="password"
                    placeholder="Пароль"
                    inputClass="w-full"
                    class="w-full mb-3"
                    :toggle-mask="true"
                    :feedback="false"
                    @keyup.up="focusUsername"
                    @keyup.enter="tryLogin"
                />

                <p-button label="Войти" icon="pi pi-user w-1rem" class="w-5" :loading="loading" @click="tryLogin"></p-button>
            </div>
        </div>

        <p-toast />
    </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

definePageMeta({
    title: 'Логин',
    layout: false,
    middleware: 'unauth'
})

const toast = useToast()
const { signIn } = useAuth()

const usernameInput = ref()
const passwordInput = ref()

const username = ref<string>()
const password = ref<string>()
const loading = ref(false)

function focusUsername() {
    usernameInput?.value.$el.focus()
}

function focusPassword() {
    passwordInput?.value.$el.firstChild.focus()
}

async function tryLogin() {
    loading.value = true

    const { error } = await signIn({
        username: username.value,
        password: password.value,
        redirectTo: '/'
    })

    if (error) {
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
