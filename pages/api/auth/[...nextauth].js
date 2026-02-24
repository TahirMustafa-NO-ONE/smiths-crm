import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Hardcoded admin user - can be replaced with database lookup later
        const adminUser = {
          id: "1",
          email: "admin@smithsagency.com",
          password: "admin123",
          name: "Admin User",
        };

        if (
          credentials?.email === adminUser.email &&
          credentials?.password === adminUser.password
        ) {
          // Return user object (password excluded)
          return {
            id: adminUser.id,
            email: adminUser.email,
            name: adminUser.name,
          };
        }

        // Return null if credentials are invalid
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
