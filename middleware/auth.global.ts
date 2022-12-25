export default defineNuxtRouteMiddleware(async (to) => {
    if (to.meta.auth === false) return

    const { getSession } = useSession()
    const { error } = await getSession()
    if (!error) return

    return navigateTo('/login')
})
