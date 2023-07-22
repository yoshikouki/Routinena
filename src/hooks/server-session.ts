import { getServerAuthSession } from "~/server/auth";
import { redirect } from 'next/navigation';

export const useServerSession = {
  get: async () => {
    const session = await getServerAuthSession();
    if (!session?.user) {
      redirect("/login");
    }
    return session;
  },
};
