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
        label: 'Список пользователей',
        icon: 'pi pi-user',
        to: '/manage-school/overview/users'
    },
    {
        label: 'Список классов',
        icon: 'pi pi-book',
        to: '/manage-school/overview/classes'
    },
    {
        label: 'Список учащихся',
        icon: 'pi pi-users',
        to: '/manage-school/overview/students'
    }
])
</script>
