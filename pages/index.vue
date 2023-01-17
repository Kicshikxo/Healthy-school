<template>
    <div class="absolute w-full h-full">
        <p-data-table
            :value="classes"
            :rowHover="!!classes?.length"
            :scrollable="true"
            scrollHeight="flex"
            dataKey="id"
            responsiveLayout="scroll"
            row-style="cursor: pointer"
            @row-click="$router.push(`/${translator.fromUUID($event.data.id)}`)"
            class="p-datatable-lg"
        >
            <template #header>
                <div class="flex justify-content-between align-items-center">
                    Список классов
                    <div class="flex gap-2">
                        <p-button
                            label="Обновить"
                            icon="pi pi-refresh w-1rem"
                            :loading="loadingClasses"
                            @click="refreshClasses"
                        />
                    </div>
                </div>
            </template>
            <template #empty>
                <div class="flex justify-content-center w-full">
                    <p-progress-bar v-if="loadingClasses" mode="indeterminate" class="w-full h-1rem" />
                    <div v-else>Классов нет...</div>
                </div>
            </template>
            <p-column field="number" header="Номер" />
            <p-column field="liter" header="Литер" />
            <p-column field="_count.students" header="Список учащихся" />
        </p-data-table>
    </div>
</template>

<script setup lang="ts">
import shortUUID from 'short-uuid'

definePageMeta({
    title: 'Список классов'
})

const translator = shortUUID()

const {
    data: classes,
    refresh: refreshClasses,
    pending: loadingClasses
} = useFetch('/api/classes/list', {
    headers: useRequestHeaders() as HeadersInit
})
</script>
