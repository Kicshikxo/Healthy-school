export default defineNuxtRouteMiddleware(async (to) => {
    const { state } = useSession()
    if (state.status.value === 'unauthenticated') return

    return navigateTo('/')
})
