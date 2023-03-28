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
    title: 'Удаление данных'
})

const tabs = ref([
    {
        label: 'Удалить пользователя',
        to: '/manage-school/remove/user'
    },
    {
        label: 'Удалить класс',
        to: '/manage-school/remove/class'
    },
    {
        label: 'Удалить учащегося',
        to: '/manage-school/remove/student'
    }
])
</script>
