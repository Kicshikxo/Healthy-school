<template>
    <p-data-table
        :value="municipalities"
        :rowHover="!!municipalities?.length"
        :scrollable="true"
        scrollHeight="flex"
        dataKey="id"
        responsiveLayout="scroll"
        class="p-datatable-lg"
    >
        <template #empty>
            <div class="flex justify-content-center w-full h-1rem">
                <p-progress-bar v-if="loadingMunicipalities" mode="indeterminate" class="w-full h-1rem" />
                <div v-else>Муниципалитетов нет...</div>
            </div>
        </template>
        <p-column field="name" header="Название" />
        <p-column field="_count.organizations" header="Количество школ" />
    </p-data-table>
</template>

<script setup lang="ts">
const {
    data: municipalities,
    pending: loadingMunicipalities,
    refresh: refreshMunicipalities
} = useFetch('/api/municipalities/list')
</script>
