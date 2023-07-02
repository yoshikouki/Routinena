import "./globals.css";

export const metadata = {
  title: 'ルーティンナさん | Routinena',
  description: '「ルーティンナさん」はあなたの定期的なタスクを追跡し、最後にいつ完了したのかを簡単に記録できるWebアプリです。あなたの忙しい日常をサポートし、タスク管理を効率的にします。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
