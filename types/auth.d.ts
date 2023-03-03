import { Role, User } from '@prisma/client'

declare global {
    interface LoginData {
        username?: string
        password?: string
    }

    interface SingInOptions {
        username?: string
        password?: string
        redirectTo?: string
    }

    interface SignInResult {
        status: number
        error: string | null
        user: User | null
    }

    interface SignOutOptions {
        redirectTo?: string
    }

    interface AuthTokenData {
        id: string
        organizationId?: string
        role: Role
        password: string
    }

    interface SessionData {
        id: string
        organizationId?: string
        role: Role
        firstName: string
        secondName: string
        middleName: string
    }

    interface GetSessionResult {
        status: number
        error: string | null
        data: SessionData | null
    }

    type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
    type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U
}
