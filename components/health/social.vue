<template>
    <health-component :loading="loadingData" :has-changes="hasChanges" :on-cancel="cancelChanges" :on-save="saveChanges">
        <template #title>Компонент социального здоровья</template>
        <template #body="{ enableEditing }">
            <health-component-body>
                <template #title>Индикаторы социального здоровья</template>
                <template #content>
                    <div v-for="indicator in socialIndicators" :key="indicator.id" class="field-checkbox">
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
                            v-model="selectedIndicators"
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
            </health-component-body>
            <health-component-body v-if="showRecommendations">
                <template #title> Профилактические и здоровьесберегающие рекомендации </template>
                <template #content>
                    <p-multi-select
                        :disabled="!enableEditing"
                        panelClass="border-1 border-300"
                        v-model="selectedRecommendations"
                        :options="availableRecommendations"
                        optionLabel="title"
                        display="chip"
                        appendTo="self"
                        placeholder="Индивидуальные рекомендации"
                        class="w-full"
                    />
                </template>
            </health-component-body>
        </template>
    </health-component>
</template>

<script setup lang="ts">
import { HealthZone, SocialHealth, SocialHealthIndicator, SocialHealthRecommendation } from '@prisma/client'

const props = defineProps<{
    studentData: HealthComponentData
    loadingData: boolean
    refreshData: () => Promise<void>
}>()

const hasChanges = computed(
    () =>
        JSON.stringify(sortedSelectedIndicators.value) !== JSON.stringify(studentIndicators.value) ||
        JSON.stringify(sortedSelectedRecommendations.value) !== JSON.stringify(studentRecommendations.value)
)

async function invalidateData() {
    await props.refreshData()
    selectedIndicators.value = studentIndicators.value
    selectedRecommendations.value = studentRecommendations.value
}

async function cancelChanges() {
    await invalidateData()
}

async function saveChanges() {
    const { error } = await useFetch('/api/students/health/social', {
        method: 'PATCH',
        body: {
            studentId: props.studentData?.id,
            indicators: selectedIndicators.value,
            recommendations: selectedRecommendations.value.filter(
                (recommendation) => recommendation.healthZone === currentHealthZone.value
            )
        } as SocialHealth & { indicators: SocialHealthIndicator[]; recommendations: SocialHealthRecommendation[] }
    })

    if (error.value) {
        throw new Error(error.value.message)
    }

    invalidateData()
}

// Student data
const studentIndicators = computed(() => props.studentData?.socialHealth?.indicators ?? [])
const studentRecommendations = computed(() => props.studentData?.socialHealth?.recommendations ?? [])

// Selected data
const selectedIndicators = ref<SocialHealthIndicator[]>(studentIndicators.value)
const selectedRecommendations = ref<SocialHealthRecommendation[]>(studentRecommendations.value)

// Sorted selected data
const sortedSelectedIndicators = computed<SocialHealthIndicator[]>(() => selectedIndicators.value.sort((a, b) => a.id - b.id))
const sortedSelectedRecommendations = computed<SocialHealthRecommendation[]>(() =>
    selectedRecommendations.value.sort((a, b) => a.id - b.id)
)

// Data from server
const { data: socialIndicators } = await useFetch('/api/students/health/social/indicators')
const { data: socialRecommendations } = await useFetch('/api/students/health/social/recommendations')

const availableRecommendations = computed(() =>
    socialRecommendations.value?.filter((recommendation) => recommendation.healthZone === currentHealthZone.value)
)

const showRecommendations = computed(() => (['YELLOW', 'RED'] as HealthZone[]).includes(currentHealthZone.value))

const currentHealthZone = computed<HealthZone>(() => {
    const healthZones = selectedIndicators.value.map((indicator) => indicator.healthZone)

    if (healthZones.some((healthZone) => healthZone === 'RED')) {
        return 'RED'
    }
    if (healthZones.some((healthZone) => healthZone === 'YELLOW')) {
        return 'YELLOW'
    }
    return 'GREEN'
})
</script>
