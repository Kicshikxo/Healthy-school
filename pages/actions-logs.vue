<template>
    <div class="absolute w-full h-full">
        <p-data-table
            :value="logs"
            v-model:expandedRows="expandedRows"
            :rowHover="false"
            :scrollable="true"
            scrollHeight="flex"
            dataKey="id"
            responsiveLayout="scroll"
            paginator
            paginatorPosition="top"
            :rows="20"
        >
            <template #header>
                <div class="flex justify-content-between align-items-center">
                    Журнал действий
                    <div class="flex gap-2">
                        <form-select-municipality
                            v-if="data?.role === Role.OPERATOR"
                            placeholder="Выберите муниципалитет"
                            v-model="selectedMunicipality"
                            hideErrorMessage
                            class="mb-0 max-w-20rem white-space-nowrap"
                        />
                        <form-select-organization
                            v-if="data?.role === Role.OPERATOR"
                            placeholder="Выберите школу"
                            v-model="selectedOrganization"
                            hideErrorMessage
                            :municipalityId="selectedMunicipality?.id"
                            class="mb-0 max-w-30rem white-space-nowrap"
                        />
                        <p-button
                            v-if="data?.role === Role.OPERATOR"
                            label="Сбросить"
                            icon="pi pi-trash"
                            severity="danger"
                            :disabled="loadingLogs || !selectedOrganization"
                            @click="reset"
                        />
                        <p-button label="Обновить" icon="pi pi-refresh" :loading="loadingLogs" @click="refreshLogs" />
                    </div>
                </div>
            </template>
            <template #empty>
                <div class="flex justify-content-center w-full h-1rem">
                    <p-progress-bar v-if="loadingLogs" mode="indeterminate" class="w-full h-1rem" />
                    <div v-else>Действий нет...</div>
                </div>
            </template>
            <p-column expander class="w-6rem" header="Детали" />
            <p-column field="actionType" header="Тип операции" />
            <p-column field="details.action" header="Тип действия" />
            <p-column v-if="data?.role === Role.OPERATOR" field="createdBy.organization.organization.name" header="Школа" />
            <p-column field="createdBy" header="Инициатор действия">
                <template #body="{ data }">
                    {{ data.createdBy.secondName }} {{ data.createdBy.firstName }} {{ data.createdBy.middleName }}
                </template>
            </p-column>
            <p-column field="createdAt" header="Дата действия">
                <template #body="{ data }">
                    {{ new Date(data.createdAt).toLocaleString() }}
                </template>
            </p-column>
            <template #expansion="{ data: { details } }">
                <div class="relative">
                    <p-data-table v-stretch-parent :value="[details.data]" scrollable class="absolute w-full max-w-full">
                        <template #header>Детали</template>
                        <p-column
                            v-for="key in Object.keys(details.data)"
                            :field="key"
                            :header="key"
                            class="white-space-nowrap"
                        />
                    </p-data-table>
                </div>
            </template>
        </p-data-table>
    </div>
</template>

<script setup lang="ts">
import { EducationalOrganization, Municipality, Role } from '@prisma/client'

definePageMeta({
    title: 'Логи'
})

const { data } = useAuthState()

const selectedMunicipality = ref<Municipality>()
const selectedOrganization = ref<EducationalOrganization>()
const organizationId = ref<string>()
const expandedRows = ref([])

watchEffect(() => (organizationId.value = selectedOrganization.value?.id ?? data.value?.organizationId))

function reset() {
    selectedMunicipality.value = undefined
    selectedOrganization.value = undefined
}

const {
    data: logs,
    pending: loadingLogs,
    refresh: refreshLogs
} = useFetch('/api/actions-logs/list', {
    query: { organizationId: organizationId }
})
</script>

<style>
.p-datatable-row-expansion > td {
    padding: 0 !important;
    border-width: 0px !important;
}
</style>
