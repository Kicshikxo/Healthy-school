export default defineNuxtRouteMiddleware(async (to) => {
    if (to.meta.auth === false || to.meta.middleware === 'unauth') return

    const { state } = useAuth()
    if (state.status.value === 'authenticated') return

    return navigateTo('/login')
})
