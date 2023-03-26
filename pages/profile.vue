<template>
    <div>
        <section class="p-5">
            <div class="flex justify-content-between gap-8">
                <div class="flex flex-auto gap-5 h-6rem">
                    <div class="flex flex-auto flex-column justify-content-between">
                        <div class="flex align-items-center text-3xl h-2rem">
                            <div class="text-800 font-bold">
                                {{ data?.secondName }}
                                {{ data?.firstName }}
                                {{ data?.middleName }}
                            </div>
                        </div>
                        <div class="flex flex-wrap gap-5">
                            <div class="flex flex-column">
                                <div class="text-500">Роль</div>
                                <div class="flex align-items-end mt-2 text-700">
                                    {{ localizeRole(data?.role!) }}
                                </div>
                            </div>
                            <div v-if="!errorOrganization" class="flex flex-column">
                                <div class="text-500">Организация</div>
                                <div class="flex align-items-end mt-2 text-700">
                                    {{ organization?.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p-button
                        label="Выйти"
                        icon="pi pi-sign-out"
                        class="p-button-danger p-button-text"
                        @click="signOut({ redirectTo: '/login' })"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Профиль'
})

const { data } = useAuthState()
const { signOut } = useAuth()

const { data: organization, error: errorOrganization } = useFetch('/api/organizations/info', {
    query: { organizationId: computed(() => data.value?.organizationId) },
    headers: useRequestHeaders() as HeadersInit
})
</script>
