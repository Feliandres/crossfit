import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";

export const {
    auth,
    handlers: { GET, POST },
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({user}) {
            await prisma.user.update({
                where: {id: user.id},
                data: { emailVerified: new Date()}
            })
        }
    },
    callbacks: {
        async signIn({user, account}) {

            const userId: string | undefined = user.id;

            // Asegúrate de que userId no sea undefined
            if (!userId) return false;

            // Allow OAuth without email verification
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(userId);

            // Prevent sign in without email verification
            if (!existingUser?.emailVerified) return false;

            // TODO: Add 2FA check

            return true;
        },
        async session({token, session}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role
            }

            return session;
        },

        async jwt({token}) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
});