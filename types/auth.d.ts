import { Role, User } from '@prisma/client'

declare global {
    interface LoginData {
        username?: string
        password?: string
    }

    interface SingInOptions {
        username?: string
        password?: string
    }

    interface SignInResult {
        status: number
        error: string | null
        user: User | null
    }

    interface AuthTokenData {
        id: string
        organizationId: string
        role: Role
        password: string
    }

    interface SessionData {
        id: string
        organizationId: string
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
}
