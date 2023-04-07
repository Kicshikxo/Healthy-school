<template>
    <div>
        <role-access role="SCHOOL_OPERATOR">
            <p-tab-menu :model="tabs" :exact="false" />
            <nuxt-layout :name="false">
                <nuxt-page />
            </nuxt-layout>
        </role-access>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Управление школой'
})

const tabs = ref([
    {
        label: 'Обзор',
        icon: 'pi pi-search',
        to: '/manage-school/overview'
    },
    {
        label: 'Добавление данных',
        icon: 'pi pi-plus',
        to: '/manage-school/add'
    },
    {
        label: 'Редактирование данных',
        icon: 'pi pi-pencil',
        to: '/manage-school/edit'
    },
    {
        label: 'Удаление данных',
        icon: 'pi pi-trash',
        to: '/manage-school/remove'
    }
])
</script>
