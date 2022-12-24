<template>
    <div>
        <section class="p-5">
            <div class="flex justify-content-between gap-8">
                <div class="flex flex-auto gap-5">
                    <nuxt-img
                        src="images/avatars/persona 0-1.png"
                        alt="student avatar"
                        width="96"
                        height="96"
                    />
                    <div
                        class="flex flex-auto flex-column justify-content-between"
                    >
                        <div
                            class="flex align-items-center text-900 font-medium text-3xl h-2rem"
                        >
                            <p-skeleton
                                v-if="loadingInfo"
                                class="max-w-30rem"
                            />
                            <div v-else>
                                {{ info?.secondName }}
                                {{ info?.firstName }}
                                {{ info?.middleName }}
                            </div>
                        </div>
                        <div class="flex flex-wrap gap-5">
                            <div class="flex flex-column">
                                <div class="text-500">Возраст</div>
                                <div
                                    class="flex align-items-end h-1rem mt-2 text-700"
                                >
                                    <p-skeleton
                                        v-if="loadingInfo"
                                        class="max-w-30rem"
                                    />
                                    <div v-else>{{ info?.age }} лет</div>
                                </div>
                            </div>
                            <div class="flex flex-column">
                                <div class="text-500">Класс</div>
                                <div
                                    class="flex align-items-end h-1rem mt-2 text-700"
                                >
                                    <p-skeleton
                                        v-if="loadingInfo"
                                        class="max-w-30rem"
                                    />
                                    <div v-else>{{ info?.class }}</div>
                                </div>
                            </div>
                            <div class="flex flex-column w-8rem">
                                <div class="text-500">СНИЛС</div>
                                <div
                                    class="flex align-items-end h-1rem mt-2 text-700"
                                >
                                    <p-skeleton
                                        v-if="loadingInfo"
                                        class="max-w-30rem"
                                    />
                                    <div v-else>{{ info?.snils }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p-button
                        icon="pi pi-trash"
                        class="p-button-rounded p-button-danger"
                        @click="deleteStudent"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

async function deleteStudent() {
    const { error } = await useFetch('/api/students/remove', {
        method: 'DELETE',
        body: { studentId: info.value?.id }
    })
    if (error.value) return

    router.back()
}

const { data: info, pending: loadingInfo } = useFetch('/api/students/info', {
    query: { id: route.params.id }
})

definePageMeta({
    title: `Информация по обучающемуся`
})
</script>
