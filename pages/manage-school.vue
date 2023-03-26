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
    title: 'Управление школой'
})

const tabs = ref([
    {
        label: 'Обзор',
        to: '/manage-school/overview'
    },
    {
        label: 'Добавление данных',
        to: '/manage-school/add-data'
    },
    {
        label: 'Редактирование данных',
        to: '/manage-school/edit-data'
    },
    {
        label: 'Удаление данных',
        to: '/manage-school/remove-data'
    }
])
</script>

<!-- <template>
    <p-tab-view v-model="activeTabIndex" class="p-tabview-pt-0">
        <p-tab-panel header="Обзор">
            <p-tab-view v-model="activeOverviewTabIndex">
                <p-tab-panel header="Список пользователей">
                    <manage-school-overview-users />
                </p-tab-panel>
                <p-tab-panel header="Список классов">
                    <manage-school-overview-classes />
                </p-tab-panel>
                <p-tab-panel header="Список учащихйся">
                    <manage-school-overview-students />
                </p-tab-panel>
            </p-tab-view>
        </p-tab-panel>
        <p-tab-panel header="Добавление данных">
            <p-tab-view v-model="activeAddTabIndex">
                <p-tab-panel header="Добавить пользователя">
                    <manage-school-add-user />
                </p-tab-panel>
                <p-tab-panel header="Добавить класс">
                    <manage-school-add-class />
                </p-tab-panel>
                <p-tab-panel header="Добавить учащегося">
                    <manage-school-add-student />
                </p-tab-panel>
            </p-tab-view>
        </p-tab-panel>
        <p-tab-panel header="Редактирование данных">
            <p-tab-view v-model="activeEditTabIndex">
                <p-tab-panel header="Редактировать пользователя"> Редактировать пользователя </p-tab-panel>
            </p-tab-view>
        </p-tab-panel>
        <p-tab-panel header="Удаление данных">
            <p-tab-view v-model="activeRemoveTabIndex">
                <p-tab-panel header="Удалить пользователя"> Удалить пользователя</p-tab-panel>
            </p-tab-view>
        </p-tab-panel>
    </p-tab-view>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Управление школой'
})

const activeTabIndex = ref<number>()
const activeAddTabIndex = ref<number>()
const activeEditTabIndex = ref<number>()
const activeRemoveTabIndex = ref<number>()
const activeOverviewTabIndex = ref<number>()
</script> -->
