<template>
    <header
        class="flex justify-content-between w-full h-4rem py-3 px-5 bg-indigo-500 border-bottom-1 border-indigo-600 shadow-1"
    >
        <div class="flex align-items-center">
            <nuxt-img
                src="images/logo.webp"
                alt="logo"
                width="48"
                height="48"
                class="mr-4"
            />
            <nuxt-link
                class="flex p-3 text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer"
            >
                <i class="pi pi-user w-1rem mr-2"></i>
                <span>Учащиеся</span>
            </nuxt-link>
            <nuxt-link
                class="flex p-3 text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer"
            >
                <i class="pi pi-users w-1rem mr-2"></i>
                <span>Классы</span>
            </nuxt-link>
            <nuxt-link
                class="flex p-3 text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer"
            >
                <i class="pi pi-chart-line w-1rem mr-2"></i>
                <span>Статистика</span>
            </nuxt-link>
        </div>
        <div class="flex align-items-center">
            <nuxt-link
                class="flex p-3 mr-2 align-items-center text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer"
            >
                <i class="pi pi-bell text-xl" />
            </nuxt-link>
            <nuxt-link
                class="flex px-3 py-1 align-items-center hover:bg-indigo-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer"
            >
                <nuxt-img
                    :src="avatarSrc"
                    alt="avatar"
                    width="48"
                    height="48"
                    class="border-circle"
                />
                <div class="block ml-2">
                    <div class="text-indigo-50 font-medium">
                        Иванов Иван Иванович
                    </div>
                    <span class="text-indigo-100 font-medium text-sm">
                        Педагог-психолог
                    </span>
                </div>
            </nuxt-link>
        </div>
    </header>
</template>

<script setup lang="ts">
const avatarSrc = `images/avatars/persona ${~~(Math.random() * 4)}-${~~(
    Math.random() * 3
)}.png`
</script>
