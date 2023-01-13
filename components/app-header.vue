<template>
    <header class="flex justify-content-between w-full h-4rem py-3 px-5 border-bottom-1 border-primary-600 shadow-1">
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
        </nav>
        <nav class="flex align-items-center">
            <nuxt-link
                class="flex p-3 mr-2 align-items-center text-primary-100 hover:text-primary-50 hover:bg-primary-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer no-underline"
            >
                <i class="pi pi-bell text-xl" />
            </nuxt-link>
            <nuxt-link
                to="/profile"
                class="flex px-3 py-1 align-items-center hover:bg-primary-600 font-medium border-round transition-colors transition-duration-150 cursor-pointer no-underline"
            >
                <nuxt-img :src="avatarSrc" alt="avatar" width="48" height="48" class="border-circle" />
                <div class="block ml-2">
                    <div class="text-primary-50 font-medium">
                        {{ data?.secondName }}
                        {{ data?.firstName }}
                        {{ data?.middleName }}
                    </div>
                    <span class="text-primary-100 font-medium text-sm">
                        {{ roleLocalization[data?.role!] }}
                    </span>
                </div>
            </nuxt-link>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { Role } from '@prisma/client'

const { data } = useSessionState()

const roleLocalization: { [key in Role]: string } = {
    OPERATOR: 'Оператор',
    CLASS_TEACHER: 'Классный руководитель',
    HEALTH_WORKER: 'Медицинский работник',
    PEDAGOGUE: 'Педагог',
    SOCIAL_PEDAGOGUE: 'Социальный педагог',
    PSYCHOLOGIST: 'Психолог',
    PHYSICAL_EDUCATION_TEACHER: 'Учитель физической культуры'
}

const { data: organization } = useFetch('/api/organization/info', { query: { organizationId: data.value?.organizationId } })

const avatarSrc = `images/avatars/persona ${~~(Math.random() * 4)}-${~~(Math.random() * 3)}.png`
</script>
