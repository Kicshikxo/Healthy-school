<template>
    <health-component
        :loading="student.loading"
        :allow-save="student.current.psychological.changed"
        :on-cancel="student.refresh"
        :on-save="student.current.psychological.save"
    >
        <template #title> Психологический компонент</template>
        <template #body="{ enableEditing, loading }">
            <health-component-body :content-padding-top="false">
                <template #title> Психологические показатели </template>
                <template #content>
                    <health-option
                        v-for="{ title, type } in currentOptions"
                        :disabled="!enableEditing || loading"
                        :loading="loading"
                        :options="student.current.psychological.educationOptions[type]"
                        :title="title"
                        option-label="title"
                        v-model="student.current.psychological.options[type]"
                    />
                </template>
            </health-component-body>
            <health-component-body>
                <template #title> Иное </template>
                <template #content>
                    <p-textarea
                        :disabled="!enableEditing || loading"
                        :autoResize="true"
                        :rows="6"
                        v-model="student.current.psychological.specialistNotes"
                        placeholder="Заполняется вручную"
                        class="w-full"
                    />
                </template>
            </health-component-body>
        </template>
    </health-component>
</template>

<script setup lang="ts">
import { PsychologicalType } from '@prisma/client'
import { usePsychologicalHealthStore } from '~~/store/health/psychological'
import { useStudentStore } from '~~/store/student'

const student = useStudentStore()
const psychologicalHealth = usePsychologicalHealthStore()

const currentOptions = computed<{ title: string; type: PsychologicalType }[]>(() =>
    (student.current.psychological.educationType
        ? psychologicalHealth.educationTypes[student.current.psychological.educationType]
        : []
    ).map((type) => ({
        title: psychologicalHealth.typeTitles[type],
        type
    }))
)
</script>
