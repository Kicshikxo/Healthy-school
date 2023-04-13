<template>
    <p-data-table
        :value="students"
        :rowHover="!!students?.length"
        :scrollable="true"
        scrollHeight="flex"
        dataKey="id"
        responsiveLayout="scroll"
        :row-class="() => 'cursor-pointer'"
        @row-click="$router.push(`/${shortUUID(selectedClass?.id!)}/${shortUUID($event.data.id)}`)"
        class="p-datatable-lg"
    >
        <template #header>
            <div class="flex">
                <form-select-class
                    placeholder="Выберите класс"
                    v-model="selectedClass"
                    hideErrorMessage
                    :organizationId="data?.organizationId"
                    class="mb-0"
                />
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
</template>

<script setup lang="ts">
import { Class } from '@prisma/client'

const { data } = useAuthState()

const selectedClass = ref<Class>()

const {
    data: students,
    pending: loadingStudents,
    refresh: refreshStudents
} = useFetch('/api/students/list', {
    query: { classId: computed(() => selectedClass.value?.id) },
    immediate: !!selectedClass.value?.id
})
</script>
