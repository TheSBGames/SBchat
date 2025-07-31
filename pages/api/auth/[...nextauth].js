import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import User from "../../../models/User";
import dbConnect from "../../../lib/db";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, token }) {
      await dbConnect();
      const user = await User.findOne({ email: session.user.email });
      if (user) {
        session.user.id = user._id;
        session.user.isAdmin = user.isAdmin || false;
      }
      return session;
    },
    async signIn({ user }) {
      await dbConnect();
      const exists = await User.findOne({ email: user.email });
      if (!exists) {
        await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
        });
      }
      return true;
    },
  },
});
