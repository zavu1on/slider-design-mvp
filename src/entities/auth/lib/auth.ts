import { type AdapterUser } from '@auth/core/adapters';
import { type JWT } from '@auth/core/jwt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/shared/lib';
import { loginFormSchema } from '../schema';
import { generateTokens, verifyAccessToken, verifyRefreshToken } from './jwt';
import { verifyPassword } from './password';

declare module '@auth/core/jwt' {
  interface JWT {
    body: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    };
  }
}

declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
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
          if (!verifyPassword(cleanData.password, user.password)) return null;

          const tokens = generateTokens({ id: user.id });

          return {
            ...tokens,
            expiresAt: Math.floor(
              new Date(Date.now() + 1000 * 60 * 30).getTime() / 1000 // 30m
            ),
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.body = {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: user.expiresAt,
        };
      } else if (Date.now() < token.body.expiresAt * 1000) {
        return token;
      }

      try {
        const accessTokenData = verifyAccessToken(token.body.accessToken);
        const refreshTokenData = verifyRefreshToken(token.body.refreshToken);

        if (accessTokenData?.id !== refreshTokenData?.id || !refreshTokenData) {
          return null;
        }

        await prisma.user.findFirstOrThrow({
          where: { id: refreshTokenData.id },
        });
        const tokenPair = generateTokens({ id: refreshTokenData.id });

        return {
          ...token,
          body: {
            ...tokenPair,
            expiresAt: Math.floor(
              new Date(Date.now() + 1000 * 60 * 30).getTime() / 1000
            ),
          },
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return null;
      }
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
