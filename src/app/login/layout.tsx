import { type Metadata } from "next";
import AppLogo from "~/components/layouts/AppLogo";
import LandingPageHeader from "~/components/layouts/LandingPageHeader";

export const metadata: Metadata = {
  title: "ログイン - ルーティンナさん | Routinena",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingPageHeader>
        <AppLogo />
      </LandingPageHeader>

      {children}
    </>
  );
}
