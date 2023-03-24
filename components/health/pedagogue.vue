<template>
    <health-component
        :loading="student.loading"
        :allow-save="student.current.pedagogue.changed"
        :on-cancel="student.refresh"
        :on-save="student.current.pedagogue.save"
    >
        <template #title> Педагогический компонент </template>
        <template #body="{ enableEditing, loading }">
            <p-tab-view :key="`${enableEditing}${loading}`" v-model:activeIndex="activeTabIndex">
                <p-tab-panel header="Педагогические показатели" :disabled="loading">
                    <health-component-body :content-padding-top="false">
                        <template #title> Педагогические показатели </template>
                        <template #content>
                            <health-option
                                v-for="{ title, type } in pedagogueTab"
                                :disabled="!enableEditing || loading"
                                :loading="loading"
                                :options="pedagogueHealth.typedOptions[type]"
                                :title="title"
                                option-label="title"
                                v-model="student.current.pedagogue.options[type]"
                            />
                        </template>
                    </health-component-body>
                </p-tab-panel>
                <p-tab-panel header="Логопедические показатели" :disabled="loading">
                    <health-component-body :content-padding-top="false">
                        <template #title> Логопедические показатели </template>
                        <template #content>
                            <health-option
                                v-for="{ title, type } in speechTab"
                                :disabled="!enableEditing || loading"
                                :loading="loading"
                                :options="pedagogueHealth.typedOptions[type]"
                                :title="title"
                                option-label="title"
                                v-model="student.current.pedagogue.options[type]"
                            />
                        </template>
                    </health-component-body>
                </p-tab-panel>
            </p-tab-view>
        </template>
    </health-component>
</template>

<script setup lang="ts">
import { PedagogueType } from '@prisma/client'
import { useStudentStore } from '~~/store/student'
import { usePedagogueHealthStore } from '~~/store/health/pedagogue'

const student = useStudentStore()
const pedagogueHealth = usePedagogueHealthStore()

const activeTabIndex = ref<number>()

const pedagogueTab = computed<{ title: string; type: PedagogueType }[]>(() =>
    pedagogueHealth.tabTypes.PEDAGOGUE.map((type) => ({ title: pedagogueHealth.typeTitles[type], type }))
)

const speechTab = computed<{ title: string; type: PedagogueType }[]>(() =>
    pedagogueHealth.tabTypes.SPEECH_THERAPIST.map((type) => ({ title: pedagogueHealth.typeTitles[type], type }))
)
</script>
