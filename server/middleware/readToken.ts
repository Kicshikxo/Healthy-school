import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
    const authToken = getCookie(event, 'auth-token')

    if (!authToken) return

    let tokenData: AuthTokenData
    try {
        tokenData = jwt.verify(authToken!, process.env.SECRET_KEY!) as AuthTokenData
    } catch (e) {
        return
    }

    event.context.authTokenData = tokenData
})
