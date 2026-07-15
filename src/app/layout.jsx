import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FocusAI - Study Smarter for African Students',
  description: 'Modern Pomodoro timer with AI coaching for productive studying. Free app built for African students.',
  keywords: 'pomodoro, productivity, study, timer, african students, focus',
  authors: [{ name: 'FocusAI Team' }],
  openGraph: {
    title: 'FocusAI - Study Smarter',
    description: 'Pomodoro app with AI coaching for African students',
    url: 'https://focusai.vercel.app',
    siteName: 'FocusAI',
    images: [
      {
        url: 'https://focusai.vercel.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FocusAI - Study Smarter',
    description: 'Pomodoro app for African students',
    images: ['https://focusai.vercel.app/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://focusai.vercel.app" />
      </head>
      <body>{children}</body>
    </html>
  )
}
