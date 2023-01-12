<template>
    <section class="px-3">
        <p-card class="shadow-none">
            <template #title>
                <div class="flex align-items-center justify-content-between">
                    <span> Компонент социального здоровья </span>
                    <div class="flex gap-2 align-self-end">
                        <p-button
                            v-if="!enableEditing"
                            :loading="loadingData"
                            icon="pi pi-pencil"
                            label="Редактировать"
                            :disabled="enableEditing"
                            class="p-button-primary"
                            @click="enableEditing = true"
                        />
                        <p-button
                            v-if="enableEditing"
                            icon="pi pi-times"
                            label="Отменить"
                            :disabled="!enableEditing"
                            class="p-button-danger"
                            @click="cancelChanges"
                        />
                        <p-button
                            v-if="enableEditing"
                            :loading="loadingData"
                            icon="pi pi-save"
                            label="Сохранить"
                            :disabled="!enableEditing || !hasChanges"
                            class="p-button-success"
                            @click="saveChanges"
                        />
                    </div>
                </div>
            </template>
            <template #content>
                <p-card
                    class="p-card-content-pb-0 border-1 border-300 shadow-none"
                    :class="{
                        'border-noround-bottom': showIndividualRecommendations
                    }"
                >
                    <template #title> Индикаторы социального здоровья </template>
                    <template #content>
                        <div v-for="indicator in socialHealthIndicators" :key="indicator.id" class="field-checkbox">
                            <div
                                style="width: 6px; height: 20px"
                                class="mr-2 border-round"
                                :class="{
                                    'bg-green-500': indicator.healthZone === 'GREEN',
                                    'bg-yellow-500': indicator.healthZone === 'YELLOW',
                                    'bg-red-500': indicator.healthZone === 'RED'
                                }"
                            />
                            <p-checkbox
                                :disabled="!enableEditing"
                                :inputId="`indicator${indicator.id}`"
                                :value="indicator"
                                v-model="selectedHealthIndicators"
                                :class="{
                                    'p-checkbox-green': indicator.healthZone === 'GREEN',
                                    'p-checkbox-yellow': indicator.healthZone === 'YELLOW',
                                    'p-checkbox-red': indicator.healthZone === 'RED'
                                }"
                            />
                            <label :for="`indicator${indicator.id}`">
                                {{ indicator.title }}
                            </label>
                        </div>
                    </template>
                </p-card>
                <p-card
                    v-if="showIndividualRecommendations"
                    class="p-card-content-pb-0 border-1 border-top-none border-300 border-noround-top shadow-none"
                >
                    <template #title> Профилактические и здоровьесберегающие рекомендации </template>
                    <template #content>
                        <p-multi-select
                            :disabled="!enableEditing"
                            panelClass="border-1 border-300"
                            v-model="selectedIndividualRecommendations"
                            :options="individualRecommendations"
                            display="chip"
                            appendTo="self"
                            placeholder="Индивидуальные рекомендации"
                            class="w-full"
                        />
                    </template>
                </p-card>
            </template>
        </p-card>
    </section>
</template>

<script setup lang="ts">
import { Student, HealthZone, SocialHealth, SocialHealthIndicator, PhysicalHealth, MedicalHealth } from '@prisma/client'
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
    studentData:
        | (Student & {
              physicalHealth: PhysicalHealth | null
              medicalHealth: MedicalHealth | null
              socialHealth: (SocialHealth & { indicators: SocialHealthIndicator[] }) | null
          })
        | null
    loadingData: boolean
    refreshData: () => Promise<void>
}>()

const toast = useToast()

const enableEditing = ref<boolean>(false)
const hasChanges = computed(
    () =>
        JSON.stringify(sortedHealthIndicators.value) !== JSON.stringify(studentHealthIndicators.value) ||
        JSON.stringify(selectedIndividualRecommendations.value) !== JSON.stringify(studentIndividualRecommendations.value)
)

