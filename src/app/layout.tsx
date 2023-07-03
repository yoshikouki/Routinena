import { type Metadata } from "next";
import "./globals.css";
import { TrpcProvider } from "./TrpcProvider";

export const metadata: Metadata = {
  title: "ルーティンナさん | Routinena",
  description:
    "「ルーティンナさん」はあなたの定期的なタスクを追跡し、最後にいつ完了したのかを簡単に記録できるWebアプリです。あなたの忙しい日常をサポートし、タスク管理を効率的にします。",
  icons: "/favicon.ico",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  // PWA config
  manifest: "/manifest.json",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TrpcProvider>{children}</TrpcProvider>
      </body>
    </html>
  );
}
