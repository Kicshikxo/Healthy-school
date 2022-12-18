<template>
    <div>
        <section class="p-5">
            <div class="flex justify-content-between gap-8">
                <div class="flex flex-auto gap-5">
                    <nuxt-img
                        src="images/avatars/persona 0-1.png"
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
                        <div class="flex flex-wrap">
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
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        class="p-button p-component p-button-icon-only p-button-rounded p-button-help"
                        type="button"
                    >
                        <span class="pi pi-list p-button-icon"></span>
                        <span class="p-button-label">&nbsp;</span>
                        <span class="p-ink" role="presentation"></span>
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: info, pending: loadingInfo } = useFetch('/api/children/info', {
    query: { id: route.params.id }
})

definePageMeta({
    title: `Информация по обучающемуся`
})
</script>
