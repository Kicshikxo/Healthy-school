<template>
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
        <template #empty>
            <div class="flex justify-content-center w-full h-1rem">
                <p-progress-bar v-if="loadingClasses" mode="indeterminate" class="w-full h-1rem" />
                <div v-else>Классов нет...</div>
            </div>
        </template>
        <p-column field="number" header="Номер" />
        <p-column field="liter" header="Литер" />
        <p-column field="_count.students" header="Количество учащихся" />
    </p-data-table>
</template>

<script setup lang="ts">
const { data } = useAuthState()

const {
    data: classes,
    pending: loadingClasses,
    refresh: refreshClasses
} = useFetch('/api/classes/list', {
    query: { organizationId: data.value?.organizationId },
    headers: useRequestHeaders() as HeadersInit
})
</script>
