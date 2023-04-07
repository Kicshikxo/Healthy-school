<template>
    <div>
        <p-tab-menu :model="tabs" :exact="false" />
        <nuxt-layout :name="false">
            <nuxt-page />
        </nuxt-layout>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Обзор'
})

const tabs = ref([
    {
        label: 'Список муниципалитетов',
        icon: 'pi pi-map',
        to: '/manage-system/overview/municipalities'
    },
    {
        label: 'Список школ',
        icon: 'pi pi-building',
        to: '/manage-system/overview/organizations'
    },
    {
        label: 'Список пользователей',
        icon: 'pi pi-users',
        to: '/manage-system/overview/users'
    }
])
</script>
