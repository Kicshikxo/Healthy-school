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
                        <role-access role="CLASS_TEACHER">
                            <p-button
                                label="Добавить"
                                icon="pi pi-plus w-1rem"
                                class="p-button-success"
                                @click="showDialog = true"
                            />
                        </role-access>
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
                    <p-progress-bar v-if="loadingStudents" mode="indeterminate" class="w-full h-1rem" />
                    <div v-else>Учащихся нет...</div>
                </div>
            </template>
            <p-column field="secondName" header="Фамилия"></p-column>
            <p-column field="firstName" header="Имя"></p-column>
            <p-column field="middleName" header="Отчество"></p-column>
            <p-column field="gender" header="Пол">
                <template #body="{ data }">
                    {{ localizeGender(data.gender as Gender) }}
                </template>
            </p-column>
            <p-column field="birthdate" header="Дата рождения">
                <template #body="{ data }">
                    {{ new Date(data.birthdate).toLocaleDateString() }}
                </template>
            </p-column>
        </p-data-table>

        <dialog-add-student v-model:visible="showDialog" @added="refreshStudents" />
    </div>
</template>

<script setup lang="ts">
import { Gender } from '@prisma/client'
import { useClassStore } from '~~/store/class'

definePageMeta({
    title: 'Список учащихся',
    breadcrumb: 'class'
})

const route = useRoute()
const currentClass = useClassStore()
currentClass.setId(parseUUID(route.params.classId as string))

const showDialog = ref(false)

const {
    data: students,
    refresh: refreshStudents,
    pending: loadingStudents
} = useFetch('/api/students/list', {
    headers: useRequestHeaders() as HeadersInit,
    query: {
        classId: currentClass.id
    }
})
</script>
