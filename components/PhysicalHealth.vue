<template>
    <section class="px-3">
        <p-card class="shadow-none">
            <template #title>
                <div class="flex align-items-center justify-content-between">
                    <span> Компонент физической культуры </span>
                    <div class="flex gap-3 align-self-end">
                        <p-button
                            v-if="!enableEditing"
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
                    class="p-card-content-pb-0 border-1 border-300"
                    :class="{
                        'border-noround-bottom': showIndividualRecommendations
                    }"
                >
                    <template #title> Медицинская группа для занятий физической культурой </template>
                    <template #content>
                        <div class="grid grid-nogutter gap-2 h-3rem">
                            <p-button
                                label="Основная"
                                :class="{
                                    'p-button-outlined': physicalHealth.healthGroup !== 'BASIC'
                                }"
                                class="col p-button-success"
                                :disabled="!enableEditing"
                                @click="changeHealthGroup('BASIC')"
                            />
                            <p-button
                                label="Подготовительная"
                                :class="{
                                    'p-button-outlined': physicalHealth.healthGroup !== 'PREPARATORY'
                                }"
                                class="col p-button-warning"
                                :disabled="!enableEditing"
                                @click="changeHealthGroup('PREPARATORY')"
                            />
                            <p-button
                                label="Специальная"
                                :class="{
                                    'p-button-outlined': physicalHealth.healthGroup !== 'SPECIAL'
                                }"
                                class="col p-button-danger"
                                :disabled="!enableEditing"
                                @click="changeHealthGroup('SPECIAL')"
                            />
                        </div>
                    </template>
                    <template #footer>
                        <span class="font-bold">Выводы: </span>
                        <span class="underline">
                            <span v-if="physicalHealth.healthGroup === 'BASIC'">
                                основная группа для занятий физической культурой
                            </span>
                            <span v-else-if="physicalHealth.healthGroup === 'PREPARATORY'">
                                подготовительная группа для занятий физической культурой
                            </span>
                            <span v-else-if="physicalHealth.healthGroup === 'SPECIAL'">
                                специальная группа для занятий физической культурой
                            </span>
                        </span>
                    </template>
                </p-card>
                <p-card v-if="showIndividualRecommendations" class="border-1 border-top-none border-300 border-noround-top">
                    <template #title> Индивидуальные рекомендации и назначения </template>
                    <template #content>
                        <p-multi-select
                            :disabled="!enableEditing"
                            v-model="physicalHealth.individualRecommendations"
                            :options="individualRecommendations"
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
                            v-model="physicalHealth.specialistRecommendations"
                            :autoResize="true"
                            :rows="2"
                            placeholder="Рекомендации для занятий физической культурой от профильного медицинского специалиста"
                            class="w-full"
                        />
                    </template>
                </p-card>
            </template>
        </p-card>
    </section>
</template>

<script setup lang="ts">
import { HealthGroup, PhysicalHealth } from '@prisma/client'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const props = defineProps<{ studentId: string }>()

const enableEditing = ref<boolean>(false)

const hasChanges = computed(
    () =>
        JSON.stringify(physicalHealth.value.healthGroup) !== JSON.stringify(info.value?.physicalHealth?.healthGroup) ||
        JSON.stringify(physicalHealth.value.individualRecommendations) !==
            JSON.stringify(info.value?.physicalHealth?.individualRecommendations) ||
        JSON.stringify(physicalHealth.value.specialistRecommendations) !==
            JSON.stringify(info.value?.physicalHealth?.specialistRecommendations)
)

function changeHealthGroup(value: HealthGroup) {
    physicalHealth.value.healthGroup = value
}

const preparatoryRecomendations = [
    'выполнение программы физического воспитания с ограничениями по рекомендации врача',
    'сдача индивидуальных нормативов и участие в массовых физкультурных мероприятиях при наличии медицинского заключения по результатам дополнительного осмотра',
    'не допущение к занятиям спортом и участию в соревнованиях',
    'проведение дополнительных занятий для повышения общей физической подготовки'
]

const specialRecomendations = [
    'обучение умению и навыкам элементов ЗОЖ',
    'осуществление самоконтроля здоровья и функциональных возможностей',
    'организация физкультурных занятий по особой программе, снижение нормативов, строгое дозирование физической нагрузки',
    'включение лечебной физкультуры в программу занятий',
    'широкое использование дыхательных, корригирующих и общеразвивающих упражнений',
    'проявление повышенной осторожности при использовании физических упражнений',
    'исключение физических упражнений, противопоказанных по состоянию здоровья',
    'включение в занятия подвижных игр умеренной интенсивности'
]

const individualRecommendations = computed(() => {
    if (physicalHealth.value.healthGroup === 'PREPARATORY') {
        return preparatoryRecomendations
    }
    if (physicalHealth.value.healthGroup === 'SPECIAL') {
        return specialRecomendations
    }
})

const showIndividualRecommendations = computed(
    () => physicalHealth.value.healthGroup === 'PREPARATORY' || physicalHealth.value.healthGroup === 'SPECIAL'
)

function cancelChanges() {
    physicalHealth.value = { ...info.value!.physicalHealth! }
    enableEditing.value = false
}

async function saveChanges() {
    const { error } = await useFetch('/api/students/components/physical-health', {
        method: 'PATCH',
        body: physicalHealth.value as PhysicalHealth
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
    await refreshInfo()
    physicalHealth.value = { ...info.value!.physicalHealth! }
    enableEditing.value = false
}

const { data: info, refresh: refreshInfo } = await useFetch('/api/students/info', {
    query: { id: props.studentId }
})

const physicalHealth = ref({
    ...info.value!.physicalHealth!
})
</script>
