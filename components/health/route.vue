<template>
    <health-component :loading="student.loading" :editable="false" :reloadable="true" :on-reload="student.refresh">
        <template #title> Индивидуальный здоровьесберегающий маршрут </template>
        <template #body>
            <health-component-body :content-padding-top="false" :class="{ 'opacity-60': student.loading }">
                <template #content>
                    <div class="flex flex-column gap-2">
                        <p-card
                            v-for="conclusion in Object.values(student.conclusions)"
                            class="shadow-none text-white"
                            :class="cardBackgroundClass[conclusion.healthZone]"
                        >
                            <template #title>
                                {{ conclusion.title }}
                            </template>
                            <template #content>
                                <div class="flex flex-column gap-3">
                                    <p-card
                                        class="shadow-none text-white"
                                        :class="sectionBackgroundClass[conclusion.healthZone]"
                                    >
                                        <template #title> Выводы </template>
                                        <template #content>
                                            <div class="flex flex-wrap gap-1">
                                                <p-chip
                                                    v-for="summary in conclusion.summary?.split('\n')"
                                                    class="p-2 text-gray-800"
                                                    :class="chipBackgroundClass[conclusion.healthZone]"
                                                >
                                                    <health-zone-indicator :label="summary" />
                                                </p-chip>
                                            </div>
                                        </template>
                                    </p-card>
                                    <p-card
                                        v-if="conclusion.recommendations?.length || conclusion.notes?.length"
                                        class="shadow-none text-white"
                                        :class="sectionBackgroundClass[conclusion.healthZone]"
                                    >
                                        <template #title>Рекомендации</template>
                                        <template #content>
                                            <template v-if="conclusion.recommendations?.length">
                                                <p-card
                                                    v-for="recommendations in conclusion.recommendations"
                                                    class="shadow-none text-white bg-transparent"
                                                >
                                                    <template #title>{{ recommendations.title }}</template>
                                                    <template #subtitle>
                                                        <span class="text-white text-lg">
                                                            {{ recommendations.subtitle }}
                                                        </span>
                                                    </template>
                                                    <template #content>
                                                        <div class="flex flex-wrap gap-1">
                                                            <p-chip
                                                                v-for="recommendation in recommendations.list"
                                                                class="p-2 text-gray-800"
                                                                :class="chipBackgroundClass[recommendations.healthZone!]"
                                                            >
                                                                <health-zone-indicator
                                                                    :health-zone="recommendations.healthZone"
                                                                    :label="recommendation.title"
                                                                />
                                                            </p-chip>
                                                        </div>
                                                    </template>
                                                </p-card>
                                            </template>
                                            <template v-if="conclusion.notes?.length">
                                                <p-card
                                                    v-for="note in conclusion.notes"
                                                    class="shadow-none text-white bg-transparent"
                                                >
                                                    <template #title>{{ note.title }}</template>
                                                    <template #content>
                                                        <p-chip
                                                            class="w-full p-2 text-gray-800"
                                                            :class="chipBackgroundClass[conclusion.healthZone]"
                                                            style="white-space: pre-line"
                                                        >
                                                            <health-zone-indicator :label="note.value" />
                                                        </p-chip>
                                                    </template>
                                                </p-card>
                                            </template>
                                        </template>
                                    </p-card>
                                </div>
                            </template>
                        </p-card>
                    </div>
                </template>
            </health-component-body>
        </template>
    </health-component>
</template>

<script setup lang="ts">
import { HealthZone } from '@prisma/client'
import { useStudentStore } from '~~/store/student'

const student = useStudentStore()

const cardBackgroundClass = ref<{ [key in HealthZone]: string }>({
    GREEN: 'bg-green-400',
    YELLOW: 'bg-yellow-400',
    RED: 'bg-red-400'
})

const sectionBackgroundClass = ref<{ [key in HealthZone]: string }>({
    GREEN: 'bg-green-500',
    YELLOW: 'bg-yellow-500',
    RED: 'bg-red-500'
})

const chipBackgroundClass = ref<{ [key in HealthZone]: string }>({
    GREEN: 'bg-green-100',
    YELLOW: 'bg-yellow-100',
    RED: 'bg-red-100'
})
</script>
