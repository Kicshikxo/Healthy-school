import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'
const prisma = new PrismaClient()

export default NuxtAuthHandler({
    secret: process.env.SECRET_KEY,
    pages: {
        signIn: '/login'
    },
    providers: [
        // @ts-expect-error
        CredentialsProvider.default({
            async authorize(credentials: any) {
                const user = await prisma.user.findFirst({
                    where: {
                        login: credentials.login
                    }
                })
                if (
                    user &&
                    (await compare(credentials.password, user!.password))
                ) {
                    return user
                }
            }
        })
    ]
})
