export default defineNuxtRouteMiddleware(async (to) => {
    if (to.meta.auth === false || to.meta.middleware === 'unauth') return

    const { state } = useSession()
    if (state.status.value === 'authenticated') return

    return navigateTo('/login')
})
