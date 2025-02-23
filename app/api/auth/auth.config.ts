import { DefaultSession, NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/db/mongodb";
import dbConnect from "@/lib/db/connect";
import User from "@/lib/models/User";
import { z } from "zod";

// Extend the built-in session type
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username?: string;
    } & DefaultSession["user"]
  }

  interface User {
    username?: string;
  }
}

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await dbConnect();

          const validatedFields = loginSchema.safeParse(credentials);

          if (!validatedFields.success) {
            throw new Error('VALIDATION_ERROR');
          }

          const user = await User.findOne({ username: credentials?.username });

          if (!user) {
            throw new Error('USER_NOT_FOUND');
          }

          const isValid = await user.comparePassword(credentials?.password as string);

          if (!isValid) {
            throw new Error('INVALID_PASSWORD');
          }

          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error: any) {
          console.error('Auth error:', error);
          throw error; // Propagate the error to be handled by NextAuth
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      // Add account type if using multiple providers
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      console.log(`User ${user.id} signed in`);
    },
    async signOut({ token }) {
      console.log(`User ${token.id} signed out`);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};