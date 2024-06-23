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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Credentials:", credentials); // Log credentials
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          console.log("No user found with email:", credentials.email); // Log if user not found
          return null;
        }

        const isValid = bcrypt.compareSync(credentials.password, user.password);
        console.log("Password valid:", isValid); // Log password validation result

        if (isValid) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // This callback is called whenever a JWT is created or updated.
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // This callback is called whenever a session is checked.
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (profile) {
        user.first_name = profile.given_name || profile.name?.split(" ")[0];
        user.last_name = profile.family_name || profile.name?.split(" ").slice(1).join(" ");
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to home page after login or on error
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
    error: "/error", // Redirect to the error page on error
  },
  events: {
    error: (message) => {
      console.error(message); // Log the error message for debugging
    },
  },
});

export { handler as GET, handler as POST };
