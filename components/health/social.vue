<template>
    <health-component
        :loading="student.loading"
        :allow-save="student.current.social.changed"
        :on-cancel="student.refresh"
        :on-save="student.current.social.save"
    >
        <template #title>Компонент социального здоровья</template>
        <template #body="{ enableEditing }">
            <health-component-body>
                <template #title>Индикаторы социального здоровья</template>
                <template #content>
                    <div v-for="option in socialHealth.options" class="field-checkbox">
                        <div
                            style="width: 6px; height: 20px"
                            class="mr-2 border-round"
                            :class="{
                                'bg-green-500': option.healthZone === HealthZone.GREEN,
                                'bg-yellow-500': option.healthZone === HealthZone.YELLOW,
                                'bg-red-500': option.healthZone === HealthZone.RED
                            }"
                        />
                        <p-checkbox
                            :disabled="!enableEditing"
                            :inputId="`indicator${option.id}`"
                            :value="option"
                            v-model="student.current.social.options"
                            :class="{
                                'p-checkbox-green': option.healthZone === HealthZone.GREEN,
                                'p-checkbox-yellow': option.healthZone === HealthZone.YELLOW,
                                'p-checkbox-red': option.healthZone === HealthZone.RED
                            }"
                        />
                        <label :for="`indicator${option.id}`">
                            {{ socialHealth.typeTitles[option.socialType] }}
                        </label>
                    </div>
                </template>
            </health-component-body>
        </template>
    </health-component>
</template>

<script setup lang="ts">
import { HealthZone } from '@prisma/client'
import { useStudentStore } from '~~/store/student'
import { useSocialHealthStore } from '~~/store/health/social'

const student = useStudentStore()
const socialHealth = useSocialHealthStore()
</script>
