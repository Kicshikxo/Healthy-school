<template>
    <health-component :loading="loadingData" :allow-save="hasChanges" :on-cancel="cancelChanges" :on-save="saveChanges">
        <template #title> Педагогический компонент</template>
        <template #body="{ enableEditing }">
            <p-tab-view :key="enableEditing" v-model:activeIndex="activeTabIndex">
                <p-tab-panel header="Педагогические показатели" :disabled="loadingData">
                    <health-component-body :padding-top="false">
                        <template #title> Педагогические показатели </template>
                        <template #content>
                            <template v-for="{ title, type } in pedagogueTab">
                                <p-divider />
                                <div class="grid grid-nogutter">
                                    <div class="col-6 flex justify-content-start align-items-center text-lg">{{ title }}</div>
                                    <div class="col-6 border-left-1 surface-border pl-4">
                                        <health-dropdown
                                            :disabled="!enableEditing"
                                            :loading="loadingData"
                                            :options="options[type]"
                                            :placeholder="title"
                                            option-label="title"
                                            v-model="selectedOptions[type]"
                                        />
                                    </div>
                                </div>
                            </template>
                        </template>
                    </health-component-body>
                </p-tab-panel>
                <p-tab-panel header="Логопедические показатели" :disabled="loadingData">
                    <health-component-body :padding-top="false">
                        <template #title> Логопедические показатели </template>
                        <template #content>
                            <template v-for="{ title, type } in speechTab">
                                <p-divider />
                                <div class="grid grid-nogutter">
                                    <div class="col-6 flex justify-content-start align-items-center text-lg">{{ title }}</div>
                                    <div class="col-6 border-left-1 surface-border pl-4">
                                        <health-dropdown
                                            :disabled="!enableEditing"
                                            :loading="loadingData"
                                            :options="options[type]"
                                            :placeholder="title"
                                            option-label="title"
                                            v-model="selectedOptions[type]"
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
import { HealthZone, PedagogueHealth, PedagogueHealthOption, PedagogueTab, PedagogueType } from '@prisma/client'

const props = defineProps<{
    studentData: HealthComponentData
    loadingData: boolean
    refreshData: () => Promise<void>
}>()

const activeTabIndex = ref(0)

async function cancelChanges() {
    await props.refreshData()
}

async function saveChanges() {
    const { error } = await useFetch('/api/students/health/pedagogue', {
        method: 'PATCH',
        body: {
            studentId: props.studentData?.id,
            options: Object.values(selectedOptions.value)
        } as PedagogueHealth & { options: PedagogueHealthOption[] }
    })

    if (error.value) {
        throw new Error(error.value.message)
    }

    await props.refreshData()
}

// Data from server
const { data: pedagogueOptions } = await useFetch('/api/students/health/pedagogue/options')

const tabTypes = computed(() =>
    (Object.keys(PedagogueTab) as PedagogueTab[]).reduce((acc, tab) => {
        acc[tab] = [
            ...new Set(
                (pedagogueOptions.value ?? [])
                    .filter((option) => option.pedagogueTab === tab)
                    .map((option) => option.pedagogueType)
            )
        ]
        return acc
    }, {} as { [key in PedagogueTab]: PedagogueType[] })
)

// Options
const options = computed(() =>
    (pedagogueOptions.value ?? []).reduce((acc, option) => {
        acc[option.pedagogueType] = (acc[option.pedagogueType] ?? []).concat(option)
        return acc
    }, {} as { [key in PedagogueType]: PedagogueHealthOption[] })
)

// Student data
const studentOptions = computed(() =>
    (Object.keys(PedagogueType) as PedagogueType[]).reduce((acc, type) => {
        acc[type] =
            props.studentData?.pedagogueHealth?.options.find((option) => option.pedagogueType === type) ??
            options.value[type].find((option) => option.healthZone === HealthZone.GREEN)!
        return acc
    }, {} as { [key in PedagogueType]: PedagogueHealthOption })
)

// Selected data
const selectedOptions = ref(useCloneDeep(studentOptions.value))

// Watch on student data update
watch(studentOptions, (value) => (selectedOptions.value = useCloneDeep(value)))

const hasChanges = computed(() => JSON.stringify(selectedOptions.value) !== JSON.stringify(studentOptions.value))

const typeTitles: { [key in PedagogueType]: string } = {
    UNDERSTANDING_INSTRUCTIONS: 'Понимание инструкции',
    MASTERING_EDUCATION: 'Освоение содержания образования',
    WORK_PACE: 'Темп работы',
    ACTIVITY_SPECIFICS: 'Специфика продуктивной деятельности',
    WORKABILITY: 'Работоспособность на уроке и внеурочной деятельности',
    HEALTH_LIMITATIONS: 'ОВЗ (наличие заключения ПМПК)',
    DISABILITY: 'Инвалидность (наличие справки МСЭ, рекомендаций ИПРА)',

    VOICE_DISORDERS: 'Расстройства голоса',
    TEMPO_RHYTHMIC_DISORDERS: 'Нарушения темпо-ритмической организации речи',
    SPELLING_DISORDERS: 'Нарушения звукопроизношения',
    ANATOMO_PHYSIOLOGICAL_DEFECTS: 'Анатомо-физиологические дефекты речевого аппарата',
    INNERVATION_DISORDERS: 'Нарушения иннервации речевого аппарата',
    STRUCTURAL_SEMANTIC_DISORDERS: 'Нарушения структурно-семантического оформления высказывания',
    WRITING_DISORDERS: 'Нарушения письма',
    READING_DISORDERS: 'Нарушения чтения'
}

const pedagogueTab = computed<{ title: string; type: PedagogueType }[]>(() =>
    tabTypes.value.PEDAGOGUE.map((type) => ({ title: typeTitles[type], type }))
)

const speechTab = computed<{ title: string; type: PedagogueType }[]>(() =>
    tabTypes.value.SPEECH_THERAPIST.map((type) => ({ title: typeTitles[type], type }))
)
</script>
