<template>
    <section class="px-3">
        <p-card class="shadow-none">
            <template #title> Мероприятия индивидуального здоровьесберегающего маршрута </template>
            <template #content>
                <div class="grid grid-nogutter gap-2">
                    <p-card
                        class="col"
                        :class="{
                            'bg-green-300': true,
                            'bg-yellow-300': false,
                            'bg-red-300': false
                        }"
                    >
                        <template #title>
                            <span class="text-0"> Медицинский </span>
                        </template>
                        <template #content>
                            <span class="text-0"> не имеет ограничений по здоровью </span>
                        </template>
                    </p-card>
                    <p-card
                        class="col"
                        :class="{
                            'bg-green-300': info?.physicalHealth?.healthGroup === 'BASIC',
                            'bg-yellow-300': info?.physicalHealth?.healthGroup === 'PREPARATORY',
                            'bg-red-300': info?.physicalHealth?.healthGroup === 'SPECIAL'
                        }"
                    >
                        <template #title>
                            <span class="text-0"> Физической культуры </span>
                        </template>
                        <template #content>
                            <span class="text-0">
                                нет ограничений по занятиям физической культуры, занимается ей в урочное и внеурочное время
                            </span>
                        </template>
                    </p-card>
                    <p-card
                        class="col"
                        :class="{
                            'bg-green-300': false,
                            'bg-yellow-300': false,
                            'bg-red-300': true
                        }"
                    >
                        <template #title>
                            <span class="text-0">Педагогический</span>
                        </template>
                        <template #content>
                            <span class="text-0"> значительные ухудшения по показателям психологического здоровья </span>
                        </template>
                    </p-card>
                    <p-card
                        class="col"
                        :class="{
                            'bg-green-300': false,
                            'bg-yellow-300': true,
                            'bg-red-300': false
                        }"
                    >
                        <template #title>
                            <span class="text-0">Психологический</span>
                        </template>
                        <template #content>
                            <span class="text-0"> группа риска по психологическим показателям </span>
                        </template>
                    </p-card>
                    <p-card
                        class="col"
                        :class="{
                            'bg-green-300': false,
                            'bg-yellow-300': false,
                            'bg-red-300': true
                        }"
                    >
                        <template #title>
                            <span class="text-0"> Социальный </span>
                        </template>
                        <template #content>
                            <span class="text-0"> значительные ухудшения по показателям социального здоровья </span>
                        </template>
                    </p-card>
                </div>
            </template>
        </p-card>
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{ studentId: string }>()

const { data: info } = await useFetch('/api/students/info', {
    query: { id: props.studentId }
})
</script>
