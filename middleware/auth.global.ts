export default defineNuxtRouteMiddleware(async (to) => {
    if (to.meta.auth === false) return

    const { state } = useSession()

    if (state.status.value === 'authenticated') return

    return navigateTo('/login')
})
