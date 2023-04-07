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
        icon: 'pi pi-map',
        to: '/statistics/municipality'
    },
    {
        label: 'По школе',
        icon: 'pi pi-building',
        to: '/statistics/organization'
    },
    {
        label: 'По классу',
        icon: 'pi pi-book',
        to: '/statistics/class'
    }
])
</script>
