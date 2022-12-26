export default defineNuxtPlugin(async (nuxtApp) => {
    const { state, getSession } = useSession()
    if (!state.data.value) {
        await getSession()
    }
})
