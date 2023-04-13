<template>
    <div class="absolute w-full h-full">
        <p-data-table
            :value="logs"
            :rowHover="!!logs?.length"
            :scrollable="true"
            scrollHeight="flex"
            dataKey="id"
            responsiveLayout="scroll"
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
            <p-column field="actionType" header="Тип действия" />
            <p-column v-if="data?.role === Role.OPERATOR" field="createdBy.organization.organization.name" header="Школа" />
            <p-column field="createdBy" header="Инициатор">
                <template #body="{ data }">
                    {{ data.createdBy.secondName }} {{ data.createdBy.firstName }} {{ data.createdBy.middleName }}
                </template>
            </p-column>
            <p-column field="details" header="Детали">
                <template #body="{ data }">
                    <p-accordion style="width: 32rem">
                        <p-accordion-tab header="Детали">
                            <pre style="white-space: pre-wrap; word-break: break-all">{{
                                JSON.stringify(data.details, null, 2)
                            }}</pre>
                        </p-accordion-tab>
                    </p-accordion>
                </template>
            </p-column>
            <p-column field="createdAt" header="Дата создания">
                <template #body="{ data }">
                    {{ new Date(data.createdAt).toLocaleString() }}
                </template>
            </p-column>
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
