import ContextProvider from '@/context'
import { headers } from 'next/headers'
import './globals.scss'
import NextAuthProvider from './provider'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookies = headers().get('cookie')
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
      <body>
        <ContextProvider cookies={cookies}>
          <NextAuthProvider>{children}</NextAuthProvider>
        </ContextProvider>
      </body>
    </html>
  )
}
