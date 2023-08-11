import '../styles/globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Lens Karma',
  description: 'Created by Lens Ru',
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
