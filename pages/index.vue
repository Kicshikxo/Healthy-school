<template>
    <div class="min-h-screen max-h-screen flex flex-column">
        <div class="h-16rem bg-indigo-500">
            <header
                class="flex justify-content-between w-full h-4rem py-3 px-5 bg-indigo-500 border-bottom-1 border-indigo-600 shadow-1"
            >
                <div class="flex align-items-center">
                    <nuxt-img
                        src="images/logo.webp"
                        alt="logo"
                        width="40"
                        height="40"
                        class="mr-4"
                    />
                    <nuxt-link
                        class="flex px-3 py-2 text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer"
                    >
                        <i class="pi pi-user w-1rem mr-2"></i>
                        <span>Учащиеся</span>
                    </nuxt-link>
                    <nuxt-link
                        class="flex align-items-center px-3 py-2 text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer"
                    >
                        <i class="pi pi-users w-1rem mr-2"></i>
                        <span>Классы</span>
                    </nuxt-link>
                    <nuxt-link
                        class="flex align-items-center px-3 py-2 text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer"
                    >
                        <i class="pi pi-chart-line w-1rem mr-2"></i>
                        <span>Статистика</span>
                    </nuxt-link>
                </div>
                <div class="flex align-items-center">
                    <nuxt-link
                        class="flex p-2 mr-2 align-items-center text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer"
                    >
                        <i class="pi pi-bell text-xl" />
                    </nuxt-link>
                    <nuxt-link
                        class="flex px-3 py-1 align-items-center hover:bg-indigo-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer"
                    >
                        <nuxt-img
                            src="images/avatars/persona 0-0.png"
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
            <nav
                class="flex align-items-center gap-3 h-4rem py-3 px-5 font-medium overflow-x-auto overflow-y-hidden"
            >
                <nuxt-link
                    class="text-indigo-200 hover:text-indigo-100 cursor-pointer"
                >
                    <i class="pi pi-home w-1rem text-xl"></i>
                </nuxt-link>
                <i class="pi pi-angle-right w-1rem text-indigo-200"></i>

                <nuxt-link
                    class="text-indigo-200 hover:text-indigo-100 white-space-nowrap cursor-pointer"
                >
                    Учащиеся
                </nuxt-link>
                <i class="pi pi-angle-right w-1rem text-indigo-200"></i>

                <nuxt-link
                    class="text-indigo-200 hover:text-indigo-100 white-space-nowrap cursor-pointer"
                >
                    Иванов Иван Иванович
                </nuxt-link>
                <i class="pi pi-angle-right w-1rem text-indigo-200"></i>

                <nuxt-link
                    class="text-indigo-50 white-space-nowrap cursor-pointer"
                >
                    Сведения
                </nuxt-link>
            </nav>
        </div>

        <main class="flex flex-auto px-5 mb-5" style="margin-top: -8rem">
            <div
                class="flex-auto relative p-2 border-2 surface-border border-round surface-section shadow-2 overflow-x-hidden overflow-y-auto"
            >
                <div class="absolute">
                    <pre style="height: 100vh">{{
                        JSON.stringify(data, null, 2)
                    }}</pre>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
const { data } = useFetch('/api')
</script>
