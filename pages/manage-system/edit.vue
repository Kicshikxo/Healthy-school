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
        label: 'Редактировать муниципалитет',
        icon: 'pi pi-map',
        to: '/manage-system/edit/municipality'
    },
    {
        label: 'Редактировать школу',
        icon: 'pi pi-building',
        to: '/manage-system/edit/organization'
    },
    {
        label: 'Редактировать пользователя',
        icon: 'pi pi-user-edit',
        to: '/manage-system/edit/user'
    }
])
</script>
