<template>
    <div class="min-h-screen flex flex-column">
        <div class="h-16rem bg-indigo-500">
            <header
                class="flex justify-content-between w-full h-4rem py-3 px-5 static"
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
                        class="flex px-3 py-2 text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round cursor-pointer transition-colors transition-duration-150"
                    >
                        <i class="pi pi-home w-1rem mr-2"></i>
                        <span>Home</span>
                    </nuxt-link>
                    <nuxt-link
                        class="flex align-items-center px-3 py-2 text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round cursor-pointer transition-colors transition-duration-150"
                    >
                        <i class="pi pi-calendar w-1rem mr-2"></i>
                        <span>Calendar</span>
                    </nuxt-link>
                    <nuxt-link
                        class="flex align-items-center px-3 py-2 text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round cursor-pointer transition-colors transition-duration-150"
                    >
                        <i class="pi pi-chart-line w-1rem mr-2"></i>
                        <span>Stats</span>
                    </nuxt-link>
                </div>
                <div class="flex align-items-center">
                    <nuxt-link
                        class="flex p-2 mr-2 align-items-center text-indigo-100 hover:text-indigo-50 hover:bg-indigo-600 font-medium border-round cursor-pointer transition-colors transition-duration-150"
                    >
                        <i class="pi pi-bell w-1rem text-xl" />
                    </nuxt-link>
                    <nuxt-link
                        class="flex px-3 py-1 align-items-center hover:bg-indigo-600 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
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
                                Психолог
                            </span>
                        </div>
                    </nuxt-link>
                </div>
            </header>
            <nav
                class="flex align-items-center gap-3 h-4rem py-3 px-5 font-medium overflow-x-auto overflow-y-hidden border-top-1 border-indigo-600"
            >
                <nuxt-link class="cursor-pointer text-indigo-200">
                    <i class="pi pi-home w-1rem"></i>
                </nuxt-link>
                <i class="pi pi-angle-right w-1rem text-indigo-200"></i>

                <nuxt-link
                    class="cursor-pointer text-indigo-200 white-space-nowrap"
                >
                    Level 3
                </nuxt-link>
                <i class="pi pi-angle-right w-1rem text-indigo-200"></i>

                <nuxt-link
                    class="cursor-pointer text-indigo-200 white-space-nowrap"
                >
                    Level 2
                </nuxt-link>
                <i class="pi pi-angle-right w-1rem text-indigo-200"></i>

                <nuxt-link
                    class="cursor-pointer text-indigo-100 white-space-nowrap"
                >
                    Level 1
                </nuxt-link>
            </nav>
        </div>
        <main
            class="flex flex-column flex-auto px-5 pb-5"
            style="margin-top: -8rem"
        >
            <div
                class="flex-auto p-2 border-2 surface-border border-round surface-section"
            >
                <pre>{{ JSON.stringify(data, null, 2) }}</pre>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
const { data } = useFetch('/api')
</script>
