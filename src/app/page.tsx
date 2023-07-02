import { AuthShowcase } from "./AuthShowcase";
import ClientHome from "./ClientHome";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <ClientHome />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user.name}</span>}
            </p>
            {session ? (
              <Link
                className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                href={"/api/auth/signout"}
              >
                Sign out
              </Link>
            ) : (
              <Link
                className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
                href={"/api/auth/signin"}
              >
                Sign in
              </Link>
            )}
          </div>

          <AuthShowcase />
        </div>
      </main>
    </>
  );
}
