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
    title: 'Статистика'
})

const tabs = ref([
    {
        label: 'По региону',
        to: '/statistics/municipality'
    },
    {
        label: 'По школе',
        to: '/statistics/organization'
    },
    {
        label: 'По классу',
        to: '/statistics/class'
    }
])
</script>
