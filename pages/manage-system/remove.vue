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
    title: 'Удаление данных'
})

const tabs = ref([
    {
        label: 'Удалить муниципалитет',
        icon: 'pi pi-user-minus',
        to: '/manage-system/remove/municipality'
    },
    {
        label: 'Удалить школу',
        icon: 'pi pi-building',
        to: '/manage-system/remove/organization'
    },
    {
        label: 'Удалить пользователя',
        icon: 'pi pi-user-minus',
        to: '/manage-system/remove/user'
    }
])
</script>
