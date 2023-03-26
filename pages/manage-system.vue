<template>
    <div>
        <p-tab-menu :model="items" />
        <nuxt-layout :name="false">
            <nuxt-page />
        </nuxt-layout>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Управление системой'
})

const items = ref([
    {
        label: 'Пользователи',
        icon: 'pi pi-fw pi-user',
        to: '/manage-system/overview1'
    }
])
</script>
