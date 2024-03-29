<template>
    <div class="absolute w-full h-full">
        <p-data-table
            :value="students"
            :rowHover="!!students?.length"
            :scrollable="true"
            scrollHeight="flex"
            dataKey="id"
            responsiveLayout="scroll"
            :row-class="() => 'cursor-pointer'"
            @row-click="$router.push(`/${$route.params.classId}/${shortUUID($event.data.id)}`)"
            class="p-datatable-lg"
        >
            <template #header>
                <div class="flex justify-content-between align-items-center">
                    Список учащихся
                    <div class="flex gap-2">
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
                <div class="flex justify-content-center w-full h-1rem">
                    <p-progress-bar v-if="loadingStudents" mode="indeterminate" class="w-full h-1rem" />
                    <div v-else>Учащихся нет...</div>
                </div>
            </template>
            <p-column field="secondName" header="Фамилия" />
            <p-column field="firstName" header="Имя" />
            <p-column field="middleName" header="Отчество" />
            <p-column field="gender" header="Пол">
                <template #body="{ data }">
                    {{ localizeGender(data.gender) }}
                </template>
            </p-column>
            <p-column field="birthdate" header="Дата рождения">
                <template #body="{ data }">
                    {{ new Date(data.birthdate).toLocaleDateString() }}
                </template>
            </p-column>
        </p-data-table>
    </div>
</template>

<script setup lang="ts">
import { useClassStore } from '~~/store/class'

definePageMeta({
    title: 'Список учащихся',
    breadcrumb: 'class'
})

const route = useRoute()
const currentClass = useClassStore()
currentClass.setId(parseUUID(route.params.classId as string))

const {
    data: students,
    refresh: refreshStudents,
    pending: loadingStudents
} = useFetch('/api/students/list', {
    query: { classId: currentClass.id }
})
</script>
