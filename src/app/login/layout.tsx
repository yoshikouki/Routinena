import { Container, IconButton } from "@mui/material";
import { type Metadata } from "next";
import LandingPageHeader from "~/components/layouts/LandingPageHeader";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ログイン - ルーティンナさん | Routinena",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="md">
      <LandingPageHeader>
        <IconButton>
          <Image
            src="/icons/apple-touch-icon.png"
            alt="ルーティンナさん"
            width={40}
            height={40}
            style={{ borderRadius: "100%" }}
          />
        </IconButton>
      </LandingPageHeader>

      {children}
    </Container>
  );
}
