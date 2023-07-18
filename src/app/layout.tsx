import { type Metadata } from "next";
import "./globals.css";
import { TrpcProvider } from "./TrpcProvider";
import ThemeRegistry from "./ThemeRegistry";
import { ClientSessionProvider } from "./ClientSessionProvider";
import { font } from "./theme";

export const metadata: Metadata = {
  title: "ルーティンナさん | Routinena",
  description:
    "「ルーティンナさん」はあなたの定期的なタスクを追跡し、最後にいつ完了したのかを簡単に記録できるWebアプリです。あなたの忙しい日常をサポートし、タスク管理を効率的にします。",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },

  // PWA config
  manifest: "/manifest.webmanifest",

  // <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  // <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  // <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={font.className}>
        <ClientSessionProvider>
          <ThemeRegistry>
            <TrpcProvider>{children}</TrpcProvider>
          </ThemeRegistry>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
