<template>
    <div class="surface-card p-4 m-4 shadow-3 border-round w-full sm:w-24rem">
        <div
            class="flex flex-column justify-content-center align-items-center mb-3"
        >
            <nuxt-img
                src="images/logo.png"
                alt="logo"
                width="64"
                height="64"
                class="mb-3"
            />
            <div class="text-900 text-3xl font-bold mb-3">Добро пожаловать</div>
        </div>

        <div class="flex flex-column justify-content-center align-items-center">
            <p-input-text
                v-model="login"
                type="text"
                placeholder="Логин"
                class="w-full mb-3"
            />

            <p-input-text
                v-model="password"
                type="password"
                placeholder="Пароль"
                class="w-full mb-3"
            />

            <p-button
                label="Войти"
                icon="pi pi-user w-1rem"
                class="w-5"
                @click="tryLogin"
            ></p-button>
        </div>

        <p-toast error-icon="" />
    </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

const { signIn } = useSession()
const router = useRouter()
const toast = useToast()

const login = ref<string>()
const password = ref<string>()

async function tryLogin() {
    const { error, url } = await signIn('credentials', {
        login: login.value,
        password: password.value,
        redirect: false
    })

    if (error) {
        toast.add({
            severity: 'error',
            summary: 'Ошибка авторизации',
            detail: 'Неверный логин или пароль',
            life: 3000
        })
    } else if (url) {
        console.log(url)
        router.push('/')
        // navigateTo(url, { external: true })
    }
}
</script>
