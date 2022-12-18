<template>
    <div class="absolute w-full h-full">
        <data-table
            :value="(children as any[])"
            :rowHover="true"
            :loading="false"
            :scrollable="true"
            scrollHeight="flex"
            dataKey="id"
            tableClass="w-full"
            tableStyle="border-collapse: collapse"
            responsiveLayout="scroll"
            @row-click="$router.push(`${$route.path}/${$event.data.id}`)"
        >
            <template #header>
                <div class="flex justify-content-between align-items-center">
                    Список учащихся
                    <div class="flex gap-2">
                        <p-button
                            label="Добавить"
                            icon="pi pi-plus"
                            class="p-button-success"
                            @click="showDialog = true"
                        />
                        <p-button
                            label="Обновить"
                            icon="pi pi-refresh"
                            :loading="loadingChildren"
                            @click="refreshChildren"
                        />
                    </div>
                </div>
            </template>
            <p-column field="secondName" header="Фамилия"></p-column>
            <p-column field="firstName" header="Имя"></p-column>
            <p-column field="middleName" header="Отчество"></p-column>
            <p-column field="age" header="Возраст"></p-column>
        </data-table>

        <p-dialog
            header="Добавить ученика"
            v-model:visible="showDialog"
            :modal="true"
        >
            Content
        </p-dialog>
    </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'

definePageMeta({
    name: 'Учащиеся'
})

const {
    data: children,
    refresh: refreshChildren,
    pending: loadingChildren
} = useFetch('/api/children')

let showDialog = ref(false)
</script>
