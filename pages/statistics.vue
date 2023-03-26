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
