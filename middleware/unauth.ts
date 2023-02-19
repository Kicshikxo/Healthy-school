export default defineNuxtRouteMiddleware(async (to) => {
    const { state } = useAuth()
    if (state.status.value === 'unauthenticated') return

    return navigateTo('/')
})
