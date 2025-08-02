import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Add the user's MongoDB ObjectId to the session object
      session.user.id = user.id;
      return session;
    }
  }
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }