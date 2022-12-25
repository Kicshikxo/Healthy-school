import { Role, User } from '@prisma/client'

interface SingInOptions {
    username?: string
    password?: string
}

interface SignInResult {
    error: string | null
    user: User | null
    status: number
}

interface Session {
    id: number
    role: Role
    firstName: string
    secondName: string
    middleName: string
}

interface SessionResult {
    error: string | null
    data: Session | null
    status: number
}

const signIn = async (options: SingInOptions): Promise<SignInResult> => {
    const { data, error } = await useFetch('/api/auth/login', {
        method: 'POST',
        body: { username: options.username, password: options.password }
    })
    return {
        error: error.value?.message ?? null,
        user: data.value,
        status: error.value?.status ?? 200
    }
}

const signOut = async () => {
    await useFetch('/api/auth/logout')
}

const getSession = async (): Promise<SessionResult> => {
    const { cookie } = useRequestHeaders()
    const { data, error } = await useFetch('/api/auth/session', {
        headers: { cookie: cookie! }
    })
    return {
        error: error.value?.message ?? null,
        data: data.value as Session | null,
        status: error.value?.status ?? 200
    }
}

export default () => ({
    signIn,
    signOut,
    getSession
})
