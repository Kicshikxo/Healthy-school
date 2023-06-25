<template>
    <p-data-table
        :value="organizations"
        :rowHover="!!organizations?.length"
        :scrollable="true"
        scrollHeight="flex"
        dataKey="id"
        responsiveLayout="scroll"
        class="p-datatable-lg"
    >
        <template #header>
            <div class="flex">
                <form-select-municipality
                    placeholder="Выберите муниципалитет"
                    v-model="selectedMunicipality"
                    hideErrorMessage
                    class="mb-0 max-w-20rem white-space-nowrap"
                />
            </div>
        </template>
        <template #empty>
            <div class="flex justify-content-center w-full h-1rem">
                <div v-if="!selectedMunicipality">Выберите муниципалитет</div>
                <p-progress-bar v-else-if="loadingOrganizations" mode="indeterminate" class="w-full h-1rem" />
                <div v-else>Школ нет...</div>
            </div>
        </template>
        <p-column field="name" header="Название" />
        <p-column field="_count.classes" header="Количество классов" />
    </p-data-table>
</template>

<script setup lang="ts">
import { Municipality } from '@prisma/client'

const selectedMunicipality = ref<Municipality>()

const {
    data: organizations,
    pending: loadingOrganizations,
    refresh: refreshOrganizations
} = useFetch('/api/organizations/list', {
    query: { municipalityId: computed(() => selectedMunicipality.value?.id) },
    immediate: !!selectedMunicipality.value
})
</script>
