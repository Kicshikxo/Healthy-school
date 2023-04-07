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
    title: 'Редактирование данных'
})

const tabs = ref([
    {
        label: 'Редактировать пользователя',
        icon: 'pi pi-user-edit',
        to: '/manage-school/edit/user'
    },
    {
        label: 'Изменить пароль пользователя',
        icon: 'pi pi-lock',
        to: '/manage-school/edit/user-password'
    },
    {
        label: 'Редактировать класс',
        icon: 'pi pi-book',
        to: '/manage-school/edit/class'
    },
    {
        label: 'Редактировать учащегося',
        icon: 'pi pi-user',
        to: '/manage-school/edit/student'
    }
])
</script>
