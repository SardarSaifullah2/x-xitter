import "../globals.css"
export const metadata = {
  title: 'Username',
  description: 'Enter a username that suits you',
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
