export default defineNuxtRouteMiddleware(async (to) => {
    if (to.meta.auth === false) return

    const { state, getSession } = useSession()

    if (state.status.value === 'unauthenticated') await getSession()
    if (state.status.value === 'authenticated') return

    return navigateTo('/login')
})
