import type { AdapterUser } from '@auth/core/adapters';
import type { JWT } from '@auth/core/jwt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/shared/lib';
import { loginFormSchema } from '../schema';
import { verifyPassword } from './password';

declare module '@auth/core/jwt' {
  interface JWT {
    body: {
      id: string;
      expiresAt: number;
    };
  }
}

declare module 'next-auth' {
  interface User {
    id: string;
    expiresAt: number;
  }

  interface Session {
    user: JWT;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV !== 'production',
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const cleanData = await loginFormSchema.validate(credentials, {
            strict: true,
          });

          const user = await prisma.user.findFirstOrThrow({
            where: {
              login: cleanData.email,
            },
          });
          if (!(await verifyPassword(cleanData.password, user.password)))
            return null;

          return {
            id: user.id,
            expiresAt: Math.floor(
              new Date(Date.now() + 1000 * 60 * 60 * 8).getTime() / 1000 // 8h
            ),
          };
        } catch (error) {
          console.log('AuthenticationError', error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.body = {
          id: user.id,
          expiresAt: user.expiresAt,
        };
      }
      if (Date.now() > token.body.expiresAt * 1000) {
        return null;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token as AdapterUser & JWT;
      return session;
    },
    async authorized({ auth }) {
      return !!auth;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
});
