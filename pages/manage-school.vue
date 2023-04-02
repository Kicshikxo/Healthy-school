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
        to: '/manage-school/overview'
    },
    {
        label: 'Добавление данных',
        to: '/manage-school/add'
    },
    {
        label: 'Редактирование данных',
        to: '/manage-school/edit'
    },
    {
        label: 'Удаление данных',
        to: '/manage-school/remove'
    }
])
</script>
