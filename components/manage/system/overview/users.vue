<template>
    <p-data-table
        :value="users"
        :scrollable="true"
        scrollHeight="flex"
        dataKey="id"
        responsiveLayout="scroll"
        class="p-datatable-lg h-fit"
    >
        <template #header>
            <div class="flex gap-2">
                <form-select-municipality
                    placeholder="Выберите муниципалитет"
                    v-model="selectedMunicipality"
                    hideErrorMessage
                    class="mb-0 max-w-20rem white-space-nowrap"
                />
                <form-select-organization
                    placeholder="Выберите школу"
                    v-model="selectedOrganization"
                    hideErrorMessage
                    :municipalityId="selectedMunicipality?.id"
                    class="mb-0 max-w-30rem white-space-nowrap"
                />
            </div>
        </template>
        <template #empty>
            <div class="flex justify-content-center w-full h-1rem">
                <p-progress-bar v-if="loadingUsers" mode="indeterminate" class="w-full h-1rem" />
                <div v-else>Пользователей нет...</div>
            </div>
        </template>
        <p-column field="username" header="Имя пользователя" />
        <p-column field="secondName" header="Фамилия" />
        <p-column field="firstName" header="Имя" />
        <p-column field="middleName" header="Отчество" />
        <p-column field="role" header="Роль">
            <template #body="{ data }">
                {{ localizeRole(data.role) }}
            </template>
        </p-column>
    </p-data-table>
</template>

<script setup lang="ts">
import { EducationalOrganization, Municipality } from '@prisma/client'

const selectedMunicipality = ref<Municipality>()
const selectedOrganization = ref<EducationalOrganization>()

const {
    data: users,
    pending: loadingUsers,
    refresh: refreshUsers
} = useFetch('/api/users/list', {
    query: { organizationId: computed(() => selectedOrganization.value?.id) },
    immediate: !!selectedOrganization.value
})
</script>
