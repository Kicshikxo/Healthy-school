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
                        <form-select-municipality
                            v-if="data?.role === Role.OPERATOR"
                            placeholder="Выберите муниципалитет"
                            v-model="selectedMunicipality"
                            hideErrorMessage
                            class="mb-0 max-w-20rem white-space-nowrap"
                        />
                        <form-select-organization
                            v-if="data?.role === Role.OPERATOR"
                            placeholder="Выберите организацию"
                            v-model="selectedOrganization"
                            hideErrorMessage
                            :municipalityId="selectedMunicipality?.id"
                            class="mb-0 max-w-30rem white-space-nowrap"
                        />
                        <p-button label="Обновить" icon="pi pi-refresh " :loading="loadingClasses" @click="refreshClasses" />
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
import { EducationalOrganization, Municipality, Role } from '@prisma/client'

definePageMeta({
    title: 'Список классов'
})

const { data } = useAuthState()

const selectedMunicipality = ref<Municipality>()
const selectedOrganization = ref<EducationalOrganization>()
const organizationId = ref<string>()

watchEffect(() => (organizationId.value = selectedOrganization.value?.id ?? data.value?.organizationId))

const {
    data: classes,
    refresh: refreshClasses,
    pending: loadingClasses
} = useFetch('/api/classes/list', {
    query: {
        organizationId: organizationId
    },
    headers: useRequestHeaders() as HeadersInit,
    immediate: !!organizationId.value
})
</script>
