export default defineNuxtPlugin(async (nuxtApp) => {
    const { state, getSession } = useSession()
    if (state.status.value === 'unauthenticated') {
        await getSession()
    }
})
