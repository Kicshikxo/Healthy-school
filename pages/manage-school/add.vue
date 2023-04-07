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
    title: 'Добавление данных'
})

const tabs = ref([
    {
        label: 'Добавить пользователя',
        icon: 'pi pi-user-plus',
        to: '/manage-school/add/user'
    },
    {
        label: 'Добавить класс',
        icon: 'pi pi-book',
        to: '/manage-school/add/class'
    },
    {
        label: 'Добавить учащегося',
        icon: 'pi pi-user',
        to: '/manage-school/add/student'
    }
])
</script>
