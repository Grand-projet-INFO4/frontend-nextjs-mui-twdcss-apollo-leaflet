import NextAuth from "next-auth";
import { authOptions } from "@/lib/next-auth";

// Handler of requests to next-auth operations
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
