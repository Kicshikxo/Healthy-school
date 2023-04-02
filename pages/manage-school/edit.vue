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
    title: 'Редактирование данных'
})

const tabs = ref([
    {
        label: 'Редактировать пользователя',
        to: '/manage-school/edit/user'
    },
    {
        label: 'Изменить пароль пользователя',
        to: '/manage-school/edit/user-password'
    },
    {
        label: 'Редактировать класс',
        to: '/manage-school/edit/class'
    },
    {
        label: 'Редактировать учащегося',
        to: '/manage-school/edit/student'
    }
])
</script>
