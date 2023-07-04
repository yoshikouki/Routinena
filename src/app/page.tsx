import { AuthShowcase } from "./AuthShowcase";
import ClientHome from "./ClientHome";
import InstallationButton from "./InstallationButton";
import LoginButton from "~/components/LoginButton";
import LogoutButton from "~/components/LogoutButton";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col items-center gap-2">
            <ClientHome />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl">
              {session && <span>Logged in as {session.user.name}</span>}
            </p>
            {session ? <LogoutButton /> : <LoginButton />}
          </div>

          <AuthShowcase />

          <InstallationButton />
        </div>
      </main>
    </>
  );
}
