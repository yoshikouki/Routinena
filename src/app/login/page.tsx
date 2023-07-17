import { getProviders } from "next-auth/react";
import { redirect } from 'next/navigation';
import Login from "./Login";

export default async function LoginPage() {
  const providers = await getProviders();

  if (!providers) {
    redirect("/");
  }

  return (
    <Login providers={providers} />
  );
}
