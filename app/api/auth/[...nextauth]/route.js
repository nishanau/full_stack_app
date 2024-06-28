import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    // Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Facebook OAuth provider
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // Credentials provider for email and password authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If no user is found or email is not verified, return null
        if (!user || !user.emailVerified) {
          return null;
        }

        // Validate password
        const isValid = bcrypt.compareSync(credentials.password, user.password);

        // If password is valid, return user, otherwise return null
        if (isValid) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    strategy: "jwt",
    maxAge:  5 * 60, 
  },
  callbacks: {
    async jwt({ token, user }) {
      // This callback is called whenever a JWT is created or updated.
      // If user is available, add user id to the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // This callback is called whenever a session is checked.
      // Add user id to the session from token
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // Add first and last names to user object from profile if available
      if (profile) {
        user.first_name = profile.given_name || profile.name?.split(" ")[0];
        user.last_name = profile.family_name || profile.name?.split(" ").slice(1).join(" ");
      }

      // Check if the email is verified
      if (!user.emailVerified) {
        throw new Error('Please verify your email before logging in.');
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to home page after login or on error
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/login", // Custom login page
    error: "/error", // Redirect to the custom error page on error
  },
  events: {
    error: (message) => {
      // Log the error message for debugging
      console.error(message);
    },
  },
});

export { handler as GET, handler as POST };
