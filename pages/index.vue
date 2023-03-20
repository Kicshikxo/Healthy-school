<template>
    <div class="absolute w-full h-full">
        <p-data-table
            :value="classes"
            :rowHover="!!classes?.length"
            :scrollable="true"
            scrollHeight="flex"
            dataKey="id"
            responsiveLayout="scroll"
            :row-class="() => 'cursor-pointer'"
            @row-click="$router.push(`/${shortUUID($event.data.id)}`)"
            class="p-datatable-lg"
        >
            <template #header>
                <div class="flex justify-content-between align-items-center">
                    Список классов
                    <div class="flex gap-2">
                        <p-dropdown
                            v-if="!data?.organizationId"
                            :loading="loadingOrganizations"
                            :options="organizations"
                            v-model="selectedOrganization"
                            optionLabel="name"
                            placeholder="Выберите образовательную организацию"
                            id="select-organization"
                        />
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
            <p-column field="_count.students" header="Количество учащихся" />
        </p-data-table>
    </div>
</template>

<script setup lang="ts">
import { EducationalOrganization } from '@prisma/client'

definePageMeta({
    title: 'Список классов'
})

const { data } = useAuthState()

const selectedOrganization = ref<EducationalOrganization>()
const selectedOrganizationId = computed(
    () => selectedOrganization.value?.id ?? data.value?.organizationId ?? '00000000-0000-0000-0000-000000000000'
)

const { data: organizations, pending: loadingOrganizations } = useFetch('/api/organizations/list')
watchEffect(
    () =>
        (selectedOrganization.value = organizations.value?.find(
            (organization) => organization.id === data.value?.organizationId
        ))
)

const {
    data: classes,
    refresh: refreshClasses,
    pending: loadingClasses
} = useFetch('/api/classes/list', {
    query: {
        organizationId: selectedOrganizationId
    },
    headers: useRequestHeaders() as HeadersInit
})
</script>
