<template>
    <header class="app-header flex justify-content-between w-full h-4rem py-3 px-5 border-bottom-1 border-primary-600 shadow-1">
        <nav class="flex align-items-center">
            <nuxt-img src="images/logo.png" alt="logo" width="48" height="48" class="mr-5" />
            <nuxt-link
                to="/"
                class="flex p-3 text-primary-100 hover:text-primary-50 hover:bg-primary-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer no-underline"
            >
                <i class="pi pi-users w-1rem mr-2"></i>
                <span>Классы</span>
            </nuxt-link>
            <role-access role="OPERATOR">
                <nuxt-link
                    to="/statistics"
                    class="flex p-3 text-primary-100 hover:text-primary-50 hover:bg-primary-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer no-underline"
                >
                    <i class="pi pi-chart-line w-1rem mr-2"></i>
                    <span>Статистика</span>
                </nuxt-link>
            </role-access>
            <role-access role="SCHOOL_OPERATOR">
                <nuxt-link
                    to="/manage"
                    class="flex p-3 text-primary-100 hover:text-primary-50 hover:bg-primary-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer no-underline"
                >
                    <i class="pi pi-pencil w-1rem mr-2"></i>
                    <span>Управление школой</span>
                </nuxt-link>
            </role-access>
        </nav>
        <nav class="flex align-items-center">
            <div
                class="flex px-3 py-2 align-items-center hover:bg-primary-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer no-underline"
                @click="menu.toggle($event)"
            >
                <div class="block">
                    <div class="text-primary-50 font-medium">
                        {{ data?.secondName }}
                        {{ data?.firstName }}
                        {{ data?.middleName }}
                    </div>
                    <span class="text-primary-100 font-medium text-sm">
                        {{ localizeRole(data?.role!) }}
                    </span>
                </div>
            </div>
            <p-menu ref="menu" :model="menuItems" :popup="true" appendTo=".app-header" />
        </nav>
    </header>
</template>

<script setup lang="ts">
import { Role } from '@prisma/client'
import { MenuItem } from 'primevue/menuitem'

const router = useRouter()
const { signOut } = useAuth()
const { data } = useAuthState()

const menu = ref()
const menuItems = ref<MenuItem[]>([
    {
        items: [
            {
                label: 'Профиль',
                icon: 'pi pi-user',
                disabled: () => router.currentRoute.value.path === '/profile',
                to: '/profile'
            },
            {
                separator: true
            },
            {
                label: 'Выйти',
                icon: 'pi pi-sign-out',
                class: 'p-menuitem-red',
                command: () => signOut({ redirectTo: '/login' })
            }
        ]
    }
])
</script>

<style>
.app-header .p-submenu-header {
    display: none;
}

.p-menuitem.p-menuitem-red .p-menuitem-text,
.p-menuitem.p-menuitem-red .p-menuitem-icon {
    color: var(--red-500) !important;
}
</style>
