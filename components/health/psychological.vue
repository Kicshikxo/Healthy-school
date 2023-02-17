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
                    <template v-for="{ title, type } in currentOptions">
                        <p-divider />
                        <div class="grid grid-nogutter">
                            <div class="col-6 flex justify-content-start align-items-center text-lg">{{ title }}</div>
                            <div class="col-6 border-left-1 surface-border pl-4">
                                <health-dropdown
                                    :disabled="!enableEditing || loading"
                                    :loading="loading"
                                    :options="student.current.psychological.educationOptions[type]"
                                    :placeholder="title"
                                    option-label="title"
                                    v-model="student.current.psychological.options[type]"
                                />
                            </div>
                        </div>
                    </template>
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
import { useStudentStore } from '~~/store/student'
import { usePsychologicalHealthStore } from '~~/store/health/psychological'

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
