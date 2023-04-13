<template>
    <p-data-table
        :value="users"
        :scrollable="true"
        scrollHeight="flex"
        dataKey="id"
        responsiveLayout="scroll"
        class="p-datatable-lg h-fit"
    >
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
const { data } = useAuthState()

const {
    data: users,
    pending: loadingUsers,
    refresh: refreshUsers
} = useFetch('/api/users/list', {
    query: { organizationId: data.value?.organizationId }
})
</script>
