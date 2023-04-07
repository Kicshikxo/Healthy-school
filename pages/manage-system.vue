<template>
    <div>
        <role-access role="OPERATOR">
            <p-tab-menu :model="tabs" :exact="false" />
            <nuxt-layout :name="false">
                <nuxt-page />
            </nuxt-layout>
        </role-access>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Управление системой'
})

const tabs = ref([
    {
        label: 'Обзор',
        icon: 'pi pi-search',
        to: '/manage-system/overview'
    },
    {
        label: 'Добавление данных',
        icon: 'pi pi-plus',
        to: '/manage-system/add'
    },
    {
        label: 'Редактирование данных',
        icon: 'pi pi-pencil',
        to: '/manage-system/edit'
    },
    {
        label: 'Удаление данных',
        icon: 'pi pi-trash',
        to: '/manage-system/remove'
    }
])
</script>
