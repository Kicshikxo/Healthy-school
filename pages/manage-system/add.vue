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
        label: 'Добавить муниципалитет',
        icon: 'pi pi-map',
        to: '/manage-system/add/municipality'
    },
    {
        label: 'Добавить школу',
        icon: 'pi pi-building',
        to: '/manage-system/add/organization'
    },
    {
        label: 'Добавить пользователя',
        icon: 'pi pi-user-plus',
        to: '/manage-system/add/user'
    }
])
</script>
