import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handlers = NextAuth(authOptions);
export { handlers as GET, handlers as POST };
