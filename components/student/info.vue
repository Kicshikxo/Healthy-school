<template>
    <section class="p-5">
        <div class="flex justify-content-between gap-8">
            <div class="flex flex-auto gap-5 h-6rem">
                <div class="flex flex-auto flex-column justify-content-between">
                    <div class="flex align-items-center text-3xl h-2rem">
                        <p-skeleton v-if="loading" class="max-w-30rem" />
                        <div v-else class="text-800 font-bold">
                            {{ student?.secondName }}
                            {{ student?.firstName }}
                            {{ student?.middleName }}
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-5">
                        <div class="flex flex-column">
                            <div class="text-500">Дата рождения</div>
                            <div class="flex align-items-end h-1rem mt-2 text-700">
                                <p-skeleton v-if="loading" class="max-w-30rem" />
                                <div v-else>{{ new Date(student?.birthdate!).toLocaleDateString() }}</div>
                            </div>
                        </div>
                        <div class="flex flex-column w-5rem">
                            <div class="text-500">Пол</div>
                            <div class="flex align-items-end h-1rem mt-2 text-700">
                                <p-skeleton v-if="loading" class="max-w-30rem" />
                                <div v-else>{{ localizeGender(student?.gender!) }}</div>
                            </div>
                        </div>
                        <div class="flex flex-column">
                            <div class="text-500">Класс</div>
                            <div class="flex align-items-end h-1rem mt-2 text-700">
                                <p-skeleton v-if="loading" class="max-w-30rem" />
                                <div v-else>{{ student?.class.number! + student?.class.liter! }}</div>
                            </div>
                        </div>
                        <div class="flex flex-column w-9rem">
                            <div class="text-500">СНИЛС</div>
                            <div class="flex align-items-end h-1rem mt-2 text-700">
                                <p-skeleton v-if="loading" class="max-w-30rem" />
                                <div v-else>{{ student?.snils }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex gap-2">
                <slot name="actions" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Student, Class } from '@prisma/client'

const props = withDefaults(
    defineProps<{
        student?: (Student & { class: Class }) | null
        loading?: boolean
    }>(),
    {
        loading: false
    }
)
</script>
