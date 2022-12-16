<template>
    <div class="surface-card p-4 m-4 shadow-3 border-round w-full sm:w-24rem">
        <div
            class="flex flex-column justify-content-center align-items-center mb-3"
        >
            <nuxt-img
                src="images/logo.webp"
                alt="logo"
                height="50"
                class="mb-3"
            />
            <div class="text-900 text-3xl font-bold mb-3">Добро пожаловать</div>
        </div>

        <div class="flex flex-column justify-content-center align-items-center">
            <!-- <label class="block text-900 font-medium mb-2">Введите логин</label> -->
            <p-input-text type="text" placeholder="Логин" class="w-full mb-3" />

            <!-- <label class="block text-900 font-medium mb-2">Введите пароль</label> -->
            <p-input-text
                type="password"
                placeholder="Пароль"
                class="w-full mb-3"
            />

            <p-button label="Войти" icon="pi pi-user" class="w-5"></p-button>
        </div>
    </div>
</template>
