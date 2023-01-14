<template>
    <health-component :loading="loadingData" :allow-save="hasChanges" :on-cancel="cancelChanges" :on-save="saveChanges">
        <template #title>Компонент физической культуры</template>
        <template #body="{ enableEditing }">
            <health-component-body>
                <template #title> Медицинская группа для занятий физической культурой </template>
                <template #content>
                    <div class="flex justify-content-center">
                        <p-select-button
                            v-model="selectedHealthGroup"
                            :options="[
                                { label: 'Основная', value: 'BASIC' },
                                { label: 'Подготовительная', value: 'PREPARATORY' },
                                { label: 'Специальная', value: 'SPECIAL' }
                            ]"
                            optionLabel="label"
                            optionValue="value"
                            :disabled="!enableEditing"
                            :unselectable="false"
                            class="select-health-group"
                        />
                    </div>
                </template>
            </health-component-body>
            <health-component-body v-if="showRecommendations">
                <template #title> Индивидуальные рекомендации и назначения </template>
                <template #content>
                    <p-multi-select
                        :disabled="!enableEditing"
                        v-model="selectedRecommendations"
                        :options="availableRecommendations"
                        optionLabel="title"
                        panelClass="border-1 border-300"
                        display="chip"
                        appendTo="self"
                        placeholder="Индивидуальные рекомендации"
                        class="w-full"
                    />
                </template>
                <template #footer>
                    <div class="mb-2 text-xl font-bold">Иное</div>
                    <p-textarea
                        :disabled="!enableEditing"
                        v-model="currentSpecialistNotes"
                        :autoResize="true"
                        :rows="4"
                        placeholder="Рекомендации для занятий физической культурой от профильного медицинского специалиста"
                        class="w-full"
                    />
                </template>
            </health-component-body>
        </template>
    </health-component>
</template>

<script setup lang="ts">
import { HealthGroup, PhysicalHealth, PhysicalHealthRecommendation } from '@prisma/client'

const props = defineProps<{
    studentData: HealthComponentData
    loadingData: boolean
    refreshData: () => Promise<void>
}>()

const hasChanges = computed(
    () =>
        JSON.stringify(selectedHealthGroup.value) !== JSON.stringify(studentHealthGroup.value) ||
        JSON.stringify(sortedSelectedRecommendations.value) !== JSON.stringify(studentRecommendations.value) ||
        JSON.stringify(currentSpecialistNotes.value) !== JSON.stringify(studentSpecialistNotes.value)
)

async function cancelChanges() {
    await props.refreshData()
}

async function saveChanges() {
    const { error } = await useFetch('/api/students/health/physical', {
        method: 'PATCH',
        body: {
            studentId: props.studentData?.id,
            healthGroup: selectedHealthGroup.value,
            recommendations: selectedRecommendations.value.filter(
                (recommendation) => recommendation.healthGroup === selectedHealthGroup.value
            ),
            specialistNotes: currentSpecialistNotes.value
        } as PhysicalHealth & { recommendations: PhysicalHealthRecommendation[] }
    })

    if (error.value) {
        throw new Error(error.value.message)
    }

    await props.refreshData()
}

// Student data
const studentHealthGroup = computed(() => props.studentData?.physicalHealth?.healthGroup ?? 'BASIC')
const studentRecommendations = computed(() => props.studentData?.physicalHealth?.recommendations ?? [])
const studentSpecialistNotes = computed(() => props.studentData?.physicalHealth?.specialistNotes ?? '')

// Selected data
const selectedHealthGroup = ref<HealthGroup>(studentHealthGroup.value)
const selectedRecommendations = ref<PhysicalHealthRecommendation[]>(studentRecommendations.value)
const currentSpecialistNotes = ref<string>(studentSpecialistNotes.value)

// Watch on student data update
watch(studentHealthGroup, (value) => (selectedHealthGroup.value = value))
watch(studentRecommendations, (value) => (selectedRecommendations.value = value))
watch(studentSpecialistNotes, (value) => (currentSpecialistNotes.value = value))

// Sorted selected data
const sortedSelectedRecommendations = computed<PhysicalHealthRecommendation[]>(() =>
    selectedRecommendations.value.sort((a, b) => a.id - b.id)
)

const { data: physicalRecommendations } = useFetch('/api/students/health/physical/recommendations')
const availableRecommendations = computed(() =>
    physicalRecommendations.value?.filter((recommendation) => recommendation.healthGroup === selectedHealthGroup.value)
)

const showRecommendations = computed(() => (['PREPARATORY', 'SPECIAL'] as HealthGroup[]).includes(selectedHealthGroup.value))
</script>
