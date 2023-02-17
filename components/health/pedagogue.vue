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
                            <template v-for="{ title, type } in pedagogueTab">
                                <p-divider />
                                <div class="grid grid-nogutter">
                                    <div class="col-6 flex justify-content-start align-items-center text-lg">{{ title }}</div>
                                    <div class="col-6 border-left-1 surface-border pl-4">
                                        <health-dropdown
                                            :disabled="!enableEditing || loading"
                                            :loading="loading"
                                            :options="pedagogueHealth.typedOptions[type]"
                                            :placeholder="title"
                                            option-label="title"
                                            v-model="student.current.pedagogue.options[type]"
                                        />
                                    </div>
                                </div>
                            </template>
                        </template>
                    </health-component-body>
                </p-tab-panel>
                <p-tab-panel header="Логопедические показатели" :disabled="loading">
                    <health-component-body :content-padding-top="false">
                        <template #title> Логопедические показатели </template>
                        <template #content>
                            <template v-for="{ title, type } in speechTab">
                                <p-divider />
                                <div class="grid grid-nogutter">
                                    <div class="col-6 flex justify-content-start align-items-center text-lg">{{ title }}</div>
                                    <div class="col-6 border-left-1 surface-border pl-4">
                                        <health-dropdown
                                            :disabled="!enableEditing || loading"
                                            :loading="loading"
                                            :options="pedagogueHealth.typedOptions[type]"
                                            :placeholder="title"
                                            option-label="title"
                                            v-model="student.current.pedagogue.options[type]"
                                        />
                                    </div>
                                </div>
                            </template>
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

const activeTabIndex = ref(0)

const pedagogueTab = computed<{ title: string; type: PedagogueType }[]>(() =>
    pedagogueHealth.tabTypes.PEDAGOGUE.map((type) => ({ title: pedagogueHealth.typeTitles[type], type }))
)

const speechTab = computed<{ title: string; type: PedagogueType }[]>(() =>
    pedagogueHealth.tabTypes.SPEECH_THERAPIST.map((type) => ({ title: pedagogueHealth.typeTitles[type], type }))
)
</script>