function cancelChanges() {
    selectedHealthIndicators.value = [...(studentHealthIndicators.value ?? [])]
    selectedIndividualRecommendations.value = [...(studentIndividualRecommendations.value ?? [])]
    enableEditing.value = false
}

async function saveChanges() {
    const { error } = await useFetch('/api/students/health/social', {
        method: 'PATCH',
        body: {
            studentId: props.studentData?.id,
            indicators: selectedHealthIndicators.value,
            individualRecommendations: selectedIndividualRecommendations.value
        } as SocialHealth & { indicators: SocialHealthIndicator[] }
    })
    if (error.value) {
        return toast.add({
            severity: 'error',
            summary: 'Ошибка сохранения',
            detail: 'Изменения не были сохранены',
            life: 3000
        })
    } else {
        toast.add({
            severity: 'success',
            summary: 'Данные сохранены',
            detail: 'Изменения были сохранены',
            life: 3000
        })
    }

    await props.refreshData()
    selectedHealthIndicators.value = [...(studentHealthIndicators.value ?? [])]
    selectedIndividualRecommendations.value = [...(studentIndividualRecommendations.value ?? [])]
    enableEditing.value = false
}

const { data: socialHealthIndicators } = await useFetch<SocialHealthIndicator[] | null>(
    '/api/students/health/social-indicators'
)
const studentHealthIndicators = computed(() => props.studentData?.socialHealth?.indicators)
const selectedHealthIndicators = ref<SocialHealthIndicator[]>([...(studentHealthIndicators.value || [])])
const sortedHealthIndicators = computed<SocialHealthIndicator[]>(() => selectedHealthIndicators.value.sort())

const showIndividualRecommendations = computed(() =>
    selectedHealthIndicators.value.some((indicator) => indicator.healthZone === 'YELLOW' || indicator.healthZone === 'RED')
)
const studentIndividualRecommendations = computed(() => [...(props.studentData?.socialHealth?.individualRecommendations ?? [])])
const selectedIndividualRecommendations = ref<string[]>([...(studentIndividualRecommendations.value ?? [])])

const currentHealthZone = computed<HealthZone>(() => {
    const healthZones = selectedHealthIndicators.value.map((indicator) => indicator.healthZone)

    if (healthZones.some((healthZone) => healthZone === 'RED')) {
        return 'RED'
    }
    if (healthZones.some((healthZone) => healthZone === 'YELLOW')) {
        return 'YELLOW'
    }
    return 'GREEN'
})

const yellowRecommendations = [
    'консультирование у специалистов по запросу',
    'формирование здорового образа жизни через проведение профилактических и просветительских мероприятий',
    'занятия с социальным педагогом',
    'социальная помощь',
    'юридическая консультация',
    'просветительские и профилактические занятия с педагогом-психологом'
]

const redRecommendations = [
    'консультирование у специалистов по запросу',
    'формирование здорового образа жизни через проведение профилактических и просветительских мероприятий',
    'социальная помощь',
    'юридическая консультация',
    'просветительские и профилактические занятия с педагогом-психологом',
    'контроль и консультирование семьи несовершеннолетнего и обучающегося',
    'организация межведомственного взаимодействия по сопровождению обучающегося со всеми заинтересованными структурами',
    'проведение индивидуальных занятий с обучающимся с социальным педагогом и педагогом-психологом',
    'проведение мониторингов социальной работы в образовательной организации',
    'организация рейдов в семью совместно с органами опеки, КДН, ПДН',
    'междисциплинарное взаимодействие с педагогами образовательной организации',
    'совестная профилактическая и просветительская деятельность с центром сопровождения несовершеннолетних (для семьи – бывших воспитанников школы-интерната)',
    'проведение мероприятий совместно с медицинскими организациями по профилактике нарко- и алкозависимости',
    'проведение мероприятий совместно с УМВД по профилактике насилия и жестокости'
]

const individualRecommendations = computed(() => {
    if (currentHealthZone.value === 'YELLOW') {
        return yellowRecommendations
    }
    if (currentHealthZone.value === 'RED') {
        return redRecommendations
    }
})
</script>
