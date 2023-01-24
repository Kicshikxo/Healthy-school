<template>
    <health-component :loading="loadingData" :allow-save="hasChanges" :on-cancel="cancelChanges" :on-save="saveChanges">
        <template #title> Психологический компонент</template>
        <template #body="{ enableEditing }">
            <health-component-body :padding-top="false">
                <template #title> Психологические показатели </template>
                <template #content>
                    <template v-for="{ title, type } in currentOptions">
                        <p-divider />
                        <div class="grid grid-nogutter">
                            <div class="col-6 flex justify-content-start align-items-center text-lg">{{ title }}</div>
                            <div class="col-6 border-left-1 surface-border pl-4">
                                <health-dropdown
                                    :disabled="!enableEditing"
                                    :loading="loadingData"
                                    :options="educationOptions[type]"
                                    :placeholder="title"
                                    option-label="title"
                                    v-model="selectedOptions[type]"
                                />
                            </div>
                        </div>
                    </template>
                </template>
            </health-component-body>
        </template>
    </health-component>
</template>

<script setup lang="ts">
import { PsychologicalHealth, EducationType, PsychologicalHealthOption, PsychologicalType, HealthZone } from '@prisma/client'

const props = defineProps<{
    studentData: HealthComponentData
    loadingData: boolean
    refreshData: () => Promise<void>
}>()

async function cancelChanges() {
    await props.refreshData()
}

async function saveChanges() {
    const { error } = await useFetch('/api/students/health/psychological', {
        method: 'PATCH',
        body: {
            studentId: props.studentData?.id,
            options: Object.values(selectedOptions.value).filter(
                (option) => option.educationType === studentEducationType.value
            )
        } as PsychologicalHealth & { options: PsychologicalHealthOption[] }
    })

    if (error.value) {
        throw new Error(error.value.message)
    }

    await props.refreshData()
}

// Data from server
const { data: psychologicalOptions } = await useFetch('/api/students/health/psychological/options')

const studentEducationType = computed<EducationType | undefined>(() => {
    const classNumber = props.studentData?.class?.number
    if (!classNumber) return

    if (1 <= classNumber && classNumber <= 4) {
        return EducationType.PRIMARY
    }
    if (5 <= classNumber && classNumber <= 9) {
        return EducationType.BASIC
    }
    if (10 <= classNumber && classNumber <= 11) {
        return EducationType.MIDDLE
    }
})

const educationTypes = computed(() =>
    (Object.keys(EducationType) as EducationType[]).reduce((acc, type) => {
        acc[type] = [
            ...new Set(
                (psychologicalOptions.value ?? [])
                    .filter((option) => option.educationType === type)
                    .map((option) => option.psychologicalType)
            )
        ]
        return acc
    }, {} as { [key in EducationType]: PsychologicalType[] })
)

const studentPsychologicalTypes = computed(() =>
    studentEducationType.value ? educationTypes.value[studentEducationType.value] : []
)

// Options
const options = computed(() =>
    (Object.keys(EducationType) as EducationType[]).reduce((acc, type) => {
        acc[type] = (psychologicalOptions.value?.filter((option) => option.educationType === type) ?? []).reduce(
            (acc, option) => {
                acc[option.psychologicalType] = (acc[option.psychologicalType] ?? []).concat(option)
                return acc
            },
            {} as { [key in PsychologicalType]: PsychologicalHealthOption[] }
        )
        return acc
    }, {} as { [key in EducationType]: { [key in PsychologicalType]: PsychologicalHealthOption[] } })
)

const educationOptions = computed(() =>
    studentEducationType.value
        ? options.value[studentEducationType.value]
        : ({} as { [key in PsychologicalType]: PsychologicalHealthOption[] })
)

// Student data
const studentOptions = computed(() => {
    return studentPsychologicalTypes.value.reduce((acc, type) => {
        acc[type] =
            props.studentData?.psychologicalHealth?.options.find((option) => option.psychologicalType === type) ??
            educationOptions.value[type].find((option) => option.healthZone === HealthZone.GREEN)
        return acc
    }, {} as { [key in PsychologicalType]: PsychologicalHealthOption })
})

// Selected data
const selectedOptions = ref(useCloneDeep(studentOptions.value))

// Watch on student data update
watch(studentOptions, (value) => (selectedOptions.value = useCloneDeep(value)))

const hasChanges = computed(() => JSON.stringify(selectedOptions.value) !== JSON.stringify(studentOptions.value))

const typeTitles: { [key in PsychologicalType]: string } = {
    CULTURAL_VALUES: 'Уровень сформированности ценностей',
    MOTIVATION: 'Мотивация',
    ADAPTATION: 'Адаптация',
    SOCIOMETRY: 'Социальный статус (социометрия)',
    SELF_ASSESSMENT: 'Самооценка',
    ACCENTUATIONS: 'Акцентуации характера',
    ANXIETY: 'Тревожность',
    PERSONAL_ANXIETY: 'Тревожность (личностная, ситуативная)',
    AGGRESSIVITY: 'Агрессивность',
    EXTRACURRICULAR_ABILITIES: 'Способности к различным видам внеучебной деятельности',
    DEVIANT_BEHAVIOR: 'Отклоняющееся поведение',
    PROFESSIONAL_INTERESTS: 'Профессиональные интересы и склонности',
    BULLYING: 'Буллинг',
    CONFLICTUALITY: 'Участие ребенка в конфликтах в школе и вне школы'
}

const currentOptions = computed<{ title: string; type: PsychologicalType }[]>(() =>
    (studentEducationType.value ? educationTypes.value[studentEducationType.value] : []).map((type) => ({
        title: typeTitles[type],
        type
    }))
)
</script>
