<template>
    <div class="absolute w-full h-full">
        <p-data-table
            :value="(students as any[])"
            :rowHover="true"
            :scrollable="true"
            scrollHeight="flex"
            dataKey="id"
            responsiveLayout="scroll"
            row-style="cursor: pointer"
            @row-click="$router.push(`${$route.path}/${$event.data.id}`)"
        >
            <template #header>
                <div class="flex justify-content-between align-items-center">
                    Список учащихся
                    <div class="flex gap-2">
                        <p-button
                            label="Добавить"
                            icon="pi pi-plus w-1rem"
                            class="p-button-success"
                            @click="showDialog = true"
                        />
                        <p-button
                            label="Обновить"
                            icon="pi pi-refresh w-1rem"
                            :loading="loadingStudents"
                            @click="refreshStudents"
                        />
                    </div>
                </div>
            </template>
            <template #empty>
                <div class="flex justify-content-center w-full">
                    <p-progress-bar
                        v-if="loadingStudents"
                        mode="indeterminate"
                        class="w-full h-1rem"
                    />
                    <div v-else>Данных нет...</div>
                </div>
            </template>
            <p-column field="secondName" header="Фамилия"></p-column>
            <p-column field="firstName" header="Имя"></p-column>
            <p-column field="middleName" header="Отчество"></p-column>
            <p-column field="age" header="Возраст"></p-column>
            <p-column field="class" header="Класс"></p-column>
        </p-data-table>

        <p-dialog
            header="Добавить ученика"
            v-model:visible="showDialog"
            :modal="true"
        >
        </p-dialog>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Учащиеся'
})

let showDialog = ref(false)

const {
    data: students,
    refresh: refreshStudents,
    pending: loadingStudents
} = useFetch('/api/students')
</script>
