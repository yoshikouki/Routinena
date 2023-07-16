import { getProviders } from "next-auth/react";
import { redirect } from 'next/navigation';
import LoginPage from "./LoginPage";

export default async function Dashboard() {
  const providers = await getProviders();

  if (!providers) {
    redirect("/dashboard");
  };

  return (
    <LoginPage providers={providers} />
  );
}
