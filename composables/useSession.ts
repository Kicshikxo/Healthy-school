const signIn = async (options: SingInOptions): Promise<SignInResult> => {
    const { data, error } = await useFetch('/api/auth/login', {
        method: 'POST',
        body: { username: options.username, password: options.password }
    })

    await getSession()

    return {
        status: error.value?.status ?? 200,
        error: error.value?.statusMessage ?? null,
        user: data.value
    }
}

const signOut = async () => {
    await useFetch('/api/auth/logout')
    await getSession()
}

const getSession = async (): Promise<GetSessionResult> => {
    const { cookie } = useRequestHeaders()
    const { data } = useSessionState()

    const status = ref<number>(200)
    const error = ref<string | null>(null)
    const session = ref<SessionData | null>(null)

    try {
        session.value = await $fetch('/api/auth/session', {
            headers: { cookie: cookie! },
            onResponse(context) {
                status.value = context.response.status
            },
            onResponseError(context) {
                status.value = context.response.status
                error.value = context.response.statusText
            }
        })
    } catch (e) {}

    data.value = session.value

    return {
        status: status.value,
        error: error.value,
        data: data.value
    }
}

export default () => {
    const { data, status } = useSessionState()

    return {
        signIn,
        signOut,
        getSession,
        state: {
            data,
            status
        }
    }
}
