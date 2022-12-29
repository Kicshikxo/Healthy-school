<template>
    <div>
        <section class="p-5">
            <div class="flex justify-content-between gap-8">
                <div class="flex flex-auto gap-5">
                    <nuxt-img src="images/avatars/persona 0-1.png" alt="student avatar" width="96" height="96" />
                    <div class="flex flex-auto flex-column justify-content-between">
                        <div class="flex align-items-center text-900 text-3xl h-2rem">
                            <p-skeleton v-if="loadingInfo" class="max-w-30rem" />
                            <div v-else class="text-800 font-bold">
                                {{ info?.secondName }}
                                {{ info?.firstName }}
                                {{ info?.middleName }}
                            </div>
                        </div>
                        <div class="flex flex-wrap gap-5">
                            <div class="flex flex-column">
                                <div class="text-500">Возраст</div>
                                <div class="flex align-items-end h-1rem mt-2 text-700">
                                    <p-skeleton v-if="loadingInfo" class="max-w-30rem" />
                                    <div v-else>{{ info?.age }} лет</div>
                                </div>
                            </div>
                            <div class="flex flex-column">
                                <div class="text-500">Класс</div>
                                <div class="flex align-items-end h-1rem mt-2 text-700">
                                    <p-skeleton v-if="loadingInfo" class="max-w-30rem" />
                                    <div v-else>{{ info?.class }}</div>
                                </div>
                            </div>
                            <div class="flex flex-column w-8rem">
                                <div class="text-500">СНИЛС</div>
                                <div class="flex align-items-end h-1rem mt-2 text-700">
                                    <p-skeleton v-if="loadingInfo" class="max-w-30rem" />
                                    <div v-else>{{ info?.snils }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <role-access role="CLASS_TEACHER">
                        <p-button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteStudent" />
                    </role-access>
                </div>
            </div>
        </section>
        <role-access role="PHYSICAL_EDUCATION_TEACHER">
            <physical-health :student-id="($route.params.id as string)" />
        </role-access>
        <role-access role="HEALTH_WORKER">
            <medical-health :student-id="($route.params.id as string)" />
        </role-access>
        <role-access role="SOCIAL_PEDAGOGUE">
            <social-health :student-id="($route.params.id as string)" />
        </role-access>
        <role-access role="CLASS_TEACHER">
            <class-teacher :student-id="($route.params.id as string)" />
        </role-access>
    </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const route = useRoute()
const router = useRouter()

async function deleteStudent() {
    const { error } = await useFetch('/api/students/remove', {
        method: 'DELETE',
        body: { studentId: info.value?.id }
    })
    if (error.value) {
        return toast.add({
            severity: 'error',
            summary: 'Ошибка удаления',
            detail: 'Данные не были удалены',
            life: 3000
        })
    }

    router.back()
}

const { data: info, pending: loadingInfo } = useFetch('/api/students/info', {
    query: { id: route.params.id }
})

definePageMeta({
    title: `Информация по обучающемуся`
})
</script>
