<template>
    <div>
        <p-tab-menu :model="tabs" />
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
        to: '/manage-school/add/user'
    },
    {
        label: 'Добавить класс',
        to: '/manage-school/add/class'
    },
    {
        label: 'Добавить учащегося',
        to: '/manage-school/add/student'
    }
])
</script>
