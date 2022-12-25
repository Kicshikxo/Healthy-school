export default defineEventHandler((event) => {
    deleteCookie(event, 'auth-token')
    return {
        status: 200
    }
})
