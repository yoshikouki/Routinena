import DashboardButton from "~/components/DashboardButton";
import InstallationButton from "./InstallationButton";
import LoginButton from "~/components/LoginButton";
import LogoutButton from "~/components/LogoutButton";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen min-w-full flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="flex flex-col items-center gap-2">
          <DashboardButton />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl">
            {session && <span>Logged in as {session.user.name}</span>}
          </p>
          {session ? <LogoutButton /> : <LoginButton />}
        </div>

        <InstallationButton />
      </div>
    </main>
  );
}
