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
            <p-input-text type="text" placeholder="Логин" class="w-full mb-3" />

            <p-input-text
                type="password"
                placeholder="Пароль"
                class="w-full mb-3"
            />

            <p-button
                label="Войти"
                icon="pi pi-user w-1rem"
                class="w-5"
                @click="login"
            ></p-button>
        </div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()

function login() {
    router.push('/')
}
</script>
