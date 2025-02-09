'use client'
import { HeroUIProvider } from '@heroui/react'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

export default function NextAuthProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <HeroUIProvider>
      <SessionProvider>{children}</SessionProvider>
    </HeroUIProvider>
  )
}
